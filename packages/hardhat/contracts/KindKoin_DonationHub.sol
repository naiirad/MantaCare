// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import "hardhat/console.sol"; // Delete this line before deploying to mainnet!

// Importing necessary OpenZeppelin contracts for ownership, pausing functionality, reentrancy protection and safe math.
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// A smart contract for managing donations to various projects.
contract KindKoin_DonationHub is Ownable, Pausable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    // Stores information about a donation project.
    struct Project {
        address payable wallet; // Wallet address to receive donations.
        uint pendingWithdrawals; // Amount available for withdrawal.
        string name; // Name of the project.
    }

    uint public serviceFeeBasisPoints = 10; // Service fee in basis points (10 = 1%).
    uint public constant maxProjectCount = 20; // Maximum number of projects.
    mapping(uint => Project) private projects; // Mapping of project IDs to Project structs.
    mapping(address => bool) public supportedTokens; // Mapping to track supported ERC20 tokens.
    
    // Event emitted when a donation is made.
    event DonationMade(address indexed donor, uint indexed projectId, uint amount);

    // Allows the owner to add a new project.
    function setProject(uint projectId, address payable projectWallet, string memory projectName) public onlyOwner whenNotPaused returns (bool) {
        require(projectId >= 0 && projectId < maxProjectCount, "Invalid project ID or exceeds max limit");
        require(projectWallet != address(0), "Invalid wallet address");
        require(projects[projectId].wallet == address(0), "Project already exists");
        projects[projectId] = Project(projectWallet, 0, projectName);
        return true;
    }

    // Allows the owner to remove an existing project.
    function removeProject(uint projectId) public onlyOwner whenNotPaused returns (bool) {
        require(projectId >= 0 && projectId < maxProjectCount, "Invalid project ID");
        require(projects[projectId].wallet != address(0), "Project does not exist");
        delete projects[projectId];
        return true;
    }

    // Allows the owner to adjust the service fee between 1% and 3%.
    function adjustServiceFee(uint newFeePercentage) public onlyOwner {
        require(newFeePercentage >= 0 && newFeePercentage <= 30, "Fee must be between 0% and 3%");
        serviceFeeBasisPoints = newFeePercentage;
    }

    // Allows anyone to donate DFI to a project.
    function donate(uint projectId) public payable whenNotPaused nonReentrant {
        require(projects[projectId].wallet != address(0), "Project does not exist");
        require(msg.value > 0, "Donation must be greater than 0");

        uint fee = msg.value.mul(serviceFeeBasisPoints).div(100);
        uint donationAmount = msg.value.sub(fee);

        projects[projectId].pendingWithdrawals = projects[projectId].pendingWithdrawals.add(donationAmount);

        payable(owner()).transfer(fee);

        emit DonationMade(msg.sender, projectId, donationAmount);
    }

    // Allows donations in supported ERC20 tokens.
    function donateWithToken(uint projectId, address tokenAddress, uint amount) public whenNotPaused nonReentrant {
        require(projects[projectId].wallet != address(0), "Project does not exist");
        require(amount > 0, "Donation must be greater than 0");
        require(supportedTokens[tokenAddress], "Unsupported token");

        IERC20 token = IERC20(tokenAddress);
        uint fee = (amount * serviceFeeBasisPoints) / 100;
        uint donationAmount = amount - fee;
        token.safeTransferFrom(msg.sender, address(this), donationAmount);
        token.safeTransferFrom(msg.sender, owner(), fee);

        projects[projectId].pendingWithdrawals += donationAmount;

        emit DonationMade(msg.sender, projectId, amount);
    }

    // Allows a project to withdraw their donations.
    function withdrawDonations(uint projectId) public nonReentrant {
        Project storage project = projects[projectId];
        require(msg.sender == project.wallet, "Only project wallet can withdraw");
        require(project.pendingWithdrawals > 0, "No funds to withdraw");
        uint amount = project.pendingWithdrawals;
        project.pendingWithdrawals = 0;
        project.wallet.transfer(amount);
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
        require(tokenAddress.isContract(), "Token address must be a contract");
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
