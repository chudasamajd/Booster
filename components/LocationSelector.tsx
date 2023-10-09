import React, { useState, useContext } from "react";
import {
  MapPinIcon,
  ArrowSmallDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useBoosterContext } from "../context/boosterContext";

const style = {
  wrapper: "w-full flex flex-col items-center mt-4",
  searchFields:
    "w-full h-full bg-white p-1 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
  inputContainer:
    "w-full grid grid-rows-2 grid-cols-[10%_80%_10%] border bg-white rounded-lg p-2 z-20 relative",
  label: "font-gruppo text-sm tracking-wide",
  input: "font-exo text-md tracking-wide w-full outline-none",
  icon: "w-6 p-1 bg-black text-white rounded-md",
  verticalLine: "h-8 w-px border-l border-black/30 border-dashed",
  searchButton:
    "row-span-2 bg-black text-white p-2 rounded-lg aspect-square self-center cursor-pointer",
  routeInfo:
    "w-max bg-white px-4 py-1.5 rounded-b-lg flex gap-2 font-exo text-xs relative z-10 -top-[100px]",
};

function LocationSelector() {
  const [pickupInput, setPickupInput] = useState("");
  const [dropoffInput, setDropoffInput] = useState("");
  const { setPickup, setDropoff, distance, duration, setShowScooterList } =
    useBoosterContext();

  const searchLocation = () => {
    setPickup(pickupInput);
    setDropoff(dropoffInput);
    setShowScooterList(true);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.searchFields}>
        <div className={style.inputContainer}>
          <div className="row-span-2 flex flex-col items-center justify-center w-min justify-self-center">
            <div className={style.icon}>
              <ArrowSmallDownIcon />
            </div>
            <div className={style.verticalLine}></div>
            <div className={style.icon}>
              <MapPinIcon />
            </div>
          </div>

          <div className="border-b p-1">
            <div className={style.label}>Pickup from</div>
            <input
              className={style.input}
              placeholder="Enter pickup point"
              value={pickupInput}
              onChange={(e) => setPickupInput(e.target.value)}
            />
          </div>

          <div
            className={style.searchButton}
            onClick={() => {
              searchLocation();
            }}
          >
            <MagnifyingGlassIcon />
          </div>

          <div className="p-1">
            <div className={style.label}>Drop at</div>
            <input
              className={style.input}
              placeholder="Enter drop point"
              value={dropoffInput}
              onChange={(e) => setDropoffInput(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div
        className={`${style.routeInfo} ${distance > 0 && "routeInfoAnimation"}`}
      >
        <div>Distance - {distance.toFixed(2)}Km</div>
        <div>|</div>
        <div>Duration - {duration.toFixed(2)}Hour</div>
      </div>
    </div>
  );
}

export default LocationSelector;
