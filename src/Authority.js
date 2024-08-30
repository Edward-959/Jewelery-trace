import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { message, Select, Button, Form, Input} from 'antd';
import exportFunctions from './routes/exports'; 
import NavBar from './NavBar';
var abis = require('./utils/abis');
var addresses = require('./utils/addresses')

const { Option } = Select;

async function add_mining_company(contract, user_address, company_address, company_name){
  try{
      const response = await contract.methods
      .mining_company_registry(company_address, company_name)
      .send({ from: user_address });
      console.log(response);
  }
  catch (error) {
      console.log(error);
    }
}

async function add_cutting_company(contract, user_address, company_address, company_name){
  try{
      const response = await contract.methods
      .cutting_company_registry(company_address, company_name)
      .send({ from: user_address });
      console.log(response);
  }
  catch (error) {
      console.log(error);
    }
}

async function add_grading_company(contract, user_address, company_address, company_name){
  try{
      const response = await contract.methods
      .grading_company_registry(company_address, company_name)
      .send({ from: user_address });
  
      console.log(response);
  }
  catch (error) {
      console.log(error);
    }
}

const Authority = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accs = await web3.eth.getAccounts();
        setAccounts(accs);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    
    const fetchInitialPermissions = async () => {
      await fetchAccounts();
      await fetchPermissions();
    };

    fetchInitialPermissions();;
  }, []);

  const handleSetPermission = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        var contract = new web3.eth.Contract(abis['DIAMOND'], addresses['test_diamond']);
        switch (selectedPermission) {
          case 'mining':
            await add_mining_company(contract, accounts[0], companyAddress, companyName);
            break;
          case 'cutting':
            await add_cutting_company(contract, accounts[0], companyAddress, companyName);
            break;
          case 'grading':
            await add_grading_company(contract, accounts[0], companyAddress, companyName);
            break;
          default:
            break;
        }fetchPermissions();
        message.success('Success setting permision');
      } catch (error) {
        console.error('Error setting permission:', error);
        message.error('Error setting permission:' + error.message);
      }
  };

  const fetchPermissions = async () => {
    try {
      const miningCompanies = await exportFunctions.read_mining_company();
      const cuttingCompanies = await exportFunctions.read_cutting_company();
      const gradingCompanies = await exportFunctions.read_grading_company();
      let miningCompaniesName = []
      let cuttingCompaniesName = []
      let gradingCompaniesName = []
      for(let i = 0; i < miningCompanies.length; i++){
        console.log(miningCompanies)
        let result = await exportFunctions.read_mining_company_name(miningCompanies[i])
        miningCompaniesName.push(result)
      }
      for(let i = 0; i < cuttingCompanies.length; i++){
        let result = await exportFunctions.read_cutting_company_name(cuttingCompanies[i])
        cuttingCompaniesName.push(result)
      }
      for(let i = 0; i < gradingCompanies.length; i++){
        let result = await exportFunctions.read_grading_company_name(gradingCompanies[i])
        gradingCompaniesName.push(result)
      }
      // const result = {}
      // result['mining_company'] = miningCompaniesName
      // result['cutting_company'] = cuttingCompaniesName
      // result['grading_company'] = gradingCompaniesName
      const result = [...miningCompaniesName, ...cuttingCompaniesName, ...gradingCompaniesName];
      console.log(result)
      setPermissions(result);

    } catch (error) {
      console.error('Error fetching permissions:', error);
      message.error('Error fetching permissions:' + error.message);
    }
  };

  return (
    <div className='container'>
        <NavBar/>
        <div className="authority-container">
      <h2>Authority Management</h2>
      <div className="authority-form">
        <Form layout="vertical">
          <Form.Item label="Company Address">
          <Input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
          </Form.Item>
          <Form.Item label="Company Name">
          <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Select Permission">
            <Select value={selectedPermission} onChange={setSelectedPermission}>
              <Option value="mining">Mining Company</Option>
              <Option value="cutting">Cutting Company</Option>
              <Option value="grading">Grading Company</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSetPermission}>
              Set Permission
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="permissions-list">
        <h3>Permissions List</h3>
        <ul>
          {permissions.map((perm,index) => (
            <li key={index}>
              {index}: {perm}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    
  );
};

export default Authority;
