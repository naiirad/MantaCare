// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Hardhat console for debugging purposes. Remove this import for production deployment.
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol"; // for access control
import "@openzeppelin/contracts/security/Pausable.sol"; // for emergency stop functionalities
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // for preventing reentrancy attacks


// The KindKoin_DonationHub contract for handling project donations.
contract KindKoin_DonationHub is Ownable, Pausable, ReentrancyGuard {
    // Project struct to hold each project's wallet address and total donations received.
    struct Project {
        address payable wallet;
        uint totalDonations;
        uint pendingWithdrawals;
        string name;
    }

    // Variable to store the service fee basispoints. Initialized to 1%.
    uint public serviceFeeBasisPoints = 10; // 1% = 10 basis points
    // Variable to store the maximum number of projects allowed in the contract 
    uint public constant maxProjectCount = 20; 

    // Mapping to store project details by their ID.
    mapping(uint => Project) private projects;
    // Mapping to track the total donations made by each user.
    mapping(address => uint) private userTotalDonations;

    // Additional variables for overall statistics
    uint public totalDonationsCount = 0;
    uint public totalDonatedAmount = 0;
    mapping(address => bool) private uniqueDonors;

    // Event to log donation activities.
    event DonationMade(address indexed donor, uint indexed projectId, uint amount);

    // Function to add a new project. Existing projects cannot be updated (wallet address is immutable).
    function setProject(uint projectId, address payable projectWallet, string memory projectName) public onlyOwner whenNotPaused {
        require(projectId >= 0 && projectId < maxProjectCount, "Invalid project ID or exceeds max limit");
        require(projectWallet != address(0), "Invalid wallet address");
        require(projects[projectId].wallet == address(0), "Project already exists");

        // Direkte Initialisierung des Project-Structs im Mapping
        projects[projectId] = Project(projectWallet, 0, 0, projectName);
    }

    // Function to remove a project from the platform.
    function removeProject(uint projectId) public onlyOwner whenNotPaused {
        require(projectId >= 0 && projectId < maxProjectCount, "Invalid project ID");
        require(projects[projectId].wallet != address(0), "Project does not exist");
        
        delete projects[projectId];
    }

    // Function to adjust the service fee basispoints in 0.1% steps.
    function adjustServiceFee(uint newFeePercentage) public onlyOwner {
        require(newFeePercentage >= 0 && newFeePercentage <= 30, "Fee must be between 0% and 3%");
        serviceFeeBasisPoints = newFeePercentage;
    }

    // Function to handle donation transactions to a specific project.
    function donate(uint projectId) public payable whenNotPaused nonReentrant {
        require(msg.value > 0, "Donation must be greater than 0");
        require(projects[projectId].wallet != address(0), "Project does not exist");
        
        uint fee = (msg.value * serviceFeeBasisPoints) / 1000; // Calculating the fee
        uint donationAmount = msg.value - fee;

        projects[projectId].totalDonations += donationAmount;
        projects[projectId].pendingWithdrawals += donationAmount; // Update of outstanding withdrawals

        userTotalDonations[msg.sender] += donationAmount;

        payable(owner()).transfer(fee);

        emit DonationMade(msg.sender, projectId, donationAmount);
    }

    // Function for projects to withdraw their donations
    function withdrawDonations(uint projectId) public nonReentrant {
        Project storage project = projects[projectId];
        require(msg.sender == project.wallet, "Only project wallet can withdraw");
        require(project.pendingWithdrawals > 0, "No funds to withdraw");

        uint amount = project.pendingWithdrawals;
        project.pendingWithdrawals = 0;
        project.wallet.transfer(amount);
    }

    // Functions for pausing and resuming the contract
    function pause() public onlyOwner {
        _pause();
    }
    function unpause() public onlyOwner {
    _unpause();
    }

    // Function to get the total donations for a specific project.
    function getTotalDonations(uint projectId) public view returns (uint) {
        return projects[projectId].totalDonations;
    }

    // Function to get the total amount donated by a specific user.
    function getUserTotalDonations(address user) public view returns (uint) {
        return userTotalDonations[user];
    }
    
    // Function to retrieve the wallet address of a project based on its ID.
    function getWalletAddressByProjectId(uint projectId) public view returns (address) {
        return projects[projectId].wallet;
    }

    // Function to list all projects
    function listAllProjects() public view returns (string[] memory) {
        string[] memory projectNames = new string[](maxProjectCount);
        for (uint i = 0; i < maxProjectCount; i++) {
            if(projects[i].wallet != address(0)) {
                projectNames[i] = projects[i].name;
            }
        }
        return projectNames;
    }

    // Function for donation statistics
    function getDonationStatistics() public view returns (uint, uint) {
    return (totalDonationsCount, totalDonatedAmount);
    }
}
