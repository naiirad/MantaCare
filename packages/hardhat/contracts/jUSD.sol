// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract jUSD is ERC20 {
    constructor() ERC20("jUSD", "JUSD") {
        uint256 totalSupply = 40000 * 10**uint256(decimals()); // Gesamtanzahl der Tokens mit Dezimalstellen

        // Verteile die Tokens bei der Erstellung des Contracts
        _mint(0xABE99a64eea7917e483d6Cb38237002bfc6d3CBD, totalSupply / 2);
        _mint(0x96106f0969F0ABFE796Dffa0c3ae91d953800306, totalSupply / 2);
    }
}
