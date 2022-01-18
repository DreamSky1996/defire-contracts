const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const mimBondAddress = "0x07df32EF3159c784a12E58dAf9d32eB236a30D6f";
    const stakingAddress = "0x6966C9E01A4E4530F01590653aBbb74Ba5cDA1ec";
    const stakingHelperAddress = "0xA657747e704335F75AAb0fD1fE05d649f9923294";

    const mimBondBCV = "220";
    const minBondPrice = "1000";
    const maxBondPayout = "75";
    const bondFee = "10000";
    const maxBondDebt = "2000000000000000";
    const intialBondDebt = "0";
    const bondVestingLength = "432000";

    const MIMBond = await ethers.getContractFactory('DeFIREBondDepository');
    const mimBond = await MIMBond.attach(mimBondAddress);
    
    // Set MIM bond terms
    await mimBond.initializeBondTerms(mimBondBCV, minBondPrice, maxBondPayout, bondFee, maxBondDebt, intialBondDebt, bondVestingLength);
    console.log("Set MIM bond terms");

    // Set staking for MIM bond
    await mimBond.setStaking(stakingAddress, 0);
    await mimBond.setStaking(stakingHelperAddress, 1);
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})