// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BalanceGetter {
    constructor() {}

    function readBalances(address token, address[] calldata addresses) public virtual returns (uint[] memory) {
        IERC20 erc20 = IERC20(token);
        uint[] memory balances = new uint[](addresses.length);

        for (uint i = 0; i < addresses.length; i++) {
            balances[i] = erc20.balanceOf(addresses[i]);
        }

        // return 16;
        return balances;
    }
}