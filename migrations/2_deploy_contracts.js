const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
    //deploy tether token contract
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

    //deploy rwd contracts
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    //deploy decentral bank contract
    await deployer.deploy(DecentralBank, rwd.address, tether.address)
    const decentralBank = await DecentralBank.deployed();

    //transfer all rwd tokens to decentral bank
    await rwd.transfer(decentralBank.address,'100000000000000000000000000')
    await tether.transfer(accounts[1], '100000000000000000000')
};

