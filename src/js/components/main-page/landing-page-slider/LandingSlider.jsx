import React from "react";

import MainContainer from "./clipNslide/MainContainer";
import Content from "./clipNslide/content/Content";
import ScrollForMore from "./scrollForMore/ScrollForMore";

import "./landingSliderStyles.css";

const MainPage = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MainContainer background="black" divideBy="5">
        <Content>
          <div className="slider-container" id="slider-one">
            <h1 className="slider-header">Markus Heldrup</h1>
            <div className="slider-quote">
              - Developer by day, sleeper by night!
            </div>
            <div className="slider-content">
              This homepage is my protofolio created in March 2020. As you can
              imagine my developer skills along with bitcoins have increase
              drastically since then! *hopefully*
            </div>
            <div className="slider-content">
              The website is focused towards javascript skills and effects, thus
              it may come at the cost of design. As we all know, a porofolio
              webpage is only about displaying skills in the awesome art of
              programming as we all love and have come acusomed to. At this
              point I am just rambeling, so without further a due, enjoy my
              nifty little website!
            </div>
            <ScrollForMore />
          </div>
        </Content>
        <Content>
          <div className="slider-container" id="slider-two">
            <h1
              className="slider-header"
              style={{ marginBottom: "0px", marginTop: "-5vw" }}
            >
              About the slider
            </h1>
            {/* <div className="slider-quote">
              - Developer by day, sleeper by night!
            </div> */}
            <div className="slider-content" style={{ marginTop: "0px" }}>
              This slider was created in a way so it can be turned into an npm
              package that is easy to use for other developers. It is completely
              flexible and works perfectly well in containers of all sizes and
              with any content.
            </div>
            <ScrollForMore />
          </div>
        </Content>
        <Content>
          <div className="slider-container" id="slider-three">
            <h1 className="slider-header">Features</h1>
            {/* <div className="slider-quote">
              - Developer by day, sleeper by night!
            </div> */}
            {/* <div className="slider-content">
     
            </div> */}
            <ul className="slider-list-container">
              <li>
                <strong>Responsive:</strong> Can be used in full screen or in a
                smaller element
              </li>
              <li>
                <strong>Takes three props;</strong> background, divideBy and
                randomClipper
              </li>
              <li>
                <strong>background:</strong> Sets the transition background as
                url and colors
              </li>
              <li>
                <strong>divideBy:</strong> Takes a number and clips the content
                if divideBy amount of fractions{" "}
              </li>
              <li>
                <strong>randomClipper:</strong> If true, changes the sliding
                animation to a more random based one
              </li>
            </ul>
            <ScrollForMore />
          </div>
        </Content>
      </MainContainer>
    </div>
  );
};

export default MainPage;
