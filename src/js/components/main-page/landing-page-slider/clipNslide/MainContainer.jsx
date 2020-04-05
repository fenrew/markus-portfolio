import React, { useState, useEffect } from "react";
import "./mainContainerStyles.css";

const MainContainer = props => {
  const [clipNslide, setClipNslide] = useState({
    displayChild: 0,
    clippedElements: [],
    clippedIncomingElements: [],
    finishedClippig: false,
    ref: React.createRef(),
    transitionTime: 1.5
  });

  const [showAnimation, setShowAnimation] = useState({
    animation: false
  });

  const handleChangeSlide = event => {
    event.preventDefault();

    let newDisplayChild = (clipNslide.displayChild + 1) % props.children.length;

    // 0.3 is 30% of the screen to go to previous child in the slider
    // if (event.clientX < windowWidth * 0.3) {
    //   newDisplayChild =
    //     clipNslide.displayChild - 1 < 0
    //       ? props.children.length - 1
    //       : clipNslide.displayChild - 1;
    // }

    const { clippedElements, clippedIncomingElements } = props.randomClipper
      ? clipAnimationElementsRandom()
      : clipAnimationElementsLined();

    setClipNslide({
      ...clipNslide,
      displayChild: newDisplayChild,
      clippedElements,
      clippedIncomingElements,
      animation: true,
      finishedClippig: true
    });

    setShowAnimation({
      animation: true
    });
  };

  // Update for transition time and thus the
  const clipAnimationElementsRandom = () => {
    const divideBy = props.divideBy ? props.divideBy : 3;
    const clippedElements = [],
      clippedIncomingElements = [];

    const oddOrEvenTransition = Math.floor(Math.random() * 2) + 1;

    for (let i = 1; i <= divideBy; i++) {
      const transitionTimer =
        i % oddOrEvenTransition === 0
          ? Math.random() * 0.3 + 1.25
          : Math.random() * 0.3 + 1.0;

      const stylesObj = {
        clipPath: `polygon(0 ${((i - 1) * 100) / divideBy}%, 0% ${(i * 100) /
          divideBy}%, 100% ${(i * 100) / divideBy}%, 100% ${((i - 1) * 100) /
          divideBy}%)`,
        zIndex: `${5 + i}`,
        transitionDelay: `${i === 1 ? 0 : Math.random() * 0.4 + 0.4}s`
      };

      clippedElements.push(
        <div
          key={i}
          style={{
            ...stylesObj,
            left: "0%",
            transition: `left ${transitionTimer}s ease-in`
          }}
          className="clipped-element"
        >
          {props.children[clipNslide.displayChild]}
        </div>
      );

      let nextChild = (clipNslide.displayChild + 1) % props.children.length;

      clippedIncomingElements.push(
        <div
          key={i}
          style={{
            ...stylesObj,
            left: "500%",
            transition: `left ${transitionTimer}s ease-out`
          }}
          className="clipped-element"
        >
          {props.children[nextChild]}
        </div>
      );
    }

    return { clippedElements, clippedIncomingElements };
  };

  const clipAnimationElementsLined = () => {
    const divideBy = props.divideBy ? props.divideBy : 3;
    const clippedElements = [],
      clippedIncomingElements = [];

    for (let i = 1; i <= divideBy; i++) {
      const stylesObj = {
        clipPath: `polygon(0 ${((i - 1) * 100) / divideBy}%, 0% ${(i * 100) /
          divideBy +
          0.2}%, 100% ${(i * 100) / divideBy + 0.2}%, 100% ${((i - 1) * 100) /
          divideBy}%)`,
        zIndex: `${5 + i}`
      };

      clippedElements.push(
        <div
          key={i}
          style={{
            ...stylesObj,
            left: "0%",
            transition: `left ${clipNslide.transitionTime}s ease-in`,
            transitionDelay: `${i === 1 ? 0 : (i ^ (1.1 - 1)) * 0.2}s`
          }}
          className="clipped-element"
        >
          {props.children[clipNslide.displayChild]}
        </div>
      );

      let nextChild = (clipNslide.displayChild + 1) % props.children.length;

      clippedIncomingElements.push(
        <div
          key={i}
          style={{
            ...stylesObj,
            left: "500%",
            transition: `left ${clipNslide.transitionTime}s ease-out`,
            transitionDelay: `${i === 1 ? 0 : (i ^ (1 - 1)) * 0.2}s`
          }}
          className="clipped-element"
        >
          {props.children[nextChild]}
        </div>
      );
    }

    return { clippedElements, clippedIncomingElements };
  };

  const runAnimation = () => {
    const { clippedElements, clippedIncomingElements } = clipNslide;

    const newClippedElements = clippedElements.map(element => {
      return (
        <element.type
          {...element.props}
          key={element.key}
          style={{
            ...element.props.style,
            left: props.randomClipper ? "-500%" : "-500%"
          }}
        />
      );
    });

    const newClippedIncomingElements = clippedIncomingElements.map(element => {
      return (
        <element.type
          {...element.props}
          key={element.key}
          style={{
            ...element.props.style,
            left: "0%"
          }}
        />
      );
    });

    setClipNslide({
      ...clipNslide,
      finishedClippig: false,
      clippedElements: newClippedElements,
      clippedIncomingElements: newClippedIncomingElements
    });
  };

  const addEventListener = () => {
    let listenedAmountOfTimes = 0;

    clipNslide.ref.current.addEventListener("transitionend", () => {
      listenedAmountOfTimes++;
      let divideBy = (props.divideBy ? props.divideBy : 3) * 2;
      if (listenedAmountOfTimes % divideBy === 0) {
        setShowAnimation({
          ...showAnimation,
          animation: false
        });
      }
    });
  };

  // To add the "display current slide" on the top
  const displayCurrentSlideCounter = () => {
    return (
      <div
        className="slide-counter-background"
        style={{
          width: `${props.children.length * 2}vw`
        }}
      >
        <div
          className="slide-counter-active"
          style={{
            transition: `left ${clipNslide.transitionTime*2}s`,
            left: `${(clipNslide.displayChild * 100) / props.children.length}%`
          }}
        ></div>
      </div>
    );
  };

  useEffect(() => {
    if (clipNslide.finishedClippig) {
      runAnimation();
    }
  });

  useEffect(() => {
    addEventListener();
  }, []);

  //Sets the background to either a color or a url depending on what is given by the user
  const backgroundStyle = /(url\()|(\/)/g.test(props.background)
    ? { backgroundImage: props.background }
    : { backgroundColor: props.background };

  return (
    <div
      id="ClipNSlide-Main-Container"
      style={{ ...backgroundStyle, position: "relative", overflow: "hidden" }}
      ref={clipNslide.ref}
      onClick={event =>
        showAnimation.animation ? "" : handleChangeSlide(event)
      }
    >
      <div id="current-slide-counter-container">
        {displayCurrentSlideCounter()}
      </div>
      {showAnimation.animation
        ? clipNslide.clippedElements
        : props.children[clipNslide.displayChild]}
      {showAnimation.animation ? clipNslide.clippedIncomingElements : ""}
    </div>
  );
};

export default MainContainer;
