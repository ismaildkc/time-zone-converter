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

  // State to track timezone data
  const [timeData, setTimeData] = useState(() =>
    zones.map((zone) => ({
      zone,
      localTime: moment()
        .tz(zone)
        .format(is24Hour ? "HH:mm" : "hh:mm A"),
      gmtOffset: moment().tz(zone).format("Z"),
      date: moment().tz(zone).format("DD MMM"),
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLocalTime(moment().tz(zones[0]).format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // When time format changes, update all timezone displays
  useEffect(() => {
    setTimeData(
      timeData.map((data) => {
        // Parse time using the OPPOSITE format of what we're switching to
        const timeObj = moment(data.localTime, !is24Hour ? "HH:mm" : "hh:mm A");
        // Format it to the NEW format we want
        return {
          ...data,
          localTime: timeObj.format(is24Hour ? "HH:mm" : "hh:mm A"),
        };
      })
    );
  }, [is24Hour]);

  // Handle time changes from any timezone card
  const handleTimeChange = (changedZone: string, newTime: string) => {
    // Get the timezone that was changed
    const changedZoneData = timeData.find((data) => data.zone === changedZone);
    if (!changedZoneData) return;

    // Calculate the time difference in minutes
    const oldTime = moment(
      changedZoneData.localTime,
      is24Hour ? "HH:mm" : "hh:mm A"
    );
    const newTimeObj = moment(newTime, "HH:mm");
    const diffMinutes = newTimeObj.diff(oldTime, "minutes");

    // Apply the same time difference to all timezones
    const updatedTimeData = timeData.map((data) => {
      if (data.zone === changedZone) {
        return {
          ...data,
          localTime: newTimeObj.format(is24Hour ? "HH:mm" : "hh:mm A"),
        };
      } else {
        // Add the same minutes difference to other timezones
        const otherTime = moment(
          data.localTime,
          is24Hour ? "HH:mm" : "hh:mm A"
        ).add(diffMinutes, "minutes");
        return {
          ...data,
          localTime: otherTime.format(is24Hour ? "HH:mm" : "hh:mm A"),
        };
      }
    });

    setTimeData(updatedTimeData);
  };

  return (
    <>
      <Header
        currentLocalTime={currentLocalTime}
        handleTimeFormat={(e) => setIs24Hour(e)}
      />

      <section className="px-3 pt-3 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
        {timeData.map((data) => (
          <Card
            key={data.zone}
            timeZone={data.zone}
            localTime={data.localTime}
            gmtOffset={data.gmtOffset}
            date={data.date}
            is24Hour={is24Hour}
            onTimeChange={handleTimeChange}
            isActive={data.zone === zones[0]}
          />
        ))}
      </section>
    </>
  );
}

export default App;
