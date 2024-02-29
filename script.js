// Initialize Web3 with Ankr's RPC endpoint for BeraChain Testnet
const web3BeraChain = new Web3('https://rpc.ankr.com/berachain_testnet');

// Initialize Web3 with Ankr's RPC endpoint for BSC Testnet
const web3BSC = new Web3('https://rpc.ankr.com/bsc_testnet_chapel');

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

// Initialize contract instance for BeraChain
const contractBeraChain = new web3BeraChain.eth.Contract(abi, contractAddresses.berachainUSDC);

// Initialize contract instance for BSC
const contractBSC = new web3BSC.eth.Contract(abi, contractAddresses.bscUSDT);

// Function to bridge USDC tokens from BeraChain testnet to BSC testnet

async function bridgeToBSC() {
    const amount = document.getElementById("amount").value;
    try {
        const accounts = await web3BeraChain.eth.getAccounts();
        const response = await contractBeraChain.methods.bridgeToBSC(web3BeraChain.utils.toWei(amount)).send({ from: accounts[0] });
        console.log(response);
        alert("Transaction submitted. Please wait for confirmation.");
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while bridging to BSC.');
    }
}

// Function to bridge USDT tokens from BSC testnet to BeraChain testnet
async function bridgeToBeraChain() {
    const amount = document.getElementById("amount").value;
    try {
        const accounts = await web3BSC.eth.getAccounts();
        const response = await contractBSC.methods.bridgeToBeraChain(web3BSC.utils.toWei(amount)).send({ from: accounts[0] });
        console.log(response);
        alert("Transaction submitted. Please wait for confirmation.");
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while bridging to BeraChain.');
    }
}

