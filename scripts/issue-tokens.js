const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function issueRewards(callback) {
    let decentralBank = await DecentralBank.deployed(); // Change variable name here
    await decentralBank.issueTokens(); // Use the new variable name
    console.log('Tokens have been issued successfully!');
    callback();
}
