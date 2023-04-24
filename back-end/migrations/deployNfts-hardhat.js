async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MintableNFT = await ethers.getContractFactory("MintableNFT");
  const mintableNFT = await MintableNFT.deploy();
  console.log("Contract deployed to address:", mintableNFT.address);
  console.log("Transaction hash:", mintableNFT.deployTransaction.hash);
  console.log("Gas used:", mintableNFT.deployTransaction.gasLimit.toString());
  console.log("Block number:", mintableNFT.deployTransaction.blockNumber);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
