const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const epochLengthInBlocks = "28800";
    const firstEpochNumber = "343";
    const firstEpochBlock = "1638511200";
    const dfireAddress = "0x17a0Cb03B9EC692D695C254A04dB5A7f137A3730";
    const sdfireAddress = "0xFf0463b18B6205C07F6FA9a8C39F98993d355008";
    // Deploy Staking
    const Staking = await ethers.getContractFactory('DeFIREStaking');
    const staking = await Staking.deploy( dfireAddress, sdfireAddress, epochLengthInBlocks, firstEpochNumber, firstEpochBlock );
    console.log("DeFIREStaking deployed on ", staking.address);
    // DeFIREStaking address :
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})