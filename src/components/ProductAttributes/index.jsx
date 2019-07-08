import React from "react";
import './style.sass'
import { Col } from "antd";

const ProductAttibutes = props => {
  const { product } = props
  return (
    <div className="card-description">
      <table>
        <tbody>
          <tr>
            <td style={{ width: "20%" }}>
              <div className="card-description__text">
                <p>Kategori</p>
              </div>
            </td>
            <td>
              <div className="card-description__title">
                <p><span>: </span>{product.category.name}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="card-description__text">
                <p>Berat</p>
              </div>
            </td>
            <td>
              <div className="card-description__title">
                <p><span>: </span>{product.measurement.weight}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="card-description__text">
                <p>Dimension</p>
              </div>
            </td>
            <td>
              <div className="card-description__title">
                <p><span>: </span>
                  {product.measurement.dimension.length}&nbsp;x&nbsp;
             {product.measurement.dimension.width}&nbsp;x&nbsp;
             {product.measurement.dimension.height}
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top" }}>
              <div className="card-description__text">
                <p>Description</p>
              </div>
            </td>
            <td>
              <div className="card-description__title">
                <span>: </span>
                <p dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default ProductAttibutes;
