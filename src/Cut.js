import React, { useState, useEffect } from 'react';
import { message, Select, Button, Form, Input } from 'antd';
import exportFunctions from './routes/exports';
import NavBar from './NavBar';
import Web3 from 'web3';
var abis = require('./utils/abis');
var addresses = require('./utils/addresses')

async function cut(contract, user_address, raw_id, shape){
  try{
      const response = await contract.methods.cutting(raw_id, shape).send({ from: user_address });
      console.log(response);
  }
  catch (error) {
      console.error(error);
    }
}


const { Option } = Select;

const Cut = () => {
  const [cuttingCompanyAddress, setCuttingCompanyAddress] = useState({
    value: '',
    options: [],
  });
  const [rawDiamondId, setRawDiamondId] = useState('');
  const [cuttingShape, setCuttingShape] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [diamondInfo, setDiamondInfo] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accs = await web3.eth.getAccounts();
        setCuttingCompanyAddress({
          value: accs[0] || '',
          options: accs.map((acc) => ({ value: acc, label: acc })),
        });
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleCutRawDiamond = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      var contract = new web3.eth.Contract(abis['DIAMOND'], addresses['test_diamond']);
      await cut(
        contract,
        cuttingCompanyAddress.value,
        rawDiamondId,
        cuttingShape
      );

      message.success('Cut Raw Diamond Success');
    } catch (error) {
      console.error('Cut Raw Diamond Fail:', error);
      message.error('Cut Raw Diamond Fail：' + error.message);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await exportFunctions.read_raw_diamond(searchInput);
      console.log('Search result:', result); 
      setDiamondInfo(result);
    } catch (error) {
      console.error('Error searching for raw diamond:', error);
      message.error('Error searching for raw diamond:' + error.message);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div>
        <Form className="search-form" onSubmit={handleSearchSubmit}>
          <label>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Input the raw diamond's id"
            />
            <span style={{ marginRight: '10px' }}></span>
            <Button type="submit" onClick={handleSearchSubmit}>Search</Button>
          </label>
          <p> content goes here.</p>
        </Form>
      </div>
      <div className="cut-form">
        <Form layout="vertical">
          <Form.Item label="Cutting Company Address">
            <Select
              value={cuttingCompanyAddress.value}
              onChange={(value) =>
                setCuttingCompanyAddress({ ...cuttingCompanyAddress, value })
              }
            >
              {cuttingCompanyAddress.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Raw Diamond ID">
            <Input
              value={rawDiamondId}
              onChange={(e) => setRawDiamondId(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Cutting Shape">
            <Select
              value={cuttingShape}
              onChange={(value) => setCuttingShape(value)}>
              <Option value="0">Circle</Option>
              <Option value="1">Square</Option>
              <Option value="2">Heart</Option>
              <Option value="3">Pear</Option>
              <Option value="4">Oval</Option>
              <Option value="5">Marquise</Option>
              <Option value="6">Emerald</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleCutRawDiamond}>
              Cut Raw Diamond
            </Button>
          </Form.Item>
        </Form>
        <Form>
          {diamondInfo && (
            <div className="raw-diamond-info">
              <form>
                <p>Raw ID: {diamondInfo.raw_id}</p>
                <p>Mine Time: {diamondInfo.mine_time}</p>
                <p>Mined Company: {diamondInfo.mined_company}</p>
                <p>Mined Company Address: {diamondInfo.mined_company_address}</p>
                <p>Source: {diamondInfo.source}</p>
              </form>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Cut;
