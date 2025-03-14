import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import useLocations from "../../hooks/useLocations";
import LocationCard from "./LocationCard";

const AllLocations = () => {
  const [locations] = useLocations();
  return (
    <div>
      <Breadcrumb
          title={"Locations"}
          subTitle={"Here you can find"}
        ></Breadcrumb>
      <div className="mx-4">
        

        {locations?.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
};

export default AllLocations;
