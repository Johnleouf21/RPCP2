import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import InfosAccount from './Components/InfosAccount';
import Contract from './artifacts/contracts/Rpcp.sol/Rpcp.json';
import React from 'react';
import './App.css';

const address = "0x634f77aD54de7f9C92aAF9bab38700fEB199F2F6";


function App() {

  const [loader, setLoader] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState({});

  useEffect(() => {
    getAccounts();
    setLoader(false);
    fetchData(); 
  }, [])


  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(address, Contract.abi, provider);
      try {
        const totalSupply = await contract.totalSupply();
        const priceRaton = await contract.priceRaton();
        const priceCarcajou = await contract.priceCarcajou();
        const priceRenard = await contract.priceRenard();
        const priceLoup = await contract.priceLoup();
        const priceOurs = await contract.priceOurs();
        const object = {"priceRaton": String(priceRaton),"priceCarcajou": String(priceCarcajou),"priceRenard": String(priceRenard),"priceLoup": String(priceLoup),"priceOurs": String(priceOurs),"totalSupply": String(totalSupply)}
        setData(object);
      }
      catch(err) {
        console.log(err);
      }
    }
  }
  
  const incrementQuantity = () => { 
          quantity + 1 <= 4 && setQuantity(quantity + 1);
  }

  const decrementQuantity = () => { 
          quantity - 1 >= 1 && setQuantity(quantity - 1)
  }

  async function withdrawCommission() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);

      try {
        
        const transaction = await contract.withdrawCommission();
        await transaction.wait();
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  async function saleRaton() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);

      try {
        let overrides = {
          from: accounts[0],
          value: (data.priceRaton * quantity).toString(),

        }
        const transaction = await contract.saleRaton(accounts[0], quantity, overrides);
        await transaction.wait();
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  async function saleCarcajou() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);

      try {
        let overrides = {
          from: accounts[0],
          value: (data.priceCarcajou * quantity).toString(),

        }
        const transaction = await contract.saleCarcajou(accounts[0], quantity, overrides);
        await transaction.wait();
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  async function saleRenard() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);

      try {
        let overrides = {
          from: accounts[0],
          value: (data.priceRenard * quantity).toString(),

        }
        const transaction = await contract.saleRenard(accounts[0], quantity, overrides);
        await transaction.wait();
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  async function saleLoup() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);

      try {
        let overrides = {
          from: accounts[0],
          value: (data.priceLoup * quantity).toString(),

        }
        const transaction = await contract.saleLoup(accounts[0], quantity, overrides);
        await transaction.wait();
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  async function saleOurs() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);

      try {
        let overrides = {
          from: accounts[0],
          value: (data.priceOurs * quantity).toString(),

        }
        const transaction = await contract.saleOurs(accounts[0], quantity, overrides);
        await transaction.wait();
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  async function getAccounts() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEth = ethers.utils.formatEther(balance);
      setBalance(balanceInEth);
    }
  }
  

    return (
      <div className="row ">
                
                    <section className="hero">
                        <div className="logo">The RPCP<br></br>
                          <a href="https://theredpawsclubproject.weebly.com/" target="_blank" rel='noreferrer'><button className="btn">SITE</button></a>
                          <a href="https://drive.google.com/file/d/1Uv4_VP4vOTMoFIVT9Fi71eN604G_Pb_0/view?usp=sharing" target="_blank" rel='noreferrer'><button className="btn">WHITEPAPER</button></a>

                        </div>
                        <div className="heroG">
                        <div><br></br><br></br>
                              <div className="App">
                                <InfosAccount accounts={accounts} balance={balance} loader={loader} />
                              </div>
                                <h1>Welcome on <span className="red">RED PAWS CLUB PROJECT</span></h1>
                                <h2>{data.totalSupply} Supply / 5 000 - <span className="red"> {data.priceRaton*quantity/10 ** 18} ETH </span>
                                                                        <span className="red"hidden> {data.priceCarcajou*quantity/10 ** 18} ETH </span>
                                                                        <span className="red"hidden> {data.priceRenard*quantity/10 ** 18} ETH </span>
                                                                        <span className="red"hidden> {data.priceLoup*quantity/10 ** 18} ETH </span>
                                                                        <span className="red"hidden> {data.priceOurs*quantity/10 ** 18} ETH </span></h2>
                                <p>
                                  <button className="btn" onClick={decrementQuantity}>REDUCE (MIN 1)</button>                               
                                  <button className="btn" onClick={incrementQuantity}>ADD (MAX 4)</button>                                 
                                  <button className="btn" onClick={saleRaton}>MINT {quantity} NFT</button>
                                  <button className="btn" onClick={saleCarcajou}hidden>MINT {quantity} NFT</button>
                                  <button className="btn" onClick={saleRenard}hidden>MINT {quantity} NFT</button>
                                  <button className="btn" onClick={saleLoup}hidden>MINT {quantity} NFT</button>
                                  <button className="btn" onClick={saleOurs}hidden>MINT {quantity} NFT</button>
                                  <button className="btn" onClick={withdrawCommission}>WITHDRAW COMMISION</button>
                              </p></div>
                        </div>
                        <div className='heroD'>
                          <button className="btn" onClick={getAccounts}>CONNECT WALLET</button>
                        </div>
                    </section>
            </div> 
    );

}

export default App;