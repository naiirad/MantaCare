// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Hardhat console for debugging purposes. Remove this import for production deployment.
import "hardhat/console.sol";

// Importing OpenZeppelin's Ownable contract for access control functionalities.
import "@openzeppelin/contracts/access/Ownable.sol";

// The KindKoin_DonationHub contract for handling project donations.
contract KindKoin_DonationHub is Ownable {
    // Project struct to hold each project's wallet address and total donations received.
    struct Project {
        address payable wallet;
        uint totalDonations;
    }

    // Variable to store the service fee percentage. Initialized to 1% (10 basis points).
    uint public serviceFeePercentage = 10; // 1% = 10 basis points

    // Mapping to store project details by their ID.
    mapping(uint => Project) private projects;
    // Mapping to track the total donations made by each user.
    mapping(address => uint) private userTotalDonations;

    // Event to log donation activities.
    event DonationMade(address indexed donor, uint indexed projectId, uint amount);

    // Function to add a new project. Existing projects cannot be updated (wallet address is immutable).
    function setProject(uint projectId, address payable projectWallet) public onlyOwner {
        require(projectId >= 0, "Invalid project ID");
        require(projectWallet != address(0), "Invalid wallet address");
        require(projects[projectId].wallet == address(0), "Project already exists");
        projects[projectId] = Project(projectWallet, 0);
    }

    // Function to remove a project from the platform.
    function removeProject(uint projectId) public onlyOwner {
        require(projectId >= 0, "Invalid project ID");
        require(projects[projectId].wallet != address(0), "Project does not exist");
        delete projects[projectId];
    }

    // Function to adjust the service fee percentage in 0.1% steps.
    function adjustServiceFee(uint newFeePercentage) public onlyOwner {
        require(newFeePercentage >= 0 && newFeePercentage <= 30, "Fee must be between 0% and 3%");
        serviceFeePercentage = newFeePercentage;
    }

    // Function to handle donation transactions to a specific project.
    function donate(uint projectId) public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        require(projects[projectId].wallet != address(0), "Project does not exist");
        require(gasleft() >= 2300, "Insufficient gas");
        
        uint fee = (msg.value * serviceFeePercentage) / 1000; // Calculating the fee
        uint donationAmount = msg.value - fee;

        projects[projectId].wallet.transfer(donationAmount);
        projects[projectId].totalDonations += donationAmount;

        userTotalDonations[msg.sender] += donationAmount;

        payable(owner()).transfer(fee);

        emit DonationMade(msg.sender, projectId, donationAmount);
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
}
