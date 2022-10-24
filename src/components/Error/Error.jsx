import React from "react";
import "./Error.css";
const Error = () => {
  return (
    <div id="overallStatus">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45px"
        height="45px"
        viewBox="0 0 45 45"
        version="1.1"
      >
        <title>red_status</title>
        <defs>
          <path
            d="M8.43205769 38.1906149C2.90905516 38.17423 0.630739568 34.2579195 3.34303632 29.4437542L16.0266682 6.93106212C18.7390819 2.11668929 23.1497045 2.11171534 25.8729434 6.91091845L38.7464812 29.5981394C41.4720152 34.4013872 39.1981662 38.2818882 33.6812163 38.2655212L8.43205769 38.1906149Z"
            id="path-1"
          />
          <filter
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feOffset
              dx="-2"
              dy="2"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="1"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feComposite
              in="shadowBlurOuter1"
              in2="SourceAlpha"
              operator="out"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.245216259 0"
              type="matrix"
              in="shadowBlurOuter1"
            />
          </filter>
          <filter
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="objectBoundingBox"
            id="filter-3"
          >
            <feOffset
              dx="0"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetInner1"
            />
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            />
            <feColorMatrix
              values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.4 0"
              type="matrix"
              in="shadowInnerInner1"
            />
          </filter>
        </defs>
        <g
          id="red-exclamation"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          transform="translate(0.000000, -1.000000)"
        >
          <g id="Rectangle-134">
            <use
              fill="black"
              fillOpacity="1"
              filter="url(#filter-2)"
              xlinkHref="#path-1"
            />
            <use fill="#F1342F" fillRule="evenodd" xlinkHref="#path-1" />
            <use
              fill="black"
              fillOpacity="1"
              filter="url(#filter-3)"
              xlinkHref="#path-1"
            />
            <use xlinkHref="#path-1" />
          </g>
          <line
            className="exclamation"
            x1="21"
            y1="11"
            x2="21"
            y2="25"
            strokeLinecap="round"
            stroke="#fff"
            strokeWidth="4"
          />
          <circle className="dot" cx="21" cy="32" r="2" fill="#fff" />
        </g>
      </svg>
    </div>
  );
};
export default Error;
