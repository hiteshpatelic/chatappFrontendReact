import Loader from "react-js-loader";
import React from "react";

const Loder = () => {
  return (
    <div className="dashboard">
      <div className="loder">
        <Loader
          type="spinner-default"
          bgColor={"#000080"}
          title={"Loading"}
          color={"#000080"}
          size={100}
        />
      </div>
    </div>
  );
};

export default Loder;
