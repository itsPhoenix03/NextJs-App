import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractEventData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
}

export default function registerEmail(req, res) {
  // Chceking the request type
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractEventData(filePath);

  if (!allEvents) return res.status(404).json({ msg: "Event not found!" });

  if (method === "POST") {
    // Doing some processing
    const { email, eventId } = req.body;

    if (!email | !email.includes("@")) {
      res.status(422).json({ msg: "Invalid Email!!" });
      return;
    }

    const newAllEvents = allEvents.map((event) => {
      if (event?.id === eventId) {
        if (event.emails_registered.includes(email)) {
          res.status(409).json({
            msg: "This email has already been registered for this event!",
          });
          return event;
        }

        return {
          ...event,
          emails_registered: [...event.emails_registered, email],
        };
      }
      return event;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      msg: `You have been registed for the event ${eventId} with the email: ${email}`,
    });
  }
}
