const eBitcoin = artifacts.require("eBTC");
const cFont = artifacts.require("cryptoFont");
const Market = artifacts.require("Market");
const ICO = artifacts.require("ICO");

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(eBitcoin);
    await deployer.deploy(cFont, eBitcoin.address);
    await deployer.deploy(Market, eBitcoin.address, cFont.address);
    await deployer.deploy(ICO);
});
};
