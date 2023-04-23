import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const SingleEvents = ({ data }) => {
  const emailRef = useRef();
  const router = useRouter();
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentEmail = emailRef.current.value;
    const eventId = router?.query.eventId;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!currentEmail.match(validRegex))
      setMsg("Please provide the correct format for email!!!");

    try {
      const res = await fetch("/api/emailregistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: currentEmail, eventId }),
      });

      if (!res.ok) throw new Error(`ERROR: ${res.status}`);

      const data = await res.json();
      setMsg(data.msg);
      emailRef.current.value = "";
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="single_event">
      <div className="title_head">
        <h2>{data.title}</h2>
        <h3>{data.city}</h3>
      </div>

      <Image
        src={data.image}
        alt={data.title}
        width={1000}
        height={500}
        className="image"
      />

      <p>{data.description}</p>

      <form className="register_event_form" onSubmit={onSubmit}>
        <label htmlFor="email">Get Regiestered for this event!</label>
        <div className="register_event">
          <input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="Enter your Email here..."
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default SingleEvents;

export async function getStaticPaths() {
  const { allEvents } = await import("/data/data.json");

  const allPaths = allEvents.map((event) => ({
    params: {
      city: event.city,
      eventId: event.id,
    },
  }));

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.eventId;

  const { allEvents } = await import("/data/data.json");

  const data = allEvents.find((event) => event.id === id);

  return {
    props: { data },
  };
}
