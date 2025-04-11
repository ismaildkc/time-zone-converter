import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import Slider from "@components/Slider";

import { IoCloseOutline } from "react-icons/io5";

interface ICardProps {
  title: string;
  color?: "orange" | "gray";
}

const Card = ({ title, color = "gray" }: ICardProps) => {
  const [time, setTime] = useState<string>("");

  return (
    <section
      className={`${
        color === "gray" ? "bg-blackLight" : "bg-orange"
      } rounded-3xl p-5 min-h-[15rem] flex flex-col justify-between`}
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <div className="">
          <p>{title}</p>
          <p className="opacity-50">GMT+3</p>
          <p className="opacity-50">11 Apr</p>
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
          onChange={(e) => {
            setTime(e as string);
          }}
        />
      </div>
    </section>
  );
};

export default Card;
