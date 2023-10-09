import React, { useEffect, useState } from "react";
import { MdSpeed } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { TbBattery3, TbWeight } from "react-icons/tb";
import { HiOutlineThumbUp } from "react-icons/hi";
import { RxChevronRight } from "react-icons/rx";
import { useBoosterContext } from "../context/boosterContext";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const style = {
  wrapper: "w-full h-[260px] overflow-y-auto px-4",
  scooterList: "w-full flex flex-col gap-2 -bottom-[260px] relative z-20",
  scooter:
    "grid grid-rows-[70%_30%] grid-cols-[80%_20%] justify-between bg-black text-white rounded-lg font-exo text-xl p-2",
  scooterType: "text-xs text-white/20 text-gruppo",
  scooterImgContainer:
    "row-span-2 bg-white/10 rounded-lg relative overflow-hidden",
  bookNowButton:
    " w-auto left-1 flex items-center justify-between gap-1 rounded-lg -bottom-1/2 text-sm absolute bg-white text-black px-2 py-1 cursor-pointer",
};

function ScooterList() {
  const [scooterList, setScooterList] = useState([]);
  const {
    pickup,
    dropoff,
    showScooterList,
    setShowScooterList,
    setDistance,
    currentAccount,
    basePrice,
    metaMask,
  } = useBoosterContext();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/db/getRideTypes");
        const data = await response.json();
        setScooterList(data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const storeTripDetails = async (pickup, dropoff, selectedRide, price) => {
    try {
      await fetch("/api/db/saveTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          price: price,
          selectedRide: selectedRide,
        }),
      });

      const transactionParameters = {
        gas: "0x7EF40",
        to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
        from: currentAccount,
        value: ethers.utils.parseEther(price)._hex,
      };

      await metaMask.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setShowScooterList(false);
      setDistance(0);
      const notification = toast.success("Ride booked successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.wrapper}>
      <div
        className={`${style.scooterList} ${
          showScooterList && "scooterListAnimation"
        }`}
      >
        {scooterList.map((scooter, index) => (
          <div className={`${style.scooter} mouseHoverContainer`} key={index}>
            <div className="flex justify-between p-2 border-b border-white/10">
              <div className="flex flex-col">
                <span>{scooter.service}</span>
                <span className={style.scooterType}>{scooter.model}</span>
              </div>

              <div className="text-xs h-fit rounded-md flex justify-center items-center gap-1 p-1">
                <FaEthereum className="w-4" />
                {((basePrice / 10 ** 5) * scooter.priceMultiplier).toFixed(5)}
                ETH
              </div>
            </div>
            <div className={style.scooterImgContainer}>
              <img src={scooter.iconURL} />

              <div
                className={`${style.bookNowButton} showBookNowButton`}
                onClick={() => {
                  storeTripDetails(
                    pickup,
                    dropoff,
                    scooter,
                    ((basePrice / 10 ** 5) * scooter.priceMultiplier).toFixed(5)
                  );
                }}
              >
                Book Now
                <RxChevronRight className="text-lg" />
              </div>
            </div>
            <div className="flex gap-2 text-white/30 text-xs">
              <div className="h-fit p-2 rounded-md flex justify-center items-center gap-1">
                <MdSpeed className="text-lg" />
                {scooter.maxSpeed}Km
              </div>
              <div className=" h-fit p-2 rounded-md flex justify-center items-center gap-1">
                <TbBattery3 className="text-xl" />
                {scooter.Battery}%
              </div>
              <div className=" h-fit p-2 rounded-md flex justify-center items-center gap-1">
                <TbWeight className="text-lg" />
                {scooter.weight}Kg
              </div>
              <div className=" h-fit p-2 rounded-md flex justify-center items-center gap-1">
                <HiOutlineThumbUp className="text-lg" />
                {scooter.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScooterList;
