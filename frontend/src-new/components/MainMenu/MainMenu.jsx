import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../styles/mainMenu.css";
import MyApp from "../../pages/app";
import TicketCard from "./TicketCard";
import RightBody from "./RightBody";
import { useRouter } from "next/router";

const MainMenu = () => {
  const router = useRouter();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (router.query.data) {
      setResults(JSON.parse(router.query.data));
    }
  }, [router.query.data]);

  console.log("Results = " + results);
  
  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState({
    urbanTrip: false,
    interUrbanTrip: false,
    carHire: false,
    bike: false,
    bus: false,
    train: false,
    plane: false,
    price: false,
    luggages: false,
    tripDuration: false,
    vehicleType: false,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleCategoryChange = (category) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }));
  };

  return (
    <div className={`d-flex ${isOpen ? "sidebar-open" : ""}`}>
      <div className={`sidebar ${isOpen ? "close" : ""}`}>
        {/* Logo */}
        <Link href="#" className="logo-box" onClick={toggleSidebar}>
          <i className="bx bxl-xing" />
          <div className="logo-name">Moving.com</div>
        </Link>

        {/* Sidebar List */}
        <ul className="sidebar-list">
          {/* Dashboard */}
          <li>
            <div className="title">
              <Link href="#" className="link">
                <i className="bx bx-grid-alt" />
                <span className="name">Dashboard</span>
              </Link>
            </div>
          </li>

          {/* My Tickets */}
          <li className="dropdown">
            <div className="title">
              <Link href="#" className="link">
                <i className="bx bx-book-alt" />
                <span className="name">My tickets</span>
              </Link>
              <i className="bx bxs-chevron-down" />
            </div>
            {/* Add submenu for My Tickets if needed */}
          </li>

          {/* Explore */}
          <li>
            <div className="title">
              <Link href="#" className="link">
                <i className="bx bx-compass" />
                <span className="name">Explore</span>
              </Link>
            </div>
          </li>

          {/* Category */}
          <li className="dropdown">
            <div className="title">
              <Link href="#" className="link">
                <i className="bx bx-collection" />
                <span className="name">Categories</span>
              </Link>
              <i className="bx bxs-chevron-down" />
            </div>

            <Link href="#" className="link submenu-title">
              Categories
            </Link>
            <div className="category-list">
              <div className="category-item">
                <input
                  type="checkbox"
                  id="price"
                  checked={categories.price}
                  onChange={() => handleCategoryChange("price")}
                />
                <label htmlFor="price">Price</label>
              </div>
              {categories.price && (
                <div className="price-options">
                  <div className="option-item">
                    <input type="checkbox" id="lessThan1000" />
                    <label htmlFor="lessThan1000">Less than 1000 FCFA</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="between1000And5000" />
                    <label htmlFor="between1000And5000">1000 - 5000 FCFA</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="between5000And10000" />
                    <label htmlFor="between5000And10000">
                      5000 - 10000 FCFA
                    </label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="greaterThan10000" />
                    <label htmlFor="greaterThan10000">
                      Greater than 10000 FCFA
                    </label>
                  </div>
                </div>
              )}

              <div className="category-item">
                <input
                  type="checkbox"
                  id="luggages"
                  checked={categories.luggages}
                  onChange={() => handleCategoryChange("luggages")}
                />
                <label htmlFor="luggages">Luggages</label>
              </div>
              {categories.luggages && (
                <div className="luggage-options">
                  <div className="option-item">
                    <input type="checkbox" id="lessThan5kg" />
                    <label htmlFor="lessThan5kg">Less than 5kg</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="between5And15kg" />
                    <label htmlFor="between5And15kg">5kg - 15kg</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="greaterThan15kg" />
                    <label htmlFor="greaterThan15kg">Greater than 15kg</label>
                  </div>
                </div>
              )}

              <div className="category-item">
                <input
                  type="checkbox"
                  id="tripDuration"
                  checked={categories.tripDuration}
                  onChange={() => handleCategoryChange("tripDuration")}
                />
                <label htmlFor="tripDuration">Trip Duration</label>
              </div>
              {categories.tripDuration && (
                <div className="trip-duration-options">
                  <div className="option-item">
                    <input type="checkbox" id="lessThan1Hour" />
                    <label htmlFor="lessThan1Hour">Less than 1 hour</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="between1And3Hours" />
                    <label htmlFor="between1And3Hours">1 - 3 hours</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="between3And6Hours" />
                    <label htmlFor="between3And6Hours">3 - 6 hours</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="greaterThan6Hours" />
                    <label htmlFor="greaterThan6Hours">
                      Greater than 6 hours
                    </label>
                  </div>
                </div>
              )}

              <div className="category-item">
                <input
                  type="checkbox"
                  id="vehicleType"
                  checked={categories.vehicleType}
                  onChange={() => handleCategoryChange("vehicleType")}
                />
                <label htmlFor="vehicleType">Vehicle Type</label>
              </div>
              {categories.vehicleType && (
                <div className="vehicle-type-options">
                  <div className="option-item">
                    <input type="checkbox" id="car" />
                    <label htmlFor="car">Car</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="taxi" />
                    <label htmlFor="taxi">Taxi</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="bus" />
                    <label htmlFor="bus">Bus</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="train" />
                    <label htmlFor="train">Train</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="plane" />
                    <label htmlFor="plane">Plane</label>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>

      {/* Home Section */}
      <section className="home">
        <RightBody />

        {results.map((trip) => (
          <TicketCard
            key={trip.trip_id}
            agency={trip.station.station_name}
            station={trip.station.station_name}
            rating={3} // As rating is not provided in the data, we're using a default value
            //day={formatDateTime(trip._source.departure_time).split(' ')[0]}
            day={trip.departure_time?.substring(0, 10)}
            //time={formatDateTime(trip._source.departure_time).split(' ')[1]}
            time={trip.departure_time?.substring(11, 19)}
            origin={trip.origin.name}
            destination={trip.destination.name}
            StoppingP1={trip.stop_points[0]?.point.name || ""}
            StoppingP2={trip.stop_points[1]?.point.name || ""}
            StoppingP3={trip.stop_points[2]?.point.name || ""}
            StoppingP4={trip.stop_points[3]?.point.name || ""}
            fare={`${trip.price} FCFA`}
            transportType={trip.vehicle.vehicle_type}
          />
        ))}
      </section>
    </div>
  );
};

export default MainMenu;
