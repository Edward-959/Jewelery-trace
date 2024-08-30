import React,{ useState } from 'react';
import { Button, Form, message } from 'antd';
import NavBar from './NavBar';
import exportFunctions from './routes/exports'; 

const Verify = () => {
  const [diamondId, setDiamondId] = useState('');
  const [diamondInfo, setDiamondInfo] = useState(null);

  const handleVerify = async () => {
    try {
      const result = await exportFunctions.read_diamond(diamondId);
      setDiamondInfo(result);
      message.success('Result Found');
    } catch (error) {
      console.error('Error verifying diamond:', error);
      message.error('Can not find the diamond' + error.message);
    }
  };
  
  return (
    <div className="container">
      <NavBar />
      <div className='verify-container'>
      <h2>Verify Diamond</h2>
        <Form className="search-form">
          <label>
          <input
              type="text"
              value={diamondId}
              onChange={(e) => setDiamondId(e.target.value)}
              placeholder="Input the diamond's id"
            />
            <span style={{ marginRight: '10px' }}></span>
            <Button onClick={handleVerify}>Verify</Button>
          </label>
        </Form>
      </div>
      {diamondInfo && (
        <div className="diamond-info">
          <h3>Diamond Information</h3>
          <form className='diamond-form'>
            <label>
              Diamond ID:
              <input type="text" value={diamondInfo.unique_id} readOnly />
            </label>
            <label>
              Raw Diamond ID:
              <input type="text" value={diamondInfo.raw_id} readOnly />
            </label>
            <label>
              Graded by:
              <input type="text" value={diamondInfo.graded_company} readOnly />
            </label>
            <label>
              Address Of The Graded Company:
              <input type="text" value={diamondInfo.graded_company_address} readOnly />
            </label>
            <label>
              Graded Time:
              <input type="text" value={diamondInfo.graded_time} readOnly />
            </label>
            <label>
              Clarity:
              <input type="text" value={diamondInfo.clarity} readOnly />
            </label>
            <label>
              Cut:
              <input type="text" value={diamondInfo.cut} readOnly />
            </label>
            <label>
              Colour:
              <input type="text" value={diamondInfo.colour} readOnly />
            </label>
            <label>
              Carat:
              <input type="text" value={diamondInfo.carat} readOnly />
            </label>
            <label>
              Cut By:
              <input type="text" value={diamondInfo.cut_company} readOnly />
            </label>
            <label>
            Address Of The Cut Company:
              <input type="text" value={diamondInfo.cut_company_address} readOnly />
            </label>
            <label>
            Shape:
              <input type="text" value={diamondInfo.shape} readOnly />
            </label>
            <label>
            Cut Time:
              <input type="text" value={diamondInfo.cut_time} readOnly />
            </label>
            <label>
            Mine By:
              <input type="text" value={diamondInfo.mined_company} readOnly />
            </label>
            <label>
            Address Of The Mine Company:
              <input type="text" value={diamondInfo.mined_company_address} readOnly />
            </label>
            <label>
            Source:
              <input type="text" value={diamondInfo.source} readOnly />
            </label>
            <label>
            Mine Time:
              <input type="text" value={diamondInfo.mine_time} readOnly />
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default Verify;