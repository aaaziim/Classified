import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
 
const GalleryImage = ({image}) => {
  return (
 
   
        <div >
          <img
            src={image}
            alt="Banner 1"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl"
          />
        
      
        </div>

       
     
   
  );
};

export default GalleryImage;
