import React from "react";
import {
  PowerIcon,
  FingerPrintIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useBoosterContext } from "../context/boosterContext";

const style = {
  wrapper: `h-auto w-full text-white p-2 flex justify-between items-center mt-8`,
  menuContainer: "flex gap-2 h-min",
  menuItem: "flex gap-2 text-sm p-2 cursor-pointer font-exo",
  menuItemActive: "items-center bg-white/20 rounded-md",
  menuIcon: "w-4",
};

function Navbar() {
  const { currentAccount, connectWallet, setCurrentAccount } =
    useBoosterContext();
  return (
    <div className={style.wrapper}>
      <div className=""></div>

      <div className={style.menuContainer}>
        {currentAccount ? (
          <>
            <div className={`${style.menuItem} ${style.menuItemActive}`}>
              <FingerPrintIcon className={style.menuIcon} />
              {currentAccount.slice(0, 5)}...{currentAccount.slice(38)}
            </div>
            <div
              className={style.menuItem}
              onClick={() => {
                setCurrentAccount("");
              }}
            >
              <ArrowLeftOnRectangleIcon className={style.menuIcon} />
              Logout
            </div>
          </>
        ) : (
          <>
            <div
              className={`${style.menuItem} ${style.menuItemActive}`}
              onClick={connectWallet}
            >
              <PowerIcon className={style.menuIcon} />
              Connect Wallet
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
