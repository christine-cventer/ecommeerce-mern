import React from "react";

const PlaygroundPage = () => {
  const imgName = "/w7hw5r020u6j7ssh9spw";
  const imgUrl = process.env.REACT_APP_CLOUDINARY_BASE_URL + imgName;
  console.log(imgUrl);
  return (
    <div>
      <img src={imgUrl} />
    </div>
  );
};

export default PlaygroundPage;
