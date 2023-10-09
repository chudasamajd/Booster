import React from "react";
import HeroTitles from "./HeroTitles";
import Navbar from "./Navbar";
import ScooterModal from "./ScooterModal";

const style = {
  wrapper: "w-7/12 h-full text-white relative",
  footerContainer: "h-min w-44 absolute bottom-1 left-2",
  footerImage: "w-8 relative left-3 -top-1",
  footerMessageContainer: "rounded-lg w-auto pl-4 pt-1.5",
};

function RiderRequest() {
  return (
    <div className={style.wrapper}>
      <Navbar />
      <HeroTitles />
      <ScooterModal />

      <div className={style.footerContainer}>
        <img src="/qr-code.png" className="rounded-lg" />
        <div className="flex gap-1">
          <img
            src="/logo.png"
            className={style.footerImage}
            style={{
              filter:
                "drop-shadow(3px 0px 0 black) drop-shadow(0px 2px 0 black) drop-shadow(-3px -0px 0 black) drop-shadow(-0px -3px 0 black)",
            }}
          />
          <div className={style.footerMessageContainer}>
            <p className="text-xs font-gruppo leading-3">Product of</p>
            <h2 className="text-sm font-exo font-semibold">Ghost Town</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderRequest;
