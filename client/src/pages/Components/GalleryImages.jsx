import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
 
const GalleryImage = ({image}) => {
  return (
 
   
        <div >
          <img
            src={image}
            alt={"Service Image"}
            className="w-full  bg-cover rounded-2xl"
          />
        
      
        </div>

       
     
   
  );
};

export default GalleryImage;
