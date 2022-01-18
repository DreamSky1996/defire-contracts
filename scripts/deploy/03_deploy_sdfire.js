const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    // Deploy MEMO
    const SDFIRE = await ethers.getContractFactory('sDFIRE');
    const sdfire = await SDFIRE.deploy();
    console.log("SDFIRE deployed on ", sdfire.address);
    // SDFIRE address : 
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})