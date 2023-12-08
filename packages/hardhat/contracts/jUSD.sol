// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract jUSD is ERC20 {
    constructor() ERC20("jUSD", "JUSD") {
        uint256 totalSupply = 40000 * 10**uint256(decimals()); // Gesamtanzahl der Tokens mit Dezimalstellen

        // Verteile die Tokens bei der Erstellung des Contracts
        _mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, totalSupply / 2);
        _mint(0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65, totalSupply / 2);
    }
}
