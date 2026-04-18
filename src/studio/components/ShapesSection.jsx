import React from "react";
import useStore from "../store/useStore";
import "./ShapesSection.css";

const SHAPES = [
  {
    name: "Square",
    data: "M 0 0 H 100 V 100 H 0 Z",
    viewBox: "0 0 100 100"
  },
  {
    name: "Circle",
    data: "M 50, 0 a 50,50 0 1,1 0,100 a 50,50 0 1,1 0,-100",
    viewBox: "0 0 100 100"
  },
  {
    name: "Triangle",
    data: "M 50 0 L 100 100 L 0 100 Z",
    viewBox: "0 0 100 100"
  },
  {
    name: "Star",
    data: "M 50 0 L 61 35 L 98 35 L 68 57 L 79 91 L 50 70 L 21 91 L 32 57 L 2 35 L 39 35 Z",
    viewBox: "0 0 100 100"
  },
  {
    name: "Hexagon",
    data: "M 50 0 L 93 25 L 93 75 L 50 100 L 7 75 L 7 25 Z",
    viewBox: "0 0 100 100"
  }
];

const ShapesSection = () => {
  const { addObject } = useStore();

  const handleAddShape = (shape) => {
    addObject({
      type: "shape",
      data: shape.data,
      fill: "#4F46E5",
      width: 100,
      height: 100,
      scaleX: 1,
      scaleY: 1
    });
  };

  return (
    <div className="shapes-section">
      <div className="shapes-grid">
        {SHAPES.map((shape) => (
          <button
            key={shape.name}
            className="shape-item"
            onClick={() => handleAddShape(shape)}
            title={`Add ${shape.name}`}
          >
            <svg viewBox={shape.viewBox} className="shape-preview">
              <path d={shape.data} fill="currentColor" />
            </svg>
            <span className="shape-label">{shape.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapesSection;
