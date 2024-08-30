import React, { useState, useEffect } from 'react';
import { Button, Modal} from 'antd';
import NavBar from './NavBar';
import Web3 from 'web3';
var BN = require('ethers').BigNumber;
var abis = require('./utils/abis');
var addresses = require('./utils/addresses');
var provider_file = require('./utils/provider');


const price = []
let web3_1 = new Web3(new Web3.providers.WebsocketProvider(provider_file['sepolia']));
var jewelary_query = new web3_1.eth.Contract(abis['JEWELARY'], addresses['test_jewelary'])

async function get_holds_jewelary(address){
  let result = await jewelary_query.methods.get_holds_jewelary(address).call({from: address})
  return result
}

async function get_jewelary(id, address){
  const Jewelary_type = ["Ring", "Necklace", "Earring", "Bracelet", "Brooche", "Watch"]
  let result = await jewelary_query.methods.get_jewelary(id).call()
  console.log(result)
  let wrapped_result = {}
  wrapped_result['unique_id'] = result['unique_id']
  wrapped_result['diamond_id'] = result['diamond_id']
  wrapped_result['price'] = (BN.from(result['price']).mul(BN.from(100)).div(BN.from('1000000000000000000'))).toNumber() / 100
  wrapped_result['jewelery_type'] = Jewelary_type[parseInt(result['jewelary_type'])]
  wrapped_result['jewelery_name'] = result['name']
  wrapped_result['photo_address'] = result['photo']
  price.push(BN.from(result['price']))
  return wrapped_result
}

async function buy_jewelary(contract, id, user_address, jewelary_price){
  try{
    const response = await contract.methods
      .buy_jewelary_from_manufacturer(id)
      .send({ from: user_address, 
              value: jewelary_price});
      console.log(response);
  }
  catch (error) {
      console.log('Trade fail：', error.message);
  }
}

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailInfo, setDetailInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const userAddress = '0xcBF3248fd4480503CA67E36425cc75f186eEc8b4'; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await get_holds_jewelary(userAddress);
        const wrapped_result = []
        for(let i = 0; i < 3; i++){
          let id = parseInt(result[i])
          let temp_result = await get_jewelary(id, userAddress)
          wrapped_result.push(temp_result)
        }
        console.log(wrapped_result)
        setProducts(wrapped_result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userAddress]); 

  const handleDetailClick = async (productId) => {
    try {
      const result = await get_jewelary(productId);
      console.log('Result', result);
      setDetailInfo(result);
      setModalVisible(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBuyClick = async (productId) => {
    try {
      const web3 = new Web3(window.ethereum);
      var contract = new web3.eth.Contract(abis['JEWELARY'], addresses['test_jewelary']);
      await window.ethereum.enable();
      const accs = await web3.eth.getAccounts();
      let jewelary_price = price[productId - 1] 
      await buy_jewelary(contract, productId, accs[0], jewelary_price);
      console.log('Jewelry purchased successfully!');
    } catch (error) {
      console.error('Error buying jewelry:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="container">
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.unique_id} className="product-card">
              <img src={product.photo_address} alt={product.jewelery_type} />
              <div className='product-discrib'>
                <h3>{product.jewelery_name}</h3>
                <p> {product.jewelery_type}</p>
                <p>Price: {product.price} Ether</p>
                <p>SWAROBULGTIER</p>
              </div>
              <div className='btn-primary'>
                <Button onClick={() => handleBuyClick(product.unique_id)}>Buy</Button>
                <span style={{ marginRight: '10px' }}></span>
                <Button onClick={() => handleDetailClick(product.unique_id)}>Detail</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title="Detail Information"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {detailInfo && (
          <div>
            <p>name: {detailInfo.jewelery_name}</p>
            <p>Unique ID: {  detailInfo.unique_id}</p>
            <p>Diamond ID: {  detailInfo.diamond_id}</p>
            <p>Price: {detailInfo.price} Ether</p>
            <p>Jewelry Type: {detailInfo.jewelery_type}</p>
            <p>Photo Address: {detailInfo.photo_address}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Shop;