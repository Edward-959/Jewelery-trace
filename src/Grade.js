import React, { useState, useEffect } from 'react';
import { message, Select, Button, Form, Input } from 'antd';
import NavBar from './NavBar';
import Web3 from 'web3';
var abis = require('./utils/abis');
var addresses = require('./utils/addresses')


const { Option } = Select;

async function grade(contract, user_address, raw_cutting_id, carat, clarity, colour, cut){
  try{
      const response = await contract.methods
      .grading(raw_cutting_id, carat, clarity, colour, cut).send({ from: user_address });

      console.log(response);
  }
  catch (error) {
      console.log(error);
    }
}


const Grade = () => {
  const [gradingCompanyAddress, setGradingCompanyAddress] = useState({
    value: '',
    options: [],
  });
  const [rawCuttingId, setRawCuttingId] = useState('');
  const [carat, setCarat] = useState('');
  const [clarity, setClarity] = useState('');
  const [colour, setColour] = useState('');
  const [cut, setCut] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accs = await web3.eth.getAccounts();
        setGradingCompanyAddress({
          value: accs[0] || '',
          options: accs.map((acc) => ({ value: acc, label: acc })),
        });
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleGrade = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      var contract = new web3.eth.Contract(abis['DIAMOND'], addresses['test_diamond']);
      await grade(
        contract,
        gradingCompanyAddress['value'],
        rawCuttingId,
        carat,
        clarity,
        colour,
        cut
      );
      message.success('Grade Success');
    } catch (error) {
      console.error('Grade Fail:', error);
      message.error('Grade Fail：' + error.message);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="grade-form">
        <Form layout="vertical">
          <Form.Item label="Grading Company Address">
            <Select
              value={gradingCompanyAddress.value}
              onChange={(value) => setGradingCompanyAddress({ ...gradingCompanyAddress, value })}
            />
          </Form.Item>
          <Form.Item label="Raw Cutting ID">
            <Input
              value={rawCuttingId}
              onChange={(e) => setRawCuttingId(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Carat">
          <Input
              value={carat}
              onChange={(e) => setCarat(e.target.value)}
          />
          </Form.Item>
          <Form.Item label="Clarity">
          <Select
              value={clarity}
              onChange={(value) => setClarity(value)}>
              <Option value="0">FL</Option>
              <Option value="1">IF</Option>
              <Option value="2">VVS1</Option>
              <Option value="3">VVS2</Option>
              <Option value="4">VS1</Option>
              <Option value="5">VS2</Option>
              <Option value="6">SL1</Option>
              <Option value="7">SL2</Option>
              <Option value="8">SL3</Option>
              <Option value="9">P1</Option>
              <Option value="10">P2</Option>
              <Option value="11">P3</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Colour">
          <Select
              value={colour}
              onChange={(value) => setColour(value)}>
              <Option value="0">D</Option>
              <Option value="1">E</Option>
              <Option value="2">F</Option>
              <Option value="3">G</Option>
              <Option value="4">H</Option>
              <Option value="5">I</Option>
              <Option value="6">J</Option>
              <Option value="7">K</Option>
              <Option value="8">L</Option>
              <Option value="9">M</Option>
              <Option value="10">N</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Cut">
          <Select
              value={cut}
              onChange={(value) => setCut(value)}>
              <Option value="0">Excellent</Option>
              <Option value="1">Very Good</Option>
              <Option value="2">Good</Option>
              <Option value="3">Fair</Option>
              <Option value="4">Poor</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleGrade}>
              Grade Diamond
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Grade;