//rafc
import React from "react";
import Shop from "./Shop";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <div className="container my-3">
        <Shop showAlert={showAlert}/>
      </div>
    </div>
  );
};

export default Home;
