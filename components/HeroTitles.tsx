import React from "react";

const style = {
  wrapper: "w-full absolute top-32 flex flex-col gap-2",
  heroMessageSmall:
    "text-[.8em] text-center text-white/20 font-gruppo tracking-[21px] uppercase",
  heroMessageBig: "text-[18em] leading-[160px] text-white/10 font-abc italic",
  heroSubTitleContainer: "mt-10 text-end",
  heroSubTitle: "goo uppercase text-[40px] font-panchang tracking-[20px]",
};

function HeroTitles() {
  return (
    <div className={style.wrapper}>
      <span className={style.heroMessageSmall}>Rent Scooters at ease</span>

      <span className={style.heroMessageBig}>
        BOO
        <br />
        <span className="text-[.865em]">STER</span>
      </span>
      <h1 className={style.heroSubTitleContainer}>
        <div className={style.heroSubTitle}>
          Where are you
          <br />
          heading
          <br />
          today?
          <br />
          ㊎㊧
        </div>
      </h1>

      <svg
        style={{ visibility: "hidden", position: "absolute" }}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default HeroTitles;
