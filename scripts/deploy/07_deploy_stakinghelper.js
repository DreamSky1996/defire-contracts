const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const stakingAddress = "0x6966C9E01A4E4530F01590653aBbb74Ba5cDA1ec";
    const dfireAddress = "0x17a0Cb03B9EC692D695C254A04dB5A7f137A3730";
    // Deploy staking helper
    const StakingHelper = await ethers.getContractFactory('StakingHelper');
    const stakingHelper = await StakingHelper.deploy(stakingAddress, dfireAddress);
    console.log("stakingHelper deployed on ", stakingHelper.address);
    // stakingHelper address : 
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})