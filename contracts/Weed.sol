// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Weed {
    
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;

    address payable owner;

    error Weed_FundIsNeeded();

    constructor(){
        owner = payable(msg.sender);
    }

    function buyWeed(string calldata name, string calldata message) external payable {
        if (msg.value <= 0){
            revert Weed_FundIsNeeded();
        }
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}