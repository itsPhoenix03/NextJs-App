import Image from "next/image";
import Link from "next/link";

export const HomePage = ({ data }) => (
  <div className="home_body">
    {data?.map((event) => (
      <Link className="card" href={`/events/${event.id}`} key={event.id}>
        <div className="card-image">
          <Image
            className="image"
            src={event.image}
            alt={event.title}
            width={600}
            height={400}
          />
        </div>

        <div className="card-content">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </div>
      </Link>
    ))}
  </div>
);
