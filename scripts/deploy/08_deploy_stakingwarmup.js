const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const stakingAddress = "0x6966C9E01A4E4530F01590653aBbb74Ba5cDA1ec";
    const sdfireAddress = "0xFf0463b18B6205C07F6FA9a8C39F98993d355008";
    // Deploy staking warmpup
    const StakingWarmpup = await ethers.getContractFactory('StakingWarmup');
    const stakingWarmup = await StakingWarmpup.deploy(stakingAddress, sdfireAddress);
    console.log("stakingWarmup deployed on ", stakingWarmup.address);
    // stakingWarmup address : 
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})