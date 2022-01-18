const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const dfireAddress = "0x17a0Cb03B9EC692D695C254A04dB5A7f137A3730";
    const mimAddress = "0x4D75cca9A7F498Dc83EAEF67400C2CD3596c3592";
    // Deploy treasury
    const Treasury = await ethers.getContractFactory('DeFIRETreasury');
    const treasury = await Treasury.deploy( dfireAddress, mimAddress, 0 );
    console.log("treasury deployed on", treasury.address);
    // treasury address : 
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})