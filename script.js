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

// BNBERABridge contract addresses
const bnberaBridgeContractAddresses = {
    berachain: "0xA40804e0Df0C3E2d3a89b1048469F6924F040234",
    bscTestnet: "0xe96AC8Dd9508b7D9C3a63803Aa9843C4d60aAf45"
};

// Initialize contract instance for BNBERABridge on BeraChain
const bnberaBridgeBeraChainContract = new web3BeraChain.eth.Contract(abi, bnberaBridgeContractAddresses.berachain);

// Initialize contract instance for BNBERABridge on BSC Testnet
const bnberaBridgeBSCTestnetContract = new web3BSC.eth.Contract(abi, bnberaBridgeContractAddresses.bscTestnet);

// Function to bridge USDC tokens from BeraChain testnet to BSC testnet
async function bridgeToBSC() {
    const amount = document.getElementById("amount").value;
    try {
        const response = await bnberaBridgeBeraChainContract.methods.bridgeToBSC(web3BeraChain.utils.toWei(amount)).send({ from: (await web3BeraChain.eth.getAccounts())[0] });
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
        const response = await bnberaBridgeBSCTestnetContract.methods.bridgeToBeraChain(web3BSC.utils.toWei(amount)).send({ from: (await web3BSC.eth.getAccounts())[0] });
        console.log(response);
        alert("Transaction submitted. Please wait for confirmation.");
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while bridging to BeraChain.');
    }
}

// Function to connect to the user's wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Wallet connected!');
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Connect wallet button event listener
    document.getElementById('connectButton').addEventListener('click', connectWallet);
});
