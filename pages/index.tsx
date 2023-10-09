import RiderRequest from "../components/RiderRequest";
import LocationSelector from "../components/LocationSelector";
import ScooterList from "../components/ScooterList";
import Map from "../components/Map";
import { useBoosterContext } from "../context/boosterContext";

const style = {
  wrapper: `h-screen w-screen overflow-hidden flex bg-black`,
};

export default function Home() {
  const { showScooterList } = useBoosterContext();
  return (
    <div className={style.wrapper}>
      <RiderRequest />
      <div className=" w-5/12 relative m-4">
        <div className="w-2/3 absolute left-1/2 -translate-x-1/2  z-10">
          <LocationSelector />
        </div>
        <Map />
        <div className="absolute bottom-3 w-full">
          {showScooterList && <ScooterList />}
        </div>
      </div>
    </div>
  );
}
