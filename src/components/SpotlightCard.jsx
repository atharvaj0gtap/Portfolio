import { useRef } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({ 
  children, 
  className = "", 
  spotlightColor = "rgba(92, 169, 255, 0.1)",
  style = {} // Add default empty style object
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
      style={{
        ...style, // Merge received style props
        "--spotlight-color": spotlightColor
      }}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;