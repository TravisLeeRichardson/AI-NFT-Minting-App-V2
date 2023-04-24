require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.1",
    networks: {
        development: {
            url: "http://127.0.0.1:8545",
        },
        hardhat: {
            chainId: 31337
        }
    },
    mocha: {
        // timeout: 100000
    }
};
