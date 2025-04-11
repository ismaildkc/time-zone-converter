import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import moment from "moment-timezone";

const zones = ["Europe/Istanbul", "Europe/London"];

function App() {
  const [is24Hour, setIs24Hour] = useState(true);
  const [currentLocalTime, setCurrentLocalTime] = useState<string>(
    moment().tz(zones[0]).format("HH:mm:ss")
  );

  // Initial time data for cards (calculated once)
  const [timeData] = useState(() =>
    zones.map((zone) => ({
      zone,
      localTime: moment()
        .tz(zone)
        .format(is24Hour ? "HH:mm" : "hh:mm A"),
      gmtOffset: moment().tz(zone).format("Z"),
      // date: moment().tz(zone).format("DD MMMM YYYY"),
      date: moment().tz(zone).format("DD MMM"),
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLocalTime(moment().tz(zones[0]).format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTimeFormat = () => {
    setIs24Hour((prev) => !prev);
  };

  return (
    <>
      <Header currentLocalTime={currentLocalTime} />
      <button
        onClick={toggleTimeFormat}
        className="bg-blackLight text-white text-sm px-3 py-1 rounded-full"
      >
        {is24Hour ? "12 Saat" : "24 Saat"}
      </button>
      <section className="px-3 py-1 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
        {timeData.map((data) => (
          <Card
            key={data.zone}
            timeZone={data.zone}
            localTime={data.localTime}
            gmtOffset={data.gmtOffset}
            date={data.date}
            is24Hour={is24Hour}
          />
        ))}
      </section>
    </>
  );
}

export default App;
