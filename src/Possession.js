import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import Web3 from 'web3';
import NavBar from './NavBar';
var BN = require('ethers').BigNumber;
var abis = require('./utils/abis');
var addresses = require('./utils/addresses');
var provider_file = require('./utils/provider');

const Jewelary_type = ["Ring", "Necklace", "Earring", "Bracelet", "Brooche", "Watch"]
const chain = 'sepolia'
let web3_1 = new Web3(new Web3.providers.WebsocketProvider(provider_file[chain]));
var jewelary_query = new web3_1.eth.Contract(abis['JEWELARY'], addresses['test_jewelary'])
var jewelary_maker = '0xcBF3248fd4480503CA67E36425cc75f186eEc8b4'

async function get_holds_jewelary(address){
  let result = await jewelary_query.methods.get_holds_jewelary(address).call({from: address})
  return result
}

async function get_jewelary(id){
  let result = await jewelary_query.methods.get_jewelary(id).call()
  let wrapped_result = {}
  wrapped_result['unique_id'] = result['unique_id']
  wrapped_result['diamond_id'] = result['diamond_id']
  wrapped_result['price'] = (BN.from(result['price']).mul(BN.from(100)).div(BN.from('1000000000000000000'))).toNumber() / 100
  wrapped_result['holder'] = result['holder']
  wrapped_result['jewelery_type'] = Jewelary_type[parseInt(result['jewelary_type'])]
  wrapped_result['jewelery_name'] = result['name']
  wrapped_result['photo_address'] = result['photo']
  return wrapped_result
}

async function sell_jewelary(contract, id, user_address){
  try{
      const response = await contract.methods
      .sell_jewelary_to_manufacturer(id)
      .send({ from: user_address });
      console.log(response);
  }
  catch (error) {
      console.log('jewelry sell failed:', error.message);
  }
}

async function approve(contract, id, to, user_address){
    const response = await contract.methods
    .approve(to, id).send({ from: user_address });
    console.log(response);
}

const Possession = () => {
  const [accounts, setAccounts] = useState([]);
  const [jewelries, setJewelries] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [sellModalVisible, setSellModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accs = await web3.eth.getAccounts();
        setAccounts(accs);
        setSelectedAccount(accs[0]);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchJewelries = async () => {
      try {
        const jewelriesList = await get_holds_jewelary(selectedAccount);
        setJewelries(jewelriesList);
      } catch (error) {
        console.error('Error fetching jewelries:', error);
      }
    };

    fetchJewelries();
  }, [selectedAccount]);

  const handleDetailClick = async (jewelry) => {
    try {
      console.log(jewelry[0])
      const jewelryDetails = await get_jewelary(jewelry[0]);
      setSelectedJewelry(jewelryDetails);
      setDetailModalVisible(true);
    } catch (error) {
      console.error('Error fetching jewelry details:', error);
      message.error('Error fetching jewelry details:', error);
    }
  };

  const handleSellButtonClick = async(jewelry) => {
    console.log(jewelry)
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abis['JEWELARY'], addresses['test_jewelary'])
      await approve(contract, jewelry[0], jewelary_maker, selectedAccount)
      await sell_jewelary(contract, jewelry[0], selectedAccount);
      message.success('Sell Success');
      setSellModalVisible(false);
      setSelectedJewelry(null);
      const jewelriesList = await get_holds_jewelary(selectedAccount);
      setJewelries(jewelriesList);
    } catch (error) {
      console.error('Error selling jewelry:', error);
      message.error('Error selling jewelry:', error);
    }
  };

  const handleSellConfirm = () => {
    setSellModalVisible(true);
  };

  const handleSellCancel = () => {
    setSellModalVisible(false);
  };

  const handleDetailModalCancel = () => {
    setDetailModalVisible(false);
  };

  return (
    <div className="container">
      <NavBar />
      <h2>Possession</h2>
      <label>Select Account:</label>
      <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
        {accounts.map((acc) => (
          <option key={acc} value={acc}>
            {acc}
          </option>
        ))}
      </select>
      {jewelries.map((jewelry) => (
        <div key={jewelry.id} className="jewelry-form">
          <h3>Jewelry {jewelry.id}</h3>
          <p>Details: {jewelry.details}</p>
          <Button onClick={() => handleDetailClick(jewelry)}>Detail</Button>
          <Button onClick={() => handleSellButtonClick(jewelry)}>
            Sell
          </Button>
        </div>
      ))}

      {/* Sell Modal */}
      <Modal
        title={`Sell Jewelry ${selectedJewelry ? selectedJewelry.id : ''}`}
        visible={sellModalVisible}
        onOk={handleSellConfirm}
        onCancel={handleSellCancel}
      >
        <p>Are you sure you want to sell Jewelry {selectedJewelry ? selectedJewelry.id : ''}?</p>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title={`Details for Jewelry ${selectedJewelry ? selectedJewelry.unique_id : ''}`}
        visible={detailModalVisible}
        onCancel={handleDetailModalCancel}
      >
        {selectedJewelry && (
          <div>
            <p>Name: {selectedJewelry.jewelery_name}</p>
            <p>Unique ID: {selectedJewelry.unique_id}</p>
            <p>Diamond ID: {selectedJewelry.diamond_id}</p>
            <p>Price: {selectedJewelry.price} Ether</p>
            <p>Holder: {selectedJewelry.holder}</p>
            <p>Jewelry Type: {selectedJewelry.jewelery_type}</p>
            <p>Photo Address: {selectedJewelry.photo_address}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Possession;
