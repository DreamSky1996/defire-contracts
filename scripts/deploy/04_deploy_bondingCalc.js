const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const dfireAddress = "0x17a0Cb03B9EC692D695C254A04dB5A7f137A3730";
    // Deploy bonding calc
    const BondingCalculator = await ethers.getContractFactory('DeFIREBondingCalculator');
    const bondingCalculator = await BondingCalculator.deploy( dfireAddress );
    console.log("BondingCalculator deployed on ", bondingCalculator.address);
    // bondingCalculator address : 
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})