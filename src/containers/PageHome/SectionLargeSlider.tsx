import CardLarge1 from "components/CardLarge1/CardLarge1";
import { nftsLargeImgs } from "contains/fakeData";
import React, { FC, useState, useEffect } from "react";
import axios from "axios";

export interface SectionLargeSliderProps {
  className?: string;
}

const SectionLargeSlider: FC<SectionLargeSliderProps> = ({
  className = "",
}) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= 2) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return 2;
      }
      return state - 1;
    });
  };

  const [marketData, setMarketData] = useState<any[]>([])



  const getData = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?user=user&=&page=1&`).then(res => {
      setMarketData(res?.data?.data?.docs.slice(0,3))
      console.log(marketData, "res")
    })
  }

  console.log(marketData, "data")

  useEffect(() => {
     getData()
  }, [])

  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      {marketData.map((data, index) =>
        indexActive === index ? (
          <CardLarge1
            key={index}
            isShowing
            data={data}
            featuredImgUrl={nftsLargeImgs[index]}
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
          />
        ) : null
      )}
    </div>
  );
};

export default SectionLargeSlider;
