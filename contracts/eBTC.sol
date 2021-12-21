// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IEBTC is IERC20{
    function burn(uint256 amount) external;
}

contract eBTC is ERC20 {
    constructor() ERC20("encrypt Bitcoin", "eBitcoin"){
        _mint(msg.sender, 10000000 * 10 ** 18);
    }

    function burn(uint256 amount) public{
        _burn(msg.sender, amount);
    }
}
