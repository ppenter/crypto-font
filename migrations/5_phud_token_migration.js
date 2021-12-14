const eBitcoin = artifacts.require("eBitcoin");
const cFont = artifacts.require("cryptoFont");
const Market = artifacts.require("Market");

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(eBitcoin);
    await deployer.deploy(cFont, eBitcoin.address);
    await deployer.deploy(Market, eBitcoin.address);
});
};
