import CityEvents from "@/src/components/events/city-events";

const EventsInCity = ({ data }) => {
  return <CityEvents data={data} />;
};

export default EventsInCity;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");

  const allPaths = events_categories.map((event) => ({
    params: {
      city: event.id.toString(),
    },
  }));

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const city = context?.params.city;

  const { allEvents } = await import("/data/data.json");

  const data = allEvents.filter((event) => event.city === city);

  return {
    props: { data },
  };
}
