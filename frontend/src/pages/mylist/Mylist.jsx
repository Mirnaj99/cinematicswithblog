import React, { useContext } from "react";
import Listcard from "../../components/listcard/Listcard";
import Navbar from "../../components/Navbar/Navbar";
import "./mylist.scss";

import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";

export default function Mylist() {
  const { user } = useContext(AuthContext);

  const displayData = () => {
    if (user.mylist.length == 0) {
      return (
        <div className="nolist">
        <Link to="/" className="link">
          <span>
            Add Movies And Series To Your List So You Can Easily Find Them Later
          </span>
        </Link>
        </div>
      );
    }
  };

  return (
    <div className="mylistbody">
      <Navbar />

      <div className="listcard">
        <div className="mylistwrapper">
          <h2 className="h2mylist">
            <strong className="strongmylist">All Shows</strong>
          </h2>
          {displayData()}
          <div className="cards">
            {user.mylist.map((item) => {
              return <Listcard key={item} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
