const hre = require('hardhat');

async function main() {

    const Ecommerce = await hre.ethers.getContractFactory("Ecommerce")
    const ecommerce = await Ecommerce.deploy();

    await ecommerce.deployed();

    console.log("contract deployed to:", ecommerce.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });