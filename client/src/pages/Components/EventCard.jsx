import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from "../../assets/images/event.jpg"
const EventCard = ({event}) => {
  const {title, description, _id, images} = event;
  return (
    <Link to={`/event-details/${_id}`} className="block">
      <div className="card bg-[#FFE5D5] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <figure>
        {
      images ?  <img className="w-full h-48 object-cover" src={images[0]} />:   <img
      src={placeholder}
      alt="Event Image"
      className="w-full h-48 object-cover"
    />
    }
       
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-[#014D48] text-lg font-bold">{title}</h2>
          <p className="text-[#001C27] text-sm">
           {description}... </p>
          {/* <div className="card-actions">
            <button className="btn rounded-xl bg-[#FA8649] text-white hover:bg-[#014D48]">
              View Event
            </button>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
