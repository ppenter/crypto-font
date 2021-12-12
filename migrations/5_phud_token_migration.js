const eBitcoin = artifacts.require("eBitcoin");
const cFont = artifacts.require("cryptoFont");

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(eBitcoin);
    await deployer.deploy(cFont, eBitcoin.address);
});
};
