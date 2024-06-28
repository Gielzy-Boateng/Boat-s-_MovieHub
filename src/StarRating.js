import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const StarRating = ({
  numberList = 5,
  color = "magenta",
  size = 50,
  className,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };

  const textStyle = {
    fontSize: `${size / 1.5}px`,
    color,
  };

  StarRating.propTypes = {
    numberList: PropTypes.number,
    defaultRating: PropTypes.number,
    messages: PropTypes.array,
    size: PropTypes.number,
    color: PropTypes.string,
  };

  const container = {
    width: `${size}px`,
    height: `${size}px`,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: color,
    fontSize: `${size} px`,
  };

  const subContainer = {
    lineHight: "1",
    margin: "0",
    display: "flex",
    gap: "10px",
    color: color,
    fontSize: `${size} px`,
  };
  return (
    <div style={container} className={className}>
      <div style={subContainer}>
        {Array.from({ length: numberList }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            hoverEnter={() => setTempRating(i + 1)}
            hoverLeave={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === numberList
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;
