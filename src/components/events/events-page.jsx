import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventsPage = ({ data }) => {
  return (
    <div className="events_page">
      {data?.map((event) => (
        <Link className="card" href={`/events/${event.id}`} key={event.id}>
          <Image src={event.image} alt={event.title} width={380} height={400} />
          <h2>{event.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default EventsPage;
