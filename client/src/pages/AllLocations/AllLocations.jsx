import React, { useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import useLocations from "../../hooks/useLocations";
import LocationCard from "./LocationCard";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const AllLocations = () => {
  const [locations] = useLocations();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <DynamicTitlePage title={`Locations | SideGurus`} />

      <Breadcrumb
          title={"Locations"}
          subTitle={"Here you can find Ads By Location"}
        ></Breadcrumb>
      <div className="mx-4">
        

        {locations?.map((location, i) => (
          <LocationCard key={i} location={location} />
        ))}
      </div>
    </div>
  );
};

export default AllLocations;
