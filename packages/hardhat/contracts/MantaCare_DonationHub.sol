// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol"; // Delete this line before deploying to mainnet!

// Importing necessary OpenZeppelin contracts for ownership, pausing functionality, reentrancy protection and safe math.
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// defines the available categories for projects.
enum ProjectCategory { Medical, Humanitarian, Infrastructure, Education, Environment, TechnologyInnovation }

// A smart contract for managing donations to various projects.
contract MantaCare_DonationHub is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    // Stores information about a donation project.
    struct Project {
        address payable wallet; // Wallet address to receive donations.
        uint pendingWithdrawals; // Amount available for withdrawal.
        string name; // Name of the project.
        ProjectCategory category; // Category of the project.
    }

    address[] public supportedTokenAddresses;
    uint public serviceFeeBasisPoints = 10; // Service fee in basis points (10 = 1%).
    uint public constant maxProjectCount = 20; // Maximum number of projects.
    mapping(uint => Project) private projects; // Mapping of project IDs to Project structs.
    mapping(address => bool) private supportedTokens; // Mapping to track supported ERC20 tokens.

    // Event emitted when a donation is made.
    event DonationMade(address indexed donor, uint indexed projectId, uint amount, string currency);
    // Event emitted when a token is added.
    event TokenAdded(address indexed tokenAddress);
    // Event emitted when a token is removed.
    event TokenRemoved(address indexed tokenAddress);
    // Event emitted when a token donation is made.
    event TokenDonationMade(address indexed donor, uint indexed projectId, address indexed tokenAddress, uint amount);
    // Event emitted when a project is added.
    event ProjectAdded(uint indexed projectId, string name, ProjectCategory category);
    // Event emitted when a project is removed.
    event ProjectRemoved(uint indexed projectId);
    // Event emitted when the service fee is adjusted.
    event ServiceFeeAdjusted(uint newFeePercentage);

    // Constructor to add initial projects.
    constructor() {
        // Add the first project
        setProject(0, payable(address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8)), "Medical Response Crew", ProjectCategory.Medical);
        // Add the second project
        setProject(1, payable(address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)), "Crisis Relief Team", ProjectCategory.Humanitarian);
        // Add the third project
        setProject(2, payable(address(0x90F79bf6EB2c4f870365E785982E1f101E93b906)), "Humanitas in Centro", ProjectCategory.Infrastructure);
    }

    // Modifier to check if a project exists.
    modifier projectExists(uint projectId) {
    require(projects[projectId].wallet != address(0), "Project does not exist");
    _;
    }

    // Allows the owner to add a new project.
    function setProject(uint projectId, address payable projectWallet, string memory projectName, ProjectCategory category) public onlyOwner whenNotPaused returns (bool) {
        require(uint(category) >= 0 && uint(category) <= uint(ProjectCategory.TechnologyInnovation), "Invalid project category");
        require(projectId >= 0 && projectId < maxProjectCount, "Invalid project ID or exceeds max limit");
        require(projectWallet != address(0), "Invalid wallet address");
        require(projects[projectId].wallet == address(0), "Project already exists");

        projects[projectId] = Project(projectWallet, 0, projectName, category);
        emit ProjectAdded(projectId, projectName, category);

        return true;
    }


    // Allows the owner to remove an existing project.
    function removeProject(uint projectId) public onlyOwner whenNotPaused returns (bool) {
        require(projectId >= 0 && projectId < maxProjectCount, "Invalid project ID");
        require(projects[projectId].wallet != address(0), "Project does not exist");
        delete projects[projectId];
        
        emit ProjectRemoved(projectId);
        
        return true;
    }

    // Allows the owner to adjust the service fee between 1% and 3%.
    function adjustServiceFee(uint newFeePercentage) public onlyOwner {
        require(newFeePercentage >= 0 && newFeePercentage <= 30, "Fee must be between 0% and 3%");
        serviceFeeBasisPoints = newFeePercentage;
        emit ServiceFeeAdjusted(newFeePercentage);
    }

    // Allows single donations in DFI to a project.
    function donateDFI(uint projectId) public payable whenNotPaused nonReentrant projectExists(projectId) {
        require(msg.value > 0, "Donation must be greater than 0");

        uint fee = (msg.value * serviceFeeBasisPoints) / 1000;
        uint donationAmount = msg.value - fee;
        payable(owner()).transfer(fee);

        projects[projectId].pendingWithdrawals += donationAmount;

        emit DonationMade(msg.sender, projectId, msg.value, "DFI");
        withdrawDFIDonations(projectId);
    }

    // Function to donate DFI evenly across all projects
    function donateDFIToAllProjects() public payable whenNotPaused nonReentrant {
        require(msg.value > 0, "Donation must be greater than 0");

        uint fee = (msg.value * serviceFeeBasisPoints) / 1000;
        uint remainingAmount = msg.value - fee;
        payable(owner()).transfer(fee);

        uint totalDonated = 0;
        uint[] memory projectIndices = new uint[](maxProjectCount);
        uint projectCount = 0;
        uint lastProjectIndex;

        // Counting and saving indices of active projects
        for (uint i = 0; i < maxProjectCount; i++) {
            if (projects[i].wallet != address(0)) {
                lastProjectIndex = i;
                projectIndices[projectCount] = i;
                projectCount++;
            }
        }

        require(projectCount > 0, "No projects to donate to");

        uint donationPerProject = remainingAmount / projectCount;

        // Distribution of donations to projects
        for (uint i = 0; i < projectCount; i++) {
            uint projectIndex = projectIndices[i];
            projects[projectIndex].wallet.transfer(donationPerProject);
            projects[projectIndex].pendingWithdrawals += donationPerProject;
            totalDonated += donationPerProject;
        }

        // Rounding error handling and distribution to last project
        uint roundingError = remainingAmount - totalDonated;
        if (roundingError > 0) {
            projects[lastProjectIndex].wallet.transfer(roundingError);
            projects[lastProjectIndex].pendingWithdrawals += roundingError;
        }
    }

    // Function to donate DFI to projects of a specific category
    function donateDFIToCategory(ProjectCategory category) public payable whenNotPaused nonReentrant {
        require(msg.value > 0, "Donation must be greater than 0");

        uint fee = (msg.value * serviceFeeBasisPoints) / 1000;
        uint remainingAmount = msg.value - fee;
        payable(owner()).transfer(fee);

        uint totalDonated = 0;
        uint[] memory projectIndices = new uint[](maxProjectCount);
        uint projectCount = 0;
        uint lastProjectIndex;

        for (uint i = 0; i < maxProjectCount; i++) {
            if (projects[i].category == category) {
                lastProjectIndex = i;
                projectIndices[projectCount] = i;
                projectCount++;
            }
        }

        require(projectCount > 0, "No projects found in this category");

        uint donationPerProject = remainingAmount / projectCount;

        for (uint i = 0; i < projectCount; i++) {
            uint projectIndex = projectIndices[i];
            projects[projectIndex].wallet.transfer(donationPerProject);
            projects[projectIndex].pendingWithdrawals += donationPerProject;
            totalDonated += donationPerProject;
        }

        uint roundingError = remainingAmount - totalDonated;
        if (roundingError > 0) {
            projects[lastProjectIndex].wallet.transfer(roundingError);
            projects[lastProjectIndex].pendingWithdrawals += roundingError;
        }
    }

    // Allows single donations in supported ERC20 tokens.
    function donateWithToken(uint projectId, address tokenAddress, uint amount) public whenNotPaused nonReentrant projectExists(projectId) {
        require(amount > 0, "Donation must be greater than 0");
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount), "Transfer failed");

        uint fee = (amount * serviceFeeBasisPoints) / 1000;
        uint donationAmount = amount - fee;
        IERC20(tokenAddress).transfer(owner(), fee);

        projects[projectId].pendingWithdrawals += donationAmount;

        emit TokenDonationMade(msg.sender, projectId, tokenAddress, amount);
        withdrawTokenDonations(projectId, tokenAddress);
    }

    // Function to donate ERC20 tokens evenly across all projects
    function donateTokensToAllProjects(address tokenAddress, uint amount) public whenNotPaused nonReentrant {
        require(amount > 0, "Donation amount must be greater than 0");
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount), "Transfer failed");

        uint fee = (amount * serviceFeeBasisPoints) / 1000;
        uint remainingAmount = amount - fee;
        IERC20(tokenAddress).transfer(owner(), fee);

        uint totalDonated = 0;
        uint[] memory projectIndices = new uint[](maxProjectCount);
        uint projectCount = 0;
        uint lastProjectIndex;

        for (uint i = 0; i < maxProjectCount; i++) {
            if (projects[i].wallet != address(0)) {
                lastProjectIndex = i;
                projectIndices[projectCount] = i;
                projectCount++;
            }
        }

        require(projectCount > 0, "No projects to donate to");

        uint donationPerProject = remainingAmount / projectCount;

        for (uint i = 0; i < projectCount; i++) {
            uint projectIndex = projectIndices[i];
            IERC20(tokenAddress).transfer(projects[projectIndex].wallet, donationPerProject);
            projects[projectIndex].pendingWithdrawals += donationPerProject;
            totalDonated += donationPerProject;
        }

        uint roundingError = remainingAmount - totalDonated;
        if (roundingError > 0) {
            projects[lastProjectIndex].wallet.transfer(roundingError);
            projects[lastProjectIndex].pendingWithdrawals += roundingError;
        }
    }

    // Function to donate ERC20 tokens to projects of a specific category
    function donateTokensToCategory(ProjectCategory category, address tokenAddress, uint amount) public whenNotPaused nonReentrant {
        require(amount > 0, "Donation amount must be greater than 0");
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount), "Transfer failed");

        uint fee = (amount * serviceFeeBasisPoints) / 1000;
        uint remainingAmount = amount - fee;
        IERC20(tokenAddress).transfer(owner(), fee);

        uint totalDonated = 0;
        uint[] memory projectIndices = new uint[](maxProjectCount);
        uint projectCount = 0;
        uint lastProjectIndex;

        for (uint i = 0; i < maxProjectCount; i++) {
            if (projects[i].category == category) {
                lastProjectIndex = i;
                projectIndices[projectCount] = i;
                projectCount++;
            }
        }

        require(projectCount > 0, "No projects found in this category");

        uint donationPerProject = remainingAmount / projectCount;

        for (uint i = 0; i < projectCount; i++) {
            uint projectIndex = projectIndices[i];
            IERC20(tokenAddress).transfer(projects[projectIndex].wallet, donationPerProject);
            projects[projectIndex].pendingWithdrawals += donationPerProject;
            totalDonated += donationPerProject;
        }

        uint roundingError = remainingAmount - totalDonated;
        if (roundingError > 0) {
            projects[lastProjectIndex].wallet.transfer(roundingError);
            projects[lastProjectIndex].pendingWithdrawals += roundingError;
        }
    }

    // Automatically transfers DFI donations to the project after a donation is made.
    function withdrawDFIDonations(uint projectId) private {
        Project storage project = projects[projectId];
        uint amount = project.pendingWithdrawals;
        project.pendingWithdrawals = 0;
        project.wallet.transfer(amount);
    }

    // Automatically transfers Token donations to the project after a donation is made.
    function withdrawTokenDonations(uint projectId, address tokenAddress) private {
        Project storage project = projects[projectId];
        uint amount = project.pendingWithdrawals;
        project.pendingWithdrawals = 0;
        IERC20(tokenAddress).transfer(project.wallet, amount);
    }

    // Allows the owner to pause contract functions.
    function pause() public onlyOwner {
        _pause();
    }

    // Allows the owner to unpause contract functions.
    function unpause() public onlyOwner {
        _unpause();
    }

    // Returns the wallet address of a project.
    function getWalletAddressByProjectId(uint projectId) public view returns (address) {
        return projects[projectId].wallet;
    }

    // Lists all active projects.
    function listAllProjects() public view returns (string[] memory) {
        string[] memory projectNames = new string[](maxProjectCount);
        for (uint i = 0; i < maxProjectCount; i++) {
            if(projects[i].wallet != address(0)) {
                projectNames[i] = projects[i].name;
            }
        }
        return projectNames;
    }

    // Allows the owner to add a supported ERC20 token.
    function addSupportedToken(address tokenAddress) public onlyOwner {
        supportedTokens[tokenAddress] = true;
        emit TokenAdded(tokenAddress);
    }

    // Allows the owner to remove a supported ERC20 token.
    function removeSupportedToken(address tokenAddress) public onlyOwner {
        require(supportedTokens[tokenAddress], "Token is not supported");
        supportedTokens[tokenAddress] = false;
        emit TokenRemoved(tokenAddress);
    }

    // Returns true if a token is supported.
    function isTokenSupported(address tokenAddress) public view returns (bool) {
        return supportedTokens[tokenAddress];
    }
}
