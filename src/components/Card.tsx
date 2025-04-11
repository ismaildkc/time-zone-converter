import { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import Slider from "@components/Slider";

import { IoCloseOutline } from "react-icons/io5";
import moment from "moment-timezone";

interface ICardProps {
  color?: "orange" | "gray";
  timeZone: string;
  localTime: string;
  gmtOffset: string;
  date: string;
  is24Hour: boolean;
}

const Card = ({ color = "gray", timeZone, is24Hour, localTime, gmtOffset, date }: ICardProps) => {
  const [time, setTime] = useState<string>("");
  const [displayTime, setDisplayTime] = useState(localTime);

  useEffect(() => {
    const time = moment(localTime, is24Hour ? "HH:mm" : "hh:mm A");
    setDisplayTime(time.format(is24Hour ? "HH:mm" : "hh:mm A"));
  }, [is24Hour, localTime]);

  return (
    <section
      className={`${
        color === "gray" ? "bg-blackLight" : "bg-orange"
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
          <MdOutlineEdit className="text-xl" />
          <IoCloseOutline className="text-2xl" />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-3">
        <div className="text-3xl">
          <p className="flex items-end gap-2">
            <span>{time}</span>
            <span className="opacity-50 text-black">PM</span>
          </p>
        </div>

        <Slider
          defaultValue={displayTime}
          onChange={(e) => {
            setTime(e as string);
          }}
        />
      </div>
    </section>
  );
};

export default Card;
