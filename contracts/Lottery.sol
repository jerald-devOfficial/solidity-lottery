// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.17;

contract Lottery {
    address public manager;

    function Lottery() public {
        manager = msg.sender;
    }
}