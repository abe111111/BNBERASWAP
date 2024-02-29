// Initialize Web3
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// Contract ABI
const abi = [
    // Paste your contract ABI here
];

// Contract addresses
const contractAddresses = {
    berachainUSDC: 0x959723c105eD00cc51Deb67FFdeDdD42c6390B2C,
    bscUSDT: 0x5E10a91adb891831378A6A035f9B05382B45Aa15
};

// Initialize contract instance
const contract = new web3.eth.Contract(abi, contractAddresses.berachainUSDC);

// Function to bridge USDC tokens from BeraChain testnet to BSC testnet
function bridgeToBSC() {
    const amount = document.getElementById("amount").value;
    contract.methods.bridgeToBSC(web3.utils.toWei(amount)).send({ from: web3.eth.defaultAccount })
    .on('transactionHash', function(hash){
        console.log(hash);
        alert("Transaction submitted. Please wait for confirmation.");
    })
    .on('receipt', function(receipt){
        console.log(receipt);
        alert("Transaction confirmed!");
    })
    .on('error', function(error){
        console.error(error);
        alert("Transaction failed. Please try again.");
    });
}

// Function to bridge USDT tokens from BSC testnet to BeraChain testnet
function bridgeToBeraChain() {
    const amount = document.getElementById("amount").value;
    contract.methods.bridgeToBeraChain(web3.utils.toWei(amount)).send({ from: web3.eth.defaultAccount })
    .on('transactionHash', function(hash){
        console.log(hash);
        alert("Transaction submitted. Please wait for confirmation.");
    })
    .on('receipt', function(receipt){
        console.log(receipt);
        alert("Transaction confirmed!");
    })
    .on('error', function(error){
        console.error(error);
        alert("Transaction failed. Please try again.");
    });
}
