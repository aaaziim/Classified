import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import SellerInfo from "./SellerInfo";
import CategorySidebar from "./CategorySidebar";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import toast from "react-hot-toast";
import { MdReportProblem } from "react-icons/md";
import GalleryImages from "../Components/GalleryImages";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [errorEvent, setErrorEvent] = useState("");
  const [loadingEvent, setLoadingEvent] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure(`/event/${id}`);
        setEvent(response.data);
        setLoadingEvent(false);
      } catch (err) {
        setErrorEvent("Error loading services");
        setLoadingEvent(false);
      }
    };

    fetchEvent();
  }, []);

  if (loadingEvent)
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  if (errorEvent)
    return <div className="text-center text-[#FA8649]">{errorService}</div>;

  const {
    title,
    posted,
    price,
    country,
    state,
    city,
    category,
    subcategory,
    description,
    startDate,
    endDate,
    author,
    images,
  } = event;

  const handleEventReport = async () => {
    const updatedEvent = {
      status: "reported",
    };

    try {
      await axiosSecure.put(`/event-report/${id}`, updatedEvent);
      toast.success("Event reported");
    } catch (err) {
      toast.error(err.response?.data || "Error reporting event");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row gap-4 my-10 px-4">
        <DynamicTitlePage title={`${title} | SideGurus`} />

        <div className="w-full md:w-2/3 bg-[#FFE5D5] p-4 space-y-4 rounded-2xl">
          <Carousel
            infiniteLoop={true}
            className="rounded-lg"
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            useKeyboardArrows={true}
          >
            {images?.map((image, index) => (
              <GalleryImages key={index} image={image}></GalleryImages>
            ))}
          </Carousel>
          <div className="flex gap-2 justify-between">
            <div>
              <h1 className="text-2xl text-[#001C27] font-bold">{title}</h1>
              <p className="flex items-center gap-2 text-[#001C27]">
                <FaLocationArrow />
                {(city || state || country) && (
                  <span>
                    {[city, state, country].filter(Boolean).join(", ")}
                  </span>
                )}{" "}
              </p>
            </div>
            <p
              onClick={handleEventReport}
              className="flex  items-center gap-2 btn btn-warning"
            >
              <MdReportProblem />
              Report Spam
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <p className="flex items-center gap-2 text-[#014D48]">
              <MdOutlineDateRange />
              <span>
              <p>{new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} to {new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

              </span>
            </p>

            <p
              className="bg-[#FA8649] max-w-fit px-4 py-2 text-white font-bold relative"
              style={{
                clipPath: "polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%)",
              }}
            >
              Ticket: ${price}
            </p>
          </div>

          <p className="flex items-center gap-2 text-[#001C27]">
            <BiCategoryAlt />
            <span>
              {category} | {subcategory}
            </span>
          </p>

          <p className="text-2xl font-semibold text-[#001C27]">Description:</p>
          <p className="text-xl text-justify text-[#001C27]">
            {description}
            {/* Add full description here */}
          </p>
        </div>
        <div className="space-y-10 w-full md:w-1/3">
          <SellerInfo author={author} />
          {/* <CategorySidebar /> */}
        </div>
      </div>
    </>
  );
};

export default EventDetails;
