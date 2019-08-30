import React, { useState, useEffect } from "react";
import "./style.sass";
import SkeletonCustom from "../Skeleton";
import { Col } from "antd";
import BenefitRepo from "../../repository/Benefit";

export default function Benefit (){
  const [benefit,setBenefit] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    getBenefit()
  },[])

  async function getBenefit () {
    let benefit = await BenefitRepo.getAll({
      loading : setLoading
    })
    if (benefit.status === 200) {
      setBenefit(benefit.data.data) 
    } else {
      setBenefit(null)
    }          
  }

  const showBenefit = benefit.map((benefit, index) => (
    <Col key={index} md={4}>
      <img
        className="mp-benefit-image"
        alt=""
        src={benefit.imageUrl} />
    </Col>
  ));


  return (
    <React.Fragment>
      {loading ?
        <SkeletonCustom
          count={4}
          width={200}
          height={40}
          leftMargin={13}
          rightMargin={13}
          topMargin={24}
        />
        :
        <div className="container">
          <div className="mp-benefit-box">
            {showBenefit}
          </div>
        </div>
        }
    </React.Fragment>
  )
};


