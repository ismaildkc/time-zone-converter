import { useState, useEffect } from "react";
import moment from "moment-timezone";
import Slider from "@components/Slider";
// import { MdOutlineEdit } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

interface ICardProps {
  timeZone: string;
  localTime: string;
  gmtOffset: string;
  date: string;
  is24Hour: boolean;
  onTimeChange?: (timeZone: string, newTime: string) => void;
  isActive: boolean;
}

const Card = ({
  timeZone,
  is24Hour,
  localTime,
  gmtOffset,
  date,
  onTimeChange,
  isActive,
}: ICardProps) => {
  const [displayTime, setDisplayTime] = useState(localTime);

  useEffect(() => {
    // Format the time based on 24h/12h preference
    const time = moment(localTime, is24Hour ? "HH:mm" : "hh:mm A");
    setDisplayTime(time.format(is24Hour ? "HH:mm" : "hh:mm A"));
  }, [is24Hour, localTime]);

  const handleTimeChange = (value: string | number) => {
    // Convert to string if it's a number
    const newTime =
      typeof value === "number"
        ? moment().startOf("day").add(value, "minutes").format("HH:mm")
        : value;

    // Format for display
    const timeObj = moment(newTime, "HH:mm");
    const formattedTime = timeObj.format(is24Hour ? "HH:mm" : "hh:mm A");
    setDisplayTime(formattedTime);

    // Notify parent component about the time change
    if (onTimeChange) {
      onTimeChange(timeZone, newTime);
    }
  };

  return (
    <section
      className={`${
        isActive ? "bg-orange" : "bg-blackLight"
      } rounded-3xl p-5 min-h-[15rem] flex flex-col justify-between`}
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <div className="">
          <p>{timeZone}</p>
          <p className="opacity-50">GMT {gmtOffset}</p>
          <p className="opacity-50">{date}</p>
        </div>

        <div className="flex items-center gap-1">
          {/* <MdOutlineEdit className="text-xl" /> */}
          <IoCloseOutline className="text-2xl" />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-3">
        <div className="text-3xl">
          <p className="flex items-end gap-2">
            {is24Hour ? (
              <span>{displayTime}</span>
            ) : (
              <>
                <span>{displayTime.split(" ")[0]}</span>
                <span className={isActive ? "text-[#f69e8e]" : "text-white opacity-50"}>
                  {displayTime.split(" ")[1]}
                </span>
              </>
            )}
          </p>
        </div>

        <Slider defaultValue={displayTime} onChange={handleTimeChange} />
      </div>
    </section>
  );
};

export default Card;
