// Initialize Web3
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// Contract ABI
const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "bridgeToBeraChain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "bridgeToBSC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "fromChain",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "toChain",
                "type": "string"
            }
        ],
        "name": "TokensBridged",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "berachainUSDCAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bscUSDTAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Contract addresses
const contractAddresses = {
    berachainUSDC: "0x959723c105eD00cc51Deb67FFdeDdD42c6390B2C",
    bscUSDT: "0x5E10a91adb891831378A6A035f9B05382B45Aa15"
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
