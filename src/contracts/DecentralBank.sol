// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor (RWD _rwd, Tether _tether) public {
        owner = msg.sender;
        rwd = _rwd;
        tether = _tether;
    }

    function depositTokens(uint256 _amount) public {
        require(_amount > 0, 'Amount cannot be zero');

        // Transfer tokens from sender to this contract
        require(
            tether.transferFrom(msg.sender, address(this), _amount),
            'Transfer failed'
        );

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add sender to stakers if not already staked
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Mark sender as staked
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'staking balance cannot be less than zero');

        tether.transfer((msg.sender), balance);

        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }

    function issueTokens() public {
        require(msg.sender == owner, 'caller must be the qwner');

        for(uint i=0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9; 
            if(balance > 0){
                rwd.transfer(recipient, balance);
            }
        }
    }
}
