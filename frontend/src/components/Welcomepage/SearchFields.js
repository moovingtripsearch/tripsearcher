import '../../styles/Welcome.css';
import {useState, useEffect} from 'react'

export default function SearchFields(){
    const [showVehiclesField, setShowVehiclesField] = useState(false);
    const [showPriceField, setShowPriceField] = useState(false);
    const [showLuggageField, setShowLuggageField] = useState(false);

    useEffect(() => {
        // Handle initial rendering of fields based on initial state
        // You can add any additional logic here if needed
    }, []);

    const handleVehiclesFieldCheckbox = () => {
        setShowVehiclesField(!showVehiclesField);
    };

    const handlePriceFieldCheckbox = () => {
        setShowPriceField(!showPriceField);
    };

    const handleLuggageFieldCheckbox = () => {
        setShowLuggageField(!showLuggageField);
    };

    return (
        <>
      <div className="rounded p-3 bg-cp" style={{ marginTop: '45%', width: 1000 }}>
        <MainSearch />
        {/* Filter fields */}
        <div className="d-flex align-items-center py-2">
            {showVehiclesField && <VehiclesField />}
            {!showPriceField && <PriceField />}
            {showLuggageField && <LuggageField />}
        </div>
        {/* footer items*/}
        <Footer
          handleVehiclesFieldCheckbox={handleVehiclesFieldCheckbox}
          handlePriceFieldCheckbox={handlePriceFieldCheckbox}
          handleLuggageFieldCheckbox={handleLuggageFieldCheckbox}
        />
      </div>
    </>
    )
}


export function MainSearch(){
    return(
        <>
        <div className="d-flex align-items-center">
            <div className="form-check">
                <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                Default
                </label>
            </div>
            <div className="form-check mx-2">
                <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                defaultChecked=""
                />
                <label
                className="form-check-label fw-bold fs-7"
                htmlFor="flexRadioDefault2"
                >
                VIP
                </label>
            </div>
        </div>

        <div className="d-flex align-items-center py-2" style={{gap:"10%"}}>
          <div>
            <div style={{display: "flex", gap: "5%"}}>
            <div>  
                <label
                htmlFor="exampleDataList"
                className="form-label fw-bold fs-8 m-0"
                >
                From
                </label>
                <input
                className="form-control inp-width inp-height"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="City or quarter"
                />
                <datalist id="datalistOptions">
                <option value="Polytechnique Yaounde"></option>
                </datalist>
            </div>
            <div>
                <label
                htmlFor="exampleDataList"
                className="form-label fw-bold fs-8 m-0"
                >
                To
                </label>
                <input
                className="form-control inp-width inp-height"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="City or quarter"
                />
                <datalist id="datalistOptions">
                <option value="Polytechnique Yaounde"></option>
                </datalist>
            </div>
           </div>
            <div>
                <label
                    htmlFor="exampleDataList"
                    className="form-label fw-bold fs-8 m-0"
                >
                    Number of passengers
                </label>
                <label className="input input-bordered flex items-center gap-2" style={{ width: "240px" }}>
                    <input
                    type="text"
                    className="grow"
                    list="datalistNumber"
                    style={{ width: "50px" }}
                    />
                    <span className="badge badge-info">Optional</span>
                </label>
                <datalist id="datalistNumber">
                    <option value={1}></option>
                    <option value={2}></option>
                    <option value={3}></option>
                    <option value={4}></option>
                    <option value={5}></option>
                </datalist>
            </div>
            </div>
          <div>  
          <div className="d-flex flex-column">
          <label htmlFor="" className="fw-bold fs-8">
            Departure date
          </label>
          <input
            type="date"
            name=""
            id=""
            className="form-control date-input" styles={{borderRadius: '25px'}}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="" className="fw-bold fs-8">
            Departure time
          </label>
          <input
            type="time"
            name=""
            id=""
            className="form-control time-input"
          />
        </div>
        </div>
        
            </div>
        
        </>
    )
}


export function VehiclesField() {
  return (
    <div id="VehiclesField">
      <label htmlFor="exampleDataList" className="form-label fw-bold fs-8 m-0">
        Means of transport
      </label>
      <input
        className="form-control inp-width inp-height"
        list="datalistVehicle"
        id="vehicleData"
        placeholder="Vehicle"
      />
      <datalist id="datalistVehicle">
        <option value="Personal Car"></option>
        <option value="Taxi"></option>
        <option value="Bike"></option>
        <option value="Bus"></option>
        <option value="Limouzine"></option>
      </datalist>
    </div>
  );
}

export function PriceField() {
  return (
    <div id="PriceField">
      <label htmlFor="exampleDataList" className="form-label fw-bold fs-8 m-0">
        Price
      </label>
      <input className="form-control inp-width inp-height" id="PriceData" placeholder="Price (FCFA)" />
    </div>
  );
}

export function LuggageField() {
  return (
    <div id="LuggageField">
      <label htmlFor="exampleDataList" className="form-label fw-bold fs-8 m-0">
        Luggages
      </label>
      <input
        className="form-control inp-width inp-height"
        list="datalistLug"
        id="lugData"
        placeholder="Furnitures, animals, etc..."
      />
      <datalist id="datalistLug">
        <option value="Bags"></option>
        <option value="Food"></option>
        <option value="furnitures"></option>
        <option value="Animals"></option>
        <option value="Other"></option>
      </datalist>
    </div>
  );
}


export function Footer({ handleVehiclesFieldCheckbox, handlePriceFieldCheckbox, handleLuggageFieldCheckbox }){
    return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="p_filter">
          <p
            style={{
              color: 'blue',
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Filters
          </p>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue=""
            id="flexCheckVehicles"
            onClick={handleVehiclesFieldCheckbox}
          />
          <label className="form-check-label fw-bold fs-8" htmlFor="flexCheckVehicles">
            vehicles
          </label>
        </div>

        <div className="form-check form-check-inline ms-S">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue=""
            id="flexCheckPrice"
            onClick={handlePriceFieldCheckbox}
          />
          <label className="form-check-label fw-bold fs-8" htmlFor="flexCheckPrice">
            Price
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue=""
            id="flexCheckLug"
            onClick={handleLuggageFieldCheckbox}
          />
          <label className="form-check-label fw-bold fs-8" htmlFor="flexCheckLug">
            Luggages
          </label>
        </div>
        <a href="MainMenu/mainMenu.html">
          <div className="btn btn-dark fw-bold btn-lg inp-width inp-width-h">Search journey</div>
        </a>
      </div>
    </>
  );
}