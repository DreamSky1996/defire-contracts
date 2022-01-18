const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const mimAddress = "0x4D75cca9A7F498Dc83EAEF67400C2CD3596c3592"
    const mimBondAddress = "0x07df32EF3159c784a12E58dAf9d32eB236a30D6f";
    const stakingAddress = "0x6966C9E01A4E4530F01590653aBbb74Ba5cDA1ec";
    const treasuryAddress = "0x0010874Fd0641e4eEB0A8D2F04447C70eA2c686c";
    const sdfireAddress = "0xFf0463b18B6205C07F6FA9a8C39F98993d355008";
    const dfireAddress = "0x17a0Cb03B9EC692D695C254A04dB5A7f137A3730";
    const distributorAddress = "0x2095C6a9a47695f4124A2A2e1178fDb16f61169a";

    
    const initialMint = "10000000000000000000000000";
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    const initialIndex = "20064431173";
    const initialRewardRate = '3000';
    const largeApproval = '100000000000000000000000000000000';

    const MIMContract = await ethers.getContractFactory('AnyswapV5ERC20');
    const mimContract = await MIMContract.attach(mimAddress);

     // Deploy 10,000,000 mock MIM and mock wAvax
    //  await mimContract.initVault(deployer.address);
     

    const Treasury = await ethers.getContractFactory('DeFIRETreasury');
    const treasury = await Treasury.attach(treasuryAddress);

    const SDFIRE = await ethers.getContractFactory('sDFIRE');
    const sdfire = await SDFIRE.attach(sdfireAddress);

    const DFIRE = await ethers.getContractFactory('DeFIREERC20Token');
    const defire = await DFIRE.attach(dfireAddress);

    const Distributor = await ethers.getContractFactory('Distributor');
    const distributor = await Distributor.attach(distributorAddress);

    await mimContract.mint( deployer.address, initialMint );
    console.log("mim minted ", initialMint);

    // queue and toggle MIM and wAvax bond reserve depositor
    await treasury.queue('0', mimBondAddress);
    await treasury.toggle('0', mimBondAddress, zeroAddress);
    console.log("queue and toggle MIM bond reserve depositor");
    
    await sdfire.initialize(stakingAddress);
    await sdfire.setIndex(initialIndex);
    console.log("Initialize sdfire and set the index");

    // Set treasury for defire token
    await defire.setVault(treasuryAddress);
    console.log("Set treasury for defire token");

    // Add staking contract as distributor recipient
    await distributor.addRecipient(stakingAddress, initialRewardRate);
    console.log("Add staking contract as distributor recipient");
    // queue and toggle reward manager
    await treasury.queue('8', distributorAddress);
    console.log("queue reward manager");
    await treasury.toggle('8', distributorAddress, zeroAddress);
    console.log("toggle reward manager");

    await treasury.queue('0', deployer.address);
    console.log("queue deployer reserve depositor");
    await treasury.toggle('0', deployer.address, zeroAddress);
    console.log("toggle deployer reserve depositor");

    await treasury.queue('4', deployer.address);
    console.log("queue liquidity depositor");
    await treasury.toggle('4', deployer.address, zeroAddress);
    console.log("toggle liquidity depositor");

    await mimContract.approve(treasuryAddress, largeApproval );
    console.log("Approved the treasury to spend MIM and wAvax");

    await treasury.deposit('9000000000000000000000000', mimAddress, '8400000000000000');
    console.log("treasury deposited mim");

    
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})