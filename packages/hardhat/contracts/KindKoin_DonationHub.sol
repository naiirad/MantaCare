// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";

contract KindKoin_DonationHub is Ownable {
	// Structure to store information about each project
    struct Project {
        address payable wallet; // Wallet address to receive donations
        uint totalDonations;    // Total amount of donations received
    }

    // Service fee percentage, initialized to 1%
    uint public serviceFeePercentage = 1;

    // Mapping from project ID to project details
    mapping(uint => Project) private projects;
    // Mapping to track total donations made by each user
    mapping(address => uint) private userTotalDonations;

    // Event emitted when a donation is made
    event DonationMade(address indexed donor, uint indexed projectId, uint amount);

    // Function to add a new project or update an existing one to the platform
    function setProject(uint projectId, address payable projectWallet) public onlyOwner {
        projects[projectId] = Project(projectWallet, 0);
    }

    // Function to remove a project from the platform
    function removeProject(uint projectId) public onlyOwner {
        delete projects[projectId];
    }

    // Function to adjust the service fee percentage
    function adjustServiceFee(uint newFeePercentage) public onlyOwner {
        require(newFeePercentage >= 0 && newFeePercentage <= 3, "Fee must be between 0% and 3%");
        serviceFeePercentage = newFeePercentage;
    }

    // Function to handle donation transactions
    function donate(uint projectId) public payable {
        require(msg.value > 0, "Donation must be greater than 0");

        // Calculate the service fee and the actual donation amount
        uint fee = (msg.value * serviceFeePercentage) / 100;
        uint donationAmount = msg.value - fee;

        // Transfer the donation to the project's wallet
        projects[projectId].wallet.transfer(donationAmount);
        // Update total donations for the project
        projects[projectId].totalDonations += donationAmount;
        // Update total donations made by the user
        userTotalDonations[msg.sender] += donationAmount;

        // Transfer the fee to the contract owner
        payable(owner()).transfer(fee);

        // Emit an event for the donation
        emit DonationMade(msg.sender, projectId, donationAmount);
    }

    // Function to donate evenly across all projects
function donateToAllProjects() public payable {
    require(msg.value > 0, "Donation must be greater than 0");

    // Calculate the service fee
    uint fee = (msg.value * serviceFeePercentage) / 100;
    uint remainingAmount = msg.value - fee;

    // Calculate the number of projects
    uint projectCount = 0;
    for (uint i = 0; ; i++) {
        if (projects[i].wallet != address(0)) {
            projectCount++;
        } else {
            break;
        }
    }

    require(projectCount > 0, "No projects to donate to");

    // Calculate the donation amount for each project
    uint donationPerProject = remainingAmount / projectCount;

    // Distribute the donations to each project
    for (uint i = 0; i < projectCount; i++) {
        if (projects[i].wallet != address(0)) {
            projects[i].wallet.transfer(donationPerProject);
            projects[i].totalDonations += donationPerProject;
        }
    }

    // Update total donations made by the user
    userTotalDonations[msg.sender] += remainingAmount;

    // Transfer the fee to the contract owner
    payable(owner()).transfer(fee);

    // Emit an event for each donation made to a project
    for (uint i = 0; i < projectCount; i++) {
        if (projects[i].wallet != address(0)) {
            emit DonationMade(msg.sender, i, donationPerProject);
        }
    }
}

    // Function to get the total donations for a specific project
    function getTotalDonations(uint projectId) public view returns (uint) {
        return projects[projectId].totalDonations;
    }

    // Function to get the total amount donated by a specific user
    function getUserTotalDonations(address user) public view returns (uint) {
        return userTotalDonations[user];
    }
	    
	// Function to retrieve the wallet address of a project based on its ID
    function getWalletAddressByProjectId(uint projectId) public view returns (address) {
        return projects[projectId].wallet;
	}
}
