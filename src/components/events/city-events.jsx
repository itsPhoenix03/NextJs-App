import Image from "next/image";
import Link from "next/link";
import React from "react";

const CityEvents = ({ data }) => {
  return (
    <div className="city_events_card">
      {data.map((event) => (
        <Link
          className="card"
          href={`/events/${event.city}/${event.id}`}
          key={event.id}
          passHref
        >
          <Image
            className="image"
            src={event.image}
            alt={event.title}
            width={400}
            height={300}
          />

          <div className="content">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CityEvents;
