import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import useLocations from "../../hooks/useLocations";
import LocationCard from "./LocationCard";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const AllLocations = () => {
  const [locations] = useLocations();
  return (
    <div>
      <DynamicTitlePage title={`Locations | SideGurus`} />

      <Breadcrumb
          title={"Locations"}
          subTitle={"Here you can find"}
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
