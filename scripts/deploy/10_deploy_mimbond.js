const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);


    const dfireAddress = "0x17a0Cb03B9EC692D695C254A04dB5A7f137A3730";
    const treasuryAddress = "0x0010874Fd0641e4eEB0A8D2F04447C70eA2c686c";
    const daoAddress = "0x6a13B603dA10fAD8115F591EadfEB12800A3b50A";
    const mimAddress = "0x4D75cca9A7F498Dc83EAEF67400C2CD3596c3592";
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    // Deploy MIM bond
    const MIMBond = await ethers.getContractFactory('DeFIREBondDepository');
    const mimBond = await MIMBond.deploy(dfireAddress, mimAddress, treasuryAddress, daoAddress, zeroAddress);
    console.log("mimBond deployed on ", mimBond.address);
    // mimBond address : 
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})