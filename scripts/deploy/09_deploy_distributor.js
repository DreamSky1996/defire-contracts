const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const firstEpochBlock = "1638511200";
    const epochLengthInBlocks = "28800";

    const dfireAddress = "0x17a0Cb03B9EC692D695C254A04dB5A7f137A3730";
    const treasuryAddress = "0x0010874Fd0641e4eEB0A8D2F04447C70eA2c686c";
    // Deploy staking distributor
    const Distributor = await ethers.getContractFactory('Distributor');
    const distributor = await Distributor.deploy(treasuryAddress, dfireAddress, epochLengthInBlocks, firstEpochBlock);
    console.log("distributor deployed on ", distributor.address);
    // distributor address : 

    
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})