# Decentral-Bank: A Decentralized Bank Staking Platform

***Decentral-Bank is a decentralized staking platform built using Solidity, Ganache, Truffle, React, and Mocha/Chai for unit testing. This platform allows you to stake your cryptocurrency assets and earn rewards in a decentralized manner.***

## How To Run
Follow these steps to run the Decentral-Bank staking platform on your local environment:

### Step 1: Clone the Repository
First, clone the Decentral-Bank repository using Git Bash or download the ZIP file and navigate to the project directory:
```bash
$ cd Decentral-bank/
$ git clone git@github.com:NaveenJsr/Decentral-bank.git
```
### Step 2: Install Dependencies
Install all the project dependencies by running the following command:
```bash
$ npm install
```
### Step 3: Configure Ganache
Before starting the application, ensure that you have Ganache, a personal blockchain, running on your local machine. Compare the truffle-config.js file's network settings with your Ganache RPC Server and Port. Make sure they match, or update them accordingly.

Also, connect your Ganache network ID with Metamask.
### Step 4: Install Truffle Globally
Install Truffle globally on your system by running the following command:
```bash
$ npm install -g truffle
```
### Step 5: Test the Contracts
Run unit tests for the smart contracts to ensure everything is functioning correctly:
```bash
$ truffle test
``` 
### Step 6: Compile and Deploy Contracts
Compile and deploy the smart contracts to your local blockchain:
```bash
$ truffle compile
$ truffle migrate
```
If you encounter issues, you can try resetting the migrations:
```bash
$ truffle migrate --reset
```
### Step 7: Start the Application
If you've completed all the previous steps without any errors, you can now start the Decentral-Bank application:
```bash
$ npm run start
```

Enjoy using the Decentral-Bank platform to stake your cryptocurrency assets and earn rewards in a decentralized manner.

Feel free to reach out if you have any questions or encounter any issues while running the platform. Happy staking!
