import React from 'react';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import Web3 from 'web3';

const NavBar = () => {
  const connectToMetaMask = async () => {
    // 检查 MetaMask 是否已安装
    if (typeof window.ethereum === 'undefined') {
      message.error('请安装 MetaMask 插件');
      return;
    }

    try {
      // 请求用户授权
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // 创建 Web3 实例
      const web3 = new Web3(window.ethereum);

      // 设置默认账户
      web3.eth.defaultAccount = accounts[0];

      // 连接成功，可以使用 web3 对象进行交互
      message.success('已连接到 MetaMask');
      console.log('默认账户地址：', web3.eth.defaultAccount);
      // 进行其他操作...
    } catch (error) {
      // 连接失败或用户拒绝授权
      message.error('连接 MetaMask 失败：' + error.message);
    }
  };
  return (
    <div>
      <h1 className="shop-title">SWAROBULGTIER</h1>
      <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li className="account-dropdown">
          <span>Operation</span>
          <ul className="sub-menu">
            <li><Link to="/possession">Possession</Link></li>
            <li><Link to="/mine">Mine</Link></li>
            <li><Link to="/cut">Cut</Link></li>
            <li><Link to="/grade">Grade</Link></li>
            <li><Link to="/verify">Verify</Link></li>
          </ul>
        </li>
        <li><Link to ="/authority">Authority Management</Link></li>
        <li><Button type="primary" className="connect-wallet-button" onClick={connectToMetaMask}>
        Connet to MetaMask</Button></li>
      </ul>
    </nav>
    </div>
    
  );
};

export default NavBar;
