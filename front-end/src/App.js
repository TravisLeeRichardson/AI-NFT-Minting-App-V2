import React from "react";
import MintableNFT from "./contracts/MintableNFT.json";
import Web3 from "web3";
import styled from "@emotion/styled";
import "@fontsource/roboto";

const NFTPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 200px;
  margin: 16px;
`;

const NFTGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 30px;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #1e88e5;
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 12px;
  margin-bottom: 30px;

  &:hover {
    background-color: #1565c0;
  }

  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`;


class App extends React.Component {
  state = {
    web3: null,
    nftContract: null,
    account: null,
    balance: null,
    nftPlaceholders: new Array(10).fill(null),
  };

  connectToEthereum = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const nftContract = new web3.eth.Contract(
          MintableNFT.abi,
          MintableNFT.networks[31337].address // 31337 for hardhat, 5777 for truffle
      );

      const balance = await nftContract.methods.balanceOf(account).call();

      this.setState({ web3, nftContract, account, balance });
    } catch (error) {
      console.error("Error connecting to Ethereum:", error);
      alert("Failed to connect to Ethereum. Please try again.");
    }
  };

  buyNFT = async () => {
    const { web3, nftContract, account } = this.state;
    const price = Web3.utils.toWei("0.1", "ether");

    if (nftContract && account) {
      try {
        await nftContract.methods.mintNFT(account).send({
          from: account,
          value: price,
          gas: 500000, // Specify the gas limit for the transaction
          maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'), // Specify the max priority fee per gas (in gwei)
          maxFeePerGas: web3.utils.toWei('100', 'gwei'), // (Optional) Specify the max fee per gas (in gwei)
        });

        const balance = await nftContract.methods.balanceOf(account).call();
        const tokenId = await nftContract.methods.tokenOfOwnerByIndex(account, balance-1).call()

        const nftPlaceholders = [...this.state.nftPlaceholders];
        nftPlaceholders[tokenId - 1] = tokenId;
        this.setState({ balance, nftPlaceholders });
      } catch (error) {
        console.error("Error buying NFT:", error)
        alert("Failed to buy NFT. Please try again.");
      }
    } else {
      alert("Please connect to Ethereum before trying to buy an NFT.");
    }
  };

  render() {
    const { account, balance, nftPlaceholders } = this.state;

    return (
        <div className="App" style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "Roboto" }}>Mutant Lizard NFT Marketplace</h1>

          <NFTGrid className="NFTGrid">
            {nftPlaceholders.map((nft, index) => (
                <NFTPlaceholder className="NFTPlaceholder" key={index}>
                  <img src={`https://gateway.pinata.cloud/ipfs/QmbP8WoJXcCQmreTQaPR6b1LzQKDF3QCSgu17DMe5o16dB/${index+1}.jpg`} alt={`NFT ${index}`} style={{ width: "100%", height: "auto" }} />
                </NFTPlaceholder>
            ))}
          </NFTGrid>

          <div style={{ margin: "0 auto" }}>
            <Button className="Button" onClick={this.connectToEthereum}>Connect to Ethereum Network</Button>
            {account && <p>Connected account: {account}</p>}
            {balance !== null && <p>You own {balance} out of 10 NFTs</p>}
            {balance !== null && <p>Cost is 0.01 ETH</p>}
            <Button className="Button" onClick={this.buyNFT}>Buy NFT &nbsp;</Button>
          </div>
        </div>
    );
  }
}

export default App;

