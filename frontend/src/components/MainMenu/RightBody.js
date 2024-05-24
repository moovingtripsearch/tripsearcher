import React, { useState } from 'react';
import TopButton from '../Welcomepage/TopButton'

export default function RightBody() {
  const [showFilters, setShowFilters] = useState(false);

  const handleDefaultFieldsClick = () => {
    setShowFilters(false);
  };

  const handleAllFieldsClick = () => {
    setShowFilters(true);
  };

  return (
    <>
      <div className="toggle-sidebar">
        <i className="bx bx-menu" />
        <div className="text">Toggle</div>
      </div>

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <p>Logog image</p>

          <div className="d-none d-xl-flex align-items-center">
            <p className="fw_bold text-primary m-0">Login</p>
            <input type="text" placeholder="ENGLISH (UK)" className="form-control mx-2" />
            <div className="btn btn-outline-primary fw-bold">Login</div>
          </div>
        </div>
        <div style={{marginBottom: '5%'}}>
          <TopButton />
        </div>

        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Departure" aria-label="Search" />
              <input className="form-control me-2" type="search" placeholder="Arrival" aria-label="Search" />
              <input type="date" className="form-control inp-height" />
              <input type="time" className="form-control inp-height left_space" />
              <button className="btn btn-outline-success" type="submit" id="mainSearch">
                Search
              </button>
            </form>
          </div>

          {showFilters && (
            <div className="container-fluid" id="filters">
              <form className="d-flex" role="others">
                <span>
                  <input
                    className="form-control inp-width"
                    list="datalistOptions"
                    id="vehiclelist"
                    placeholder="Vehicle"
                  />
                  <datalist id="datalistOptions">
                    <option value="Personal Car" />
                    <option value="Taxi" />
                    <option value="Bike" />
                    <option value="Bus" />
                    <option value="Limouzine" />
                  </datalist>
                </span>
                <span>
                  <input
                    className="form-control inp-width"
                    list="datalistNumber"
                    id="passengerNumber"
                    placeholder="Number of travellers"
                  />
                  <datalist id="datalistNumber">
                    <option value="1" />
                    <option value="2" />
                    <option value="3" />
                    <option value="4" />
                    <option value="5" />
                  </datalist>
                </span>
                <input className="form-control inp-width" id="price" placeholder="Price ($)" />
                <span>
                  <input
                    className="form-control inp-width left_space"
                    list="datalistLug"
                    id="passengerLug"
                    placeholder="Luggage"
                  />
                  <datalist id="datalistLug">
                    <option value="Bags" />
                    <option value="Food" />
                    <option value="furnitures" />
                    <option value="Animals" />
                    <option value="Other" />
                  </datalist>
                </span>
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          )}
        </nav>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onChange={handleDefaultFieldsClick}
            checked={!showFilters}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Default fields
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onChange={handleAllFieldsClick}
            checked={showFilters}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            All fields
          </label>
        </div>
        <div className="sort">
          Sort by :
          <select name="options" id="options">
            <option value="option1">Cheapest</option>
            <option value="option2">Costly</option>
            <option value="option3">Most popular</option>
          </select>
        </div>
      </div>
      
    </>
  )
}