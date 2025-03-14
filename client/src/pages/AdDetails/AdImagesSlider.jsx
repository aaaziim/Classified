import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const AdImagesSlider = ({ images }) => {
  return (
    <div>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={images.length} // Dynamically setting the number of slides based on images array length
      >
        <Slider>
          {images?.map((image, index) => (
            <Slide key={index} index={index}>
              <img className="w-full h-96 object-cover" src={image} alt={`Image ${index}`} />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white py-2 px-4 rounded">Back</ButtonBack>
        <ButtonNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white py-2 px-4 rounded">Next</ButtonNext>
      </CarouselProvider>
    </div>
  );
};

export default AdImagesSlider;
