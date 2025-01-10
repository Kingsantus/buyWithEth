import { useState,useEffect } from 'react'
import abi from "./contractjson/Weed.json"
import { ethers } from "ethers"
import Buy from "./components/Buy"
import Memos  from "./components/Memos"
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
        window.ethereum.on("accountChanged", () => {
          window.location.reload();
        })
        setAccount(account[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract);
        setState({provider, signer, contract});  
      } catch (error) {
        alert(error);
      }
      
    }
    template();
  },[])
  return (
    <div className='App'>
      Connected account: {account}
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
    </div>
  )
}

export default App