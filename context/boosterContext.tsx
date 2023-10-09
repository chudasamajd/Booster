import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";

type authContextType = {
  pickup: string;
  setPickup: () => void;
  dropoff: string;
  setDropoff: () => void;
  pickupCoordinates: Array<number>;
  setPickupCoordinates: () => void;
  dropoffCoordinates: Array<number>;
  setDropoffCoordinates: () => void;
  distance: number;
  duration: number;
  showScooterList: boolean;
  setShowScooterList: () => void;
};

const authContextDefaultValues: authContextType = {
  pickup: "",
  setPickup: () => {},
  dropoff: "",
  setDropoff: () => {},
  pickupCoordinates: [],
  setPickupCoordinates: () => {},
  dropoffCoordinates: [],
  setDropoffCoordinates: () => {},
  distance: 0,
  duration: 0,
  showScooterList: false,
  setShowScooterList: () => {},
};

const BoosterContext = createContext<authContextType>(authContextDefaultValues);

export function useBoosterContext() {
  return useContext(BoosterContext);
}

type Props = {
  children: ReactNode;
};

export const BoosterProvider = ({ children }: Props) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pickupCoordinates, setPickupCoordinates] = useState();
  const [dropoffCoordinates, setDropoffCoordinates] = useState();
  const [showScooterList, setShowScooterList] = useState(false);
  const [currentAccount, setCurrentAccount] = useState([]);
  const [basePrice, setBasePrice] = useState(0);
  let metaMask;

  if (typeof window !== "undefined") {
    metaMask = window.ethereum;
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        requestToCreateUserOnSanity(addressArray[0]);
      } else {
        setCurrentAccount([]);
        connectWallet();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        requestToCreateUserOnSanity(addressArray[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createLocationCoordinatePromise = (locationName, locationType) => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch("/api/db/getLocationCoordinates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: locationName }),
      });
      const data = await response.json();

      if (data.message === "success") {
        switch (locationType) {
          case "pickup":
            setPickupCoordinates(data.data);
            break;
          case "dropoff":
            setDropoffCoordinates(data.data);
            break;
        }
        resolve();
      } else {
        reject();
      }
    });
  };

  useEffect(() => {
    if (pickup && dropoff) {
      (async () => {
        await Promise.all([
          createLocationCoordinatePromise(pickup, "pickup"),
          createLocationCoordinatePromise(dropoff, "dropoff"),
        ]);
      })();
    } else return;
  }, [pickup, dropoff]);

  const requestToCreateUserOnSanity = async (address) => {
    if (!window.ethereum) return;

    try {
      await fetch("/api/db/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userWalletAddress: address,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    pickup,
    setPickup,
    dropoff,
    setDropoff,
    pickupCoordinates,
    setPickupCoordinates,
    dropoffCoordinates,
    setDropoffCoordinates,
    distance,
    setDistance,
    duration,
    setDuration,
    showScooterList,
    setShowScooterList,
    connectWallet,
    currentAccount,
    setCurrentAccount,
    basePrice,
    setBasePrice,
    metaMask,
  };

  return (
    <BoosterContext.Provider value={value}>{children}</BoosterContext.Provider>
  );
};
