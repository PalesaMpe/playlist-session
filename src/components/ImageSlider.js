import { useEffect, useState } from "react";

function ImageSlider({ slides }) {
  const [current, setCurrent] = useState(0);

  const slideStyle = {
    width: "100%",
    backgroundImage: `url(${slides[0]}`,
  };

  return (
    <div>
      <div style={{ backgroundImage: `url(${slides[0]}` }}></div>
    </div>
  );
}

export default ImageSlider;
