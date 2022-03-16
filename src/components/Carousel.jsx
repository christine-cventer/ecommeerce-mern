import React from "react";
import Carousel from "react-bootstrap/Carousel";
import hairItems from "../styles/assets/hairItems.jpeg";
import fragrance from "../styles/assets/fragrance.jpeg";
import lady from "../styles/assets/lady.jpeg";
import FeaturedProducts from "./FeaturedProducts";

import "../styles/carousel.css";

const MidSectionComponent = () => {
  return (
    <>
      <div className="carouselContainer">
        <Carousel>
          <Carousel.Item className="carouselItemInner">
            <img className=" w-100" src={hairItems} alt="First slide" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carouselItemInner">
            <img className=" w-100" src={lady} alt="Second slide" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carouselItemInner">
            <img className=" w-100" src={fragrance} alt="Third slide" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <FeaturedProducts />
    </>
  );
};

export default MidSectionComponent;
