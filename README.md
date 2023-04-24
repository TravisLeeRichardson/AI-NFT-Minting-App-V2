# AI-NFT-Minting-App-V2

![alt text](https://github.com/TravisLeeRichardson/AI-NFT-Minting-App-V2/blob/master/Mutant%20Lizard%20NFT%20Marketplace%20Screenshot.png)
![alt text](https://github.com/TravisLeeRichardson/AI-NFT-Minting-App-V2/blob/master/Mutant%20Lizard%20NFT%20Marketplace%20Screenshot%202.png)

Download files to your local system.

Navigate to /backend, and issue the following commands:
### `npm init -y` 
### `npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers`
### `npm install --save-dev @nomicfoundation/hardhat-toolbox`
### `npm install web3 @openzeppelin/contracts`
### `npx hardhat compile`
### `npx hardhat node`
### In Metamask, Create a Hardhat Network Local Network
    Open Metamask and click on the network dropdown in the top center of the screen.
    
    Click on "Custom RPC".
    
    In the "New Network" screen, enter the following information:
    
    Network Name: Hardhat
    RPC URL: http://localhost:8545
    Chain ID: 31337
    Currency Symbol: ETH
    Click on "Save" to save the network configuration.
 ### In Metamask, Import a new Account using one of the private keys you just generated.

In another terminal, navigate to /backend and issue the following command:
### `npx hardhat run ./migrations/deployNfts-hardhat.js --network localhost`

Finally, in a 3rd terminal, navigate to /frontend and issue the following commands:
### `npm init -y`
### `npm start`
