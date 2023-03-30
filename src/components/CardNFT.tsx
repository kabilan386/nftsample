import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsImgs } from "contains/fakeData";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ClockIcon } from "@heroicons/react/outline";
import ItemTypeVideoIcon from "./ItemTypeVideoIcon";
import axios from "axios";
import HeaderFilterSearchPage from "./HeaderFilterSearchPage";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import BackgroundSection from "./BackgroundSection/BackgroundSection";
import SectionSliderCollections from "./SectionSliderCollections";
import SectionBecomeAnAuthor from "./SectionBecomeAnAuthor/SectionBecomeAnAuthor";

export interface CardNFTProps {
  className?: string;
  isLiked?: boolean;
}

const CardNFT: FC<CardNFTProps> = ({ className = "", isLiked }) => {

  const [marketData, setmarketData] = useState<any[]>([])
  const [filterData, setFilterData] = useState("")
  const [filterSale, setFilterSale] = useState("")
  const [filterPrice, setFilterPrice] = useState(0)


  const handleChange = (data, sale, price) => {
    setFilterData(data)
    setFilterSale(sale)
    setFilterPrice(price)
  }

  console.log(filterData, filterSale, filterPrice[1], "filter")



  const renderAvatars = () => {
    return (
      <div className="flex -space-x-1 ">
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
      </div>
    );
  };

  console.log(typeof (filterData
  ), "true")

  console.log(filterPrice[1], "true")



  const getmarketPlace = async () => {

    if (filterData !== "") {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?user=user&=&page=1&type=collection&collection_id=${filterData}`).then(res => {
        setmarketData(res?.data?.data?.docs)
        console.log(marketData, "res")
      })

    }  else if (filterSale !== "") {
       axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?user=user&=&page=1&type=${filterSale[0]}`).then(res => {
        setmarketData(res?.data?.data?.docs)
        console.log(marketData, "res")
      })
    } else if ( (filterPrice[1] !== 0) || ( filterPrice[1]  !== undefined) ) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?user=user&=&page=1&type=price&price_range=10`).then(res => {
        setmarketData(res?.data?.data?.docs)
        console.log(marketData, "res")
      })
    } else {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?user=user&=&page=1&`).then(res => {
        setmarketData(res?.data?.data?.docs)
        console.log(marketData, "res")
      })
    }
  }

  useEffect(() => {
    getmarketPlace()
  }, [filterData, filterSale, filterPrice])

  

  return (

    <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
      <main>
        {/* FILTER */}
        <HeaderFilterSearchPage data={handleChange} />

        {/* LOOP ITEMS */}
        <div className="flex sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
          {Array.from("1").map((_, index) => (
            <>
              {console.log(index, "index")}
              <div
                className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10  mt-8 lg:mt-10"`}
                data-nc-id="CardNFT"
              >
                {marketData?.filter(elem => elem.status === "active").map((e, index) => (
                  <>
                    {console.log(typeof (e?.like_count), "liked")}
                    <div key={index}>
                      <div className="relative flex-shrink-0 ">
                        <Link to={`/nft-detailt/${e?._id}`}>

                          <div>
                            <NcImage
                              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                              src={`${process.env.REACT_APP_BACKEND_URL}/${e?.media}`}
                              className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                            />
                          </div>
                          {Math.random() > 0.5 ? (
                            <ItemTypeVideoIcon className="absolute top-3 left-3 !w-9 !h-9" />
                          ) : (
                            <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
                          )}
                          <LikeButton
                            liked={isLiked}
                            id={e?._id}
                            likeCount={e?.like_count}
                            className="absolute top-3 right-3 z-10 !h-9"
                          />
                          <div className="absolute top-3 inset-x-3 flex"></div>
                        </Link>
                      </div>

                      <div className="p-4 py-5 space-y-3">
                        {/* <div className="flex justify-between">
          {renderAvatars()}
          <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {Math.floor(Math.random() * 90) + 10} in stock
          </span>
        </div> */}
                        <h2 className={`text-lg font-medium`}>
                          {e?.name}
                          {/*  #{Math.floor(Math.random() * 1000) + 1000} */}
                        </h2>

                        <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

                        <div className="flex justify-between items-end ">
                          <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" priceValue={e?.price} />
                          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                            <ClockIcon className="w-4 h-4" />
                            <span className="ml-1 mt-0.5">
                              {Math.floor(Math.random() * 20) + 1} hours left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                ))}

              </div>
            </>

          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
          <Pagination />
          <ButtonPrimary loading>Show me more</ButtonPrimary>
        </div>
      </main>

      {/* === SECTION 5 === */}
      <div className="relative py-16 lg:py-28">
        <BackgroundSection />
        <SectionSliderCollections />
      </div>

      {/* SUBCRIBES */}
      <SectionBecomeAnAuthor />
    </div>

  );
};

export default CardNFT;
