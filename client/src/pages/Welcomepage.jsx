import React, { Component } from "react";
import Carousel from "react-material-ui-carousel";
import Card from "@material-ui/core/Card";
import pic1 from "../Components/images/undraw_add_to_cart.svg"
import pic2 from "../Components/images/undraw_Online_shopping.svg"
import pic3 from "../Components/images/undraw_shopping.svg"
import pic4 from "../Components/images/undraw_shopping_app.svg"
import pic5 from "../Components/images/undraw_web_shopping.svg"
export class Welcomepage extends Component {
  render() {
    return (
      <div className='slider mt-2'>
        <p className='head'>Please login </p>
        <Carousel
        className="manual"
        animation="slide">
          <Card>
            <img src={pic1} alt=""/>
          </Card>
          <Card>
          <img src={pic2} alt=""/>
          </Card>
          <Card>
          <img src={pic3} alt=""/>
          </Card>
          <Card>
          <img src={pic4} alt=""/>
          </Card>
        </Carousel>
      </div>
    );
  }
}

export default Welcomepage;
