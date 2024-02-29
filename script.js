// Initialize Web3
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// Contract ABI
const abi = [
    // Paste your contract ABI here
];

// Contract address
const contractAddress = "0xContractAddress";

// Initialize contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Swap BNB for WBERA
function swapBNBForWBERA() {
    const amount = document.getElementById("amount").value;
    contract.methods.swapBNBForWBERA(web3.utils.toWei(amount)).send({ from: web3.eth.defaultAccount })
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

// Swap WBERA for BNB
function swapWBERAForBNB() {
    const amount = document.getElementById("amount").value;
    contract.methods.swapWBERAForBNB(web3.utils.toWei(amount)).send({ from: web3.eth.defaultAccount })
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
