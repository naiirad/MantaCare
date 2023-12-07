pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Interface for the StateRelayer
interface IStateRelayer {
    function getDexPairInfo(string calldata _pair) external view returns (uint256, DEXInfo memory);
}

// Structure for DEX-Informations
struct DEXInfo {
    uint256 price;
    // more(?) ...
}

contract MantaCareToken is ERC20, ERC20Burnable, Ownable {
    IStateRelayer public stateRelayer;
    address public mantaCareDonationContract;

    // Failsafe-Mode for manual token prices
    bool public failsafeMode = false;
    
    // Mapping for manual token prices
    mapping(string => uint256) public manualTokenPrices;

    constructor() ERC20("MantaCareToken", "MCT") {}

    function setStateRelayer(address _stateRelayer) external onlyOwner {
        stateRelayer = IStateRelayer(_stateRelayer);
    }

    function setMantaCareDonationContract(address _contractAddress) external onlyOwner {
        mantaCareDonationContract = _contractAddress;
    }

    // Function to toggle failsafe mode
    function toggleFailsafeMode() external onlyOwner {
        failsafeMode = !failsafeMode;
    }

    // Function to set manual token price
    function setManualTokenPrice(string memory tokenSymbol, uint256 price) external onlyOwner {
        manualTokenPrices[tokenSymbol] = price;
    }

    function processDonation(address donor, uint256 amount, string memory currency) external {
        require(msg.sender == mantaCareDonationContract, "Caller is not MantaCare Donation Contract");

        uint256 tokenAmount = calculateTokenAmount(amount, currency);
        _mint(donor, tokenAmount);
    }

    function processTokenDonation(address donor, uint256 amount, address tokenAddress) external {
        require(msg.sender == mantaCareDonationContract, "Caller is not MantaCare Donation Contract");

        string memory currency = ERC20(tokenAddress).symbol();
        uint256 tokenAmount = calculateTokenAmount(amount, currency);
        _mint(donor, tokenAmount);
    }

    function calculateTokenAmount(uint256 donationAmount, string memory currency) private returns (uint256) {
        uint256 price;
        if (failsafeMode) {
            price = manualTokenPrices[currency];
        } else {
            // Try to get the price from the StateRelayer
            (, DEXInfo memory dexInfo) = stateRelayer.getDexPairInfo(currency);
            price = dexInfo.price;
        }
        // 1 Token = 10 USD
        return donationAmount * price / 10;
    }
}
