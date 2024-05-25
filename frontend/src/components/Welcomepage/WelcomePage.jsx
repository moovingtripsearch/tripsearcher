import React from 'react';
import MyApp from '../../pages/app';
import '../../styles/Welcome.css';
import ButtonVariants from './TopButton';
import Dropdown from './Dropdown';
import SearchFields from './SearchFields';



const WelcomePage = () => {

  const [tripType, setTripType] = useState('');
  const myImage = require('../../../public/assets/background.jpg');
  const logoImage = require('../../../public/assets/logo.jpg');

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };
  
  return (
    <>
  <div className="container" data-theme="light">
    <div className="d-flex align-items-center justify-content-between">
      <img src={logoImage} alt="Logo" />
      
      <div className="d-none d-xl-flex align-items-center">
        <p className="fw_bold text-primary m-0">Login</p>
        <input
          type="text"
          placeholder="ENGLISH (UK)"
          className="form-control mx-2"
        />
        <div className="btn btn-outline-primary fw-bold">Login</div>
      </div>
    </div>
    <div className="option_bar">
      
      <div className="topbutton">
        <ButtonVariants onTripTypeChange={handleTripTypeChange} />
      </div>

            
      <div className="dropdown"  style={{marginRight: '10%'}}>
        <Dropdown />
      </div>
    </div>
  </div>
  <div 
        className="position-relative"
        style={{ backgroundImage: `url(${myImage})`}}
        data-theme="light" 
      >
    <div className="d-none d-xl-block position-absolute start-50 top-50 translate-middle">
      <p className="fw-bold text-white fs-1">Travel Enjoy Life . . .</p>
      
      <SearchFields tripType={tripType} />
    </div>
  </div>
        
</>

  );
};

export default WelcomePage;