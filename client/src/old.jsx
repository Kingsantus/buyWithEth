import { useState,useEffect } from 'react'
import abi from "./contractjson/Weed.json"
import { ethers } from "ethers"
import './App.css'

function App() {
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract:null
  })

  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template =async()=>{
      const contractAddress="0x7df5bC2e15ec94e9441713eEb7a561C63623AB15";
      const contractABI=abi.abi;
      // Metamask for transaction
      try {
        const {ethereum} = window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        setState({provider, signer, contract});  
      } catch (error) {
        alert(error);
      }
      
    }
    template();
  })
  return (
    <div className='App'>
      <h1>Hello</h1>
    </div>
  )
}

export default App
