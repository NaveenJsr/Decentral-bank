const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;

chai.use(chaiAsPromised);

contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank;

    const tokens = (number) => {
        return web3.utils.toWei(number, 'ether');
    };

    before(async () => {
        tether = await Tether.new();
        rwd = await RWD.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        await rwd.transfer(decentralBank.address, tokens('1000000'));

        await tether.transfer(customer, tokens('100'), { from: owner });
    });

    describe('Tether deployment', () => {
        it('matches name successfully', async () => {
            const name = await tether.name();
            expect(name).to.equal('Tether Token');
        });
    });

    describe('Reward Token', () => {
        it('matches name successfully', async () => {
            const name = await rwd.name();
            expect(name).to.equal('Reward Token');
        });
    });

    describe('Decentral Bank Deployment', () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name();
            expect(name).to.equal('Decentral Bank');
        });

        it('contract has tokens', async () => {
            const balance = await rwd.balanceOf(decentralBank.address);
            expect(balance.toString()).to.equal(tokens('1000000'));
        });
    });

    describe('yield farming', () => {
        it('rewards token for staking', async () => {
          let result = await tether.balanceOf(customer);
          expect(result.toString()).to.equal(tokens('100'), 'customer wallet balance before staking');
      
          await tether.approve(decentralBank.address, tokens('100'), { from: customer });
          await decentralBank.depositTokens(tokens('100'), { from: customer });
      
          result = await tether.balanceOf(customer);
          expect(result.toString()).to.equal(tokens('0'), 'customer wallet balance after staking');
      
          result = await tether.balanceOf(decentralBank.address);
          expect(result.toString()).to.equal(tokens('100'), 'decentral bank wallet balance after staking');
      
          result = await decentralBank.isStaking(customer);
          expect(result.toString()).to.equal('true', 'customer is staking status after staking');
          
          await decentralBank.issueTokens({from: owner});

          try {
            await decentralBank.issueTokens({ from: customer }); // Attempting to issue tokens from customer should fail
            // Add an assertion to fail the test if the above line does not throw an error
            expect.fail('Expected an error but did not get one');
          } catch (error) {
            // Verify that the error message contains the expected message
            expect(error.message).to.include('revert', 'Expected "revert" error');
          }

          await decentralBank.unstakeTokens({from: customer});

          result = await tether.balanceOf(customer);
          expect(result.toString()).to.equal(tokens('100'), 'customer wallet balance after unstaking');
      
          result = await tether.balanceOf(decentralBank.address);
          expect(result.toString()).to.equal(tokens('0'), 'decentral bank wallet balance after unstaking');
      
          result = await decentralBank.isStaking(customer);
          expect(result.toString()).to.equal('false', 'customer is no longer staking after unstaking');
        });
      });
      
});
