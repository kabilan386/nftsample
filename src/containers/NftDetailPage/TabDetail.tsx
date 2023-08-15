import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { personNames } from "contains/fakeData";
import Avatar from "shared/Avatar/Avatar";
import VerifyIcon from "components/VerifyIcon";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { idText } from "typescript";

const TabDetail = ({ auction, current, buyFunctionForauction, chainNameDetails, bid , bidTimer}) => {

  

  const [offerData, setOfferData] = useState<any[]>([])
  const [histroyData, setHistroyData] = useState<any[]>([])
  const [bidData, setBidData] = useState<any[]>([])
  const TABS = [bid !== true ? "Bid Offer List" : "Bid List", "Provenance", "Owner"];

  const id = useParams();

  console.log(id, "params")

  console.log(current, "current")

  const acceptOffer = (ids): any => {

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };


    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/item/actionoffer`, {  "offer_id": ids,
      "item_id": `${id?.id}`,
      "type": "accept" }, config)
      .then((res) => {
        console.log(res, "789")
        if (res.data.status == true) {
          //  setLoading(false)
          toast.success(res.data.message)
          setTimeout(() => (window.location.href = `/nft-detailt/${id?.id}`), 1500);

        } else {
          toast.error(res.data.message)
          // setTimeout(() => {
          //   setLoading(false)
          // }, 1000);
        }
      })

  }

 

  const removeOffer = (ids): any => {

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };


    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/item/removeoffer`, {  "offer_id": ids,
      "item_id": `${id?.id}`,
      "type": "cancel" }, config)
      .then((res) => {
        console.log(res, "789")
        if (res.data.status == true) {
          //  setLoading(false)
          toast.success(res.data.message)
          setTimeout(() => (window.location.href =  `/nft-detailt/${id?.id}`), 1500);

        } else {
          toast.error(res.data.message)
          // setTimeout(() => {
          //   setLoading(false)
          // }, 1000);
        }
      })

  }

  console.log(bidTimer > Date.now(), "bidTimer")
  


  const getOfferList = () => {

   


    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/offers?page=1&type=item&item_id=${id?.id}`).then(res => {
      setOfferData(res?.data?.data?.docs)
      console.log(res, "offer")
    })
  }

  const getHistroyList = () => {

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/history?item_id=${id?.id}&type=item`).then(res => {
      setHistroyData(res?.data?.data?.docs)
      console.log(res, "offer")
    })
  }

  
  const getBid = () => {

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };



    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/bids?type=item&item_id=${id?.id}`, config).then(res => {
      setBidData(res?.data?.data?.docs)
      console.log(res, "bid")
    })
  }

  useEffect(() => {

    getOfferList()
    getHistroyList()
    getBid()

  }, [])

  console.log(histroyData, "histroy")




  const renderTabBidHistory = () => {
    return (
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {offerData?.map((data: any ,index) => 
        {
          auction(data?.status)
          return (
            <li
              key={index}
              className={`relative py-4 ${
                index % 2 === 1 ? "bg-neutradl-100" : ""
              }`}
            >
              <div className="flex items-center">
                <Avatar sizeClass="h-10 w-10" radius="rounded-full" />
  
                <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                  <span className="flex items-center text-sm">
                    <span className="">
                         Offer <span className="OfferPrice "> ${data?.item_id.price}</span> by
                    </span>
  
                    {/* <span className="">
                        {Math.random() > 0.5 ? "Listed by" : "Minted by"}
                      </span> */}
  
                    <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1 currentAddress">
                      {data?.sender?.address}
                    </span>
                  </span>
                  <span className="text-xs mt-1">Jun 14 - 4:12 PM</span>
                </span>
  
                { current === sessionStorage?.getItem("user_id") ?  <> { data?.status !== "accepted" ?  <div className="offerIcons">
                <i className="fa fa-check-circle btn btn-success" onClick={() => acceptOffer(data?._id)}></i>
                <i className="fa fa-trash btn btn-danger" onClick={() => removeOffer(data?._id)}></i>
                </div> : <button className="btn btn-danger mx-5">Waiting For Buy</button> } </> : <>{ data?.status !== "accepted" ? null : <button className="btn btn-primary mx-5" onClick={() => buyFunctionForauction(data, data?.price)}>Buy now</button>}</> }
             
  
               
              </div>
            </li>
          )
        })}
      </ul>
    );
  };

  const highestBid = bidData && bidData?.length > 0 ? bidData?.reduce((prevBid, currentBid) => {
    return prevBid?.price > currentBid?.price ? prevBid : currentBid;
  }) : null;

 
  const renderBidHistory = () => {
    const highestBidPrice = highestBid?.price;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
    console.log(highestBidPrice, bidData, "high")
    return (
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {bidData?.map((data: any, index) => {
          const isCurrentHighestBid = data?.price === highestBidPrice;
          const isBidAllowed = bidTimer < formattedDate 
  
          return (
            <li
              key={index}
              className={`relative py-4 ${index % 2 === 1 ? "bg-neutradl-100" : ""}`}
            >
              <div className="flex items-center">
                <Avatar sizeClass="h-10 w-10" radius="rounded-full" />
  
                <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                  <span className="flex items-center text-sm">
                    <span className="">
                      Bid By <span className="OfferPrice "> {chainNameDetails} {data?.price}</span> by
                    </span>
  
                    <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1 currentAddress">
                      {data?.sender?.address}
                    </span>
                  </span>
                  <span className="text-xs mt-1">Jun 14 - 4:12 PM</span>
                </span>
  
                {isBidAllowed && isCurrentHighestBid && (
    <>{ data?.sender?.address === sessionStorage?.getItem("address") ?   <button className="btn btn-primary mx-5" onClick={() => buyFunctionForauction(data, data?.price)}>Buy Now</button> : null }</>
)}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
  



  const renderTabProvenance = () => {
    return (
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {histroyData?.map((e, index) => (
          <li
            key={index}
            className={`relative py-4 ${
              index % 2 === 1 ? "bg-neutradl-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Avatar sizeClass="h-10 w-10" radius="rounded-full" />
              <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="flex items-center text-sm">
                  <span className="">
                   { e?.history_type } By
                   </span>

                  <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
                    {e?.to_id?.address}
                  </span>
                </span>
                <span className="text-xs mt-1">{e?.created_date}</span>
              </span>
            </div>

            <span className="absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-blue-400"></span>
          </li>
        ))}
      </ul>
    );
  };

  const renderTabOwner = () => {
    return (
      <div className="flex items-center py-4">
        <Avatar sizeClass="h-11 w-11" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
          <span className="text-sm">Owner</span>
          <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
            <span>{current}</span>
            <VerifyIcon iconClass="w-4 h-4" />
          </span>
        </span>
      </div>
    );
  };

  console.log(bid, )

  const renderTabItem = (item: string) => {
    switch (item) {
      case "Bid Offer List":
        return  renderTabBidHistory();
        case "Bid List":
        return  renderBidHistory();
      case "Provenance":
        return renderTabProvenance();

      case "Owner":
        return renderTabOwner();

      default:
        return null;
    }
  };

  return (
    <div className="w-full pdx-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex justify-start pd-1 space-x-2.5 rounded-full bordedr border-neutral-300 dark:border-neutral-500">
          {TABS.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 ${
                  selected
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                    : "text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {TABS.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={
                "rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
              }
            >
              {renderTabItem(tab)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabDetail;
