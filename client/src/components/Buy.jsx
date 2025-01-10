import { ethers, Transaction } from "ethers";

const Buy = ({state}) => {
    const buyWeed = async(event) => {
        event.preventDefault();
        const {contract}=state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        const amountInEth = {value:ethers.parseEther("0.0015")};

        const transaction = await contract.buyWeed(name,message,amountInEth);
        await transaction.wait();
        alert("Transaction is Successful");
        window.location.reload();
    }
    return (
        <>
        <h1>Sold at $5, you will be charged ETH0.0015 if you click pay</h1>
        <form onSubmit={buyWeed}>
            <input id="name"></input>
            <input id="message"></input>
            <button>Pay</button>
        </form>
        </>
    );
};

export default Buy;