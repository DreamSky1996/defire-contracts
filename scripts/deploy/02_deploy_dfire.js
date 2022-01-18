const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    // Deploy defire
    const DFIRE = await ethers.getContractFactory('DeFIREERC20Token');
    const defire = await DFIRE.deploy();
    console.log("DFIRE deployed on ", defire.address);
    // defire address : 
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})