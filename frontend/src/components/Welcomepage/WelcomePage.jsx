import React from 'react';
import MyApp from '../../pages/app';
import '../../styles/Welcome.css';
import ButtonVariants from './TopButton';
import Dropdown from './Dropdown';
import SearchFields from './SearchFields';
import logoImage from '../../../public/assets/logo.jpg';
import backgroundImage from '../../../public/assets/background.jpg';

const WelcomePage = () => {
  return (
    <>
  <div className="container">
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
        <ButtonVariants />
      </div>

            
      <div className="dropdown"  style={{marginRight: '10%'}}>
        <Dropdown />
      </div>
    </div>
  </div>
  <div
        className="position-relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: '500px',
        }}
      >
    <div className="d-none d-xl-block position-absolute start-50 top-50 translate-middle">
      <p className="fw-bold text-white fs-1">Travel Enjoy Life . . .</p>
      
      <SearchFields />
    </div>
  </div>
        
</>

  );
};

export default WelcomePage;