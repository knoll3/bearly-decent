var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Bear = artifacts.require("./Bear.sol");

module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(Bear);
};
