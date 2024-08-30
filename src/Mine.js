import React, { useState, useEffect } from 'react';
import { message, Select, Button, Form} from 'antd';
import NavBar from './NavBar';
import Web3 from 'web3';
var abis = require('./utils/abis');
var addresses = require('./utils/addresses')

const { Option } = Select;

async function mine(contract, user_address, source){
  try{
      const response = await contract.methods
      .mining(source).send({ from: user_address });
  
      console.log(response);
  }
  catch (error) {
      console.log(error);
    }
}

const Mine = () => {
  const [miningCompanyAddress, setMiningCompanyAddress] = useState('');
  const [miningSource, setMiningSource] = useState(''); 

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accs = await web3.eth.getAccounts();
        setMiningCompanyAddress(accs[0] || '');
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleMine = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      var contract = new web3.eth.Contract(abis['DIAMOND'], addresses['test_diamond']);
      await mine(
        contract,
        miningCompanyAddress,
        miningSource
      );
      message.success('Mine Success');
    } catch (error) {
      console.error('Mine Fail:', error);
      message.error('Mine Fail：', error.message);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="mine-form">
        <Form layout="vertical">
        <Form.Item label="Mining Company Address">
        <Select
        value={miningCompanyAddress}
        onChange={(value) => setMiningCompanyAddress(value)}/>
          </Form.Item>
          <Form.Item label="Mining Source">
            <Select
              value={miningSource}
              onChange={(value) => setMiningSource(value)}
            >
              <Option value="0">South_Africa</Option>
              <Option value="1">Zimbabwe</Option>
              <Option value="2">Botswana</Option>
              <Option value="3">Angola</Option>
              <Option value="4">Namibia</Option>
              <Option value="5">Congo</Option>
              <Option value="6">Russia</Option>
              <Option value="7">Australia</Option>
              <Option value="8">Canada</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleMine}>
              Mine Diamond
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Mine;