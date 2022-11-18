const contract = artifacts.require("cryptoFont");

const main = async () => {
  console.log("before deployed");
  const deployed = await contract.deployed();

  console.log("before estimateGas");
  const gasEstimate = deployed.someMethod.estimateGas();

  console.log("Gas estimate for `someMethod` is ", gasEstimate);
}

module.exports = async (done) => {
  await main();
  done();
};