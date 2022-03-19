import { Link, useLocation } from "react-router-dom";
import "./newList.css";

export default function NewList() {
  const location = useLocation();
  const { list } = location.state;

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list?.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list?.type}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Content:</span>
              <ul>
                {list?.content.map((data) => {
                  return <li className="productInfoValue">{data} </li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
