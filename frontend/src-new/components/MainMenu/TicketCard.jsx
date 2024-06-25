import React from 'react';
import "../../styles/ticket.css"
import MyApp from '../../pages/app';
import RouteProgress from './RouteProgress'

const TicketCard = ({
  agency = 'Agency 34',
  station = 'Station 34.5',
  rating = 3,
  day = 'Today',
  time = '13:30',
  origin = 'Mokolo',
  destination = 'Melen',
  StoppingP1 = '',
  StoppingP2 = '',
  StoppingP3 = '',
  StoppingP4 = '',
  fare = '1 000 FCFA',
  transportType = 'Bike',
}) => {
    
  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < count ? 'filled' : ''}`}>
          {i < count ? <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked /> 
                          
                          : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="taxi-booking">
      <div className="header">
        <div className="agency">
          <div className="agency-logo" />
          <div className="agency-info">
            <span>{agency}</span>
            <span>{station}</span>
          </div>
        </div>
        <div className="rating">{renderStars(rating)}</div>
      </div>
      <div className="booking-info">
        <div className="time">
          <span className="day">{day}</span>
          <span className="hour">{time}</span>
          <span className="clock">&#8986;</span>
        </div>
        
        <div className="fare">
          <span className="fare-amount">{fare}</span>
        </div>
      </div>
      <div className="route-progress">
          <RouteProgress     
              origin = {origin}
              destination = {destination}
              StoppingP1 = {StoppingP1}
              StoppingP2 = {StoppingP2}
              StoppingP3 = {StoppingP3}
              StoppingP4 = {StoppingP4}
          />
        </div>
      <div className="footer">
        <span className="icon">
          <i className={`lni lni-${transportType.toLowerCase()} icon`} />
        </span>
        <span className="transport-type">{transportType}</span>
        <button className="buy-btn">Buy Ticket</button>
      </div>
    </div>
  );
};

export default TicketCard;