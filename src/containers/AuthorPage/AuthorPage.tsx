import React, { FC, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import NcImage from "shared/NcImage/NcImage";
import CardNFT from "components/CardNFT";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import authorBanner from "images/nfts/authorBanner.png";
import { nftsImgs } from "contains/fakeData";
import NftMoreDropdown from "components/NftMoreDropdown";
import ButtonDropDownShare from "components/ButtonDropDownShare";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SocialsList from "shared/SocialsList/SocialsList";
import FollowButton from "components/FollowButton";
import VerifyIcon from "components/VerifyIcon";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import CardAuthorBox3 from "components/CardAuthorBox3/CardAuthorBox3";
import ArchiveFilterListBox from "components/ArchiveFilterListBox";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import axios from "axios";
import Prices from "components/Prices";
import ItemTypeImageIcon from "components/ItemTypeImageIcon";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Table from 'react-bootstrap/Table';

export interface AuthorPageProps {
  className?: string;
}





const columns = [
  {
    dataField: 'ID',
    text: 'ID'
  },
  {
    dataField: 'Item Name',
    text: 'Item Name'
  },
  {
    dataField: 'Price',
    text: 'Price'
  },
  {
    dataField: 'Create Date',
    text: 'Create Date'
  },
  {
    dataField: 'From',
    text: 'From',
    classes: "currentAddress"
  },
  {
    dataField: 'To',
    text: 'To',
    classes: "currentAddress"
  },
  {
    dataField: 'Status',
    text: 'Status'
  }
];



interface Props {

  pagination: any;
}









const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
  let [categories] = useState([
    "Collectibles",
    "Created",
    "Favourited",
    "Offer"
    
  ]);

  

  const [item, setItem] = useState<any[]>([])
  const [offerData, setOfferData] = useState<any[]>([])
  const [favourite, setFavourite] = useState<any[]>([])
  const [collected, setCollected] = useState<any[]>([])
  
  


  const getFavourite = () => {
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?type=favouriteslist&page=1&user=user&user_id=${sessionStorage.getItem("user_id")}`, config).then(res => {
      setFavourite(res?.data?.data?.docs)
      console.log(res, "res")
    })
  }

  

  const getOffer = () => {
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/offers?page=1&user=user&user_id=${sessionStorage.getItem("user_id")}`, config).then(res => {
      setOfferData(res?.data?.data?.docs)
      console.log(res, "res")
    })
  }

  
  const getCollection = () => {
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?type=collected&user=user&user_id=${sessionStorage.getItem("user_id")}`, config).then(res => {
      setCollected(res?.data?.data?.docs)
      console.log(res, "res")
    })
  }









 

    



// const columns = [
//     {
//         dataField: 'collection',
//         text: 'Collection',
//         sort: true
//     },
//     {
//         dataField: 'price',
//         text: 'Price'
//     },
//     {
//         dataField: 'author',
//         text: 'Item'
//     },
//     {
//         dataField: 'event',
//         text: 'Event'
//     },
//     {
//         dataField: 'transaction_hash',
//         text: 'Transaction hash',
//         style: {
//             overflow: "hidden",
//             textOverflow: "ellipsis",

//         }

//     },
//     {
//         dataField: 'time',
//         text: 'Create Date',
//         sort: true
//     }
// ];

const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    paginationSize: 5,
    disablePageTitle: true,
    hideSizePerPage: true
});


  useEffect(() => {

    getCollection()
    getOffer()
    getFavourite()

  }, [])

  

  const datas = offerData?.map((e, index) => ({
    ID: index,
    'Item Name': e?.item_id?.name,
    'Price': e?.price,
    'Create Date': e?.created_date, 
    'From': e?.receiver?.address,
    'To': e?.sender?.address,
    'Status': e?.status
    // add other properties if present in your data
}));




  return (
    <div className={`nc-AuthorPage  ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Creator || Ciscryp NFT Template</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            containerClassName="absolute inset-0"
            src={authorBanner}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
            <div className="w-32 lg:w-44 flex-shrink-0 mt-12 sm:mt-0">
              <NcImage
                src={nftsImgs[2]}
                containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
              />
            </div>
            <div className="pt-5 md:pt-1 md:ml-6 xl:ml-14 flex-grow">
              <div className="max-w-screen-sm ">
                <h2 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  <span className="currentAddress">{sessionStorage?.getItem("address")}</span>
                  <VerifyIcon
                    className="ml-2"
                    iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                  />
                </h2>
                {/* <div className="flex items-center text-sm font-medium space-x-2.5 mt-2.5 text-green-600 cursor-pointer">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {" "}
                  </span>
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path
                      d="M18.05 9.19992L17.2333 12.6833C16.5333 15.6916 15.15 16.9083 12.55 16.6583C12.1333 16.6249 11.6833 16.5499 11.2 16.4333L9.79999 16.0999C6.32499 15.2749 5.24999 13.5583 6.06665 10.0749L6.88332 6.58326C7.04999 5.87492 7.24999 5.25826 7.49999 4.74992C8.47499 2.73326 10.1333 2.19159 12.9167 2.84993L14.3083 3.17493C17.8 3.99159 18.8667 5.71659 18.05 9.19992Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5498 16.6583C12.0331 17.0083 11.3831 17.3 10.5915 17.5583L9.2748 17.9917C5.96646 19.0583 4.2248 18.1667 3.1498 14.8583L2.08313 11.5667C1.01646 8.25833 1.8998 6.50833 5.20813 5.44167L6.5248 5.00833C6.86646 4.9 7.19146 4.80833 7.4998 4.75C7.2498 5.25833 7.0498 5.875 6.88313 6.58333L6.06646 10.075C5.2498 13.5583 6.3248 15.275 9.7998 16.1L11.1998 16.4333C11.6831 16.55 12.1331 16.625 12.5498 16.6583Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div> */}

                {/* <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTs.
                  Contributing to @ether_cards, an NFT Monetization Platform.
                </span> */}
              </div>
              {/* <div className="mt-4 ">
                <SocialsList itemClass="block w-7 h-7" />
              </div> */}
            </div>
            {/* <div className="absolute md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5 flex flex-row-reverse justify-end">
              <NftMoreDropdown
                actions={[
                  {
                    id: "report",
                    name: "Report abuse",
                    icon: "las la-flag",
                  },
                ]}
                containerClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
              />
              <ButtonDropDownShare
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer mx-2"
                panelMenusClass="origin-top-right !-right-5 !w-40 sm:!w-52"
              />

            
            </div> */}
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          <Tab.Group>
            <div className="flex flex-col lg:flex-row justify-between ">
              <Tab.List className="flex space-x-0 sm:space-x-2 overflow-x-auto ">
                {categories.map((item) => (
                  <Tab key={item} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none ${
                          selected
                            ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900"
                            : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800"
                        } `}
                      >
                        {item}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              {/* <div className="mt-5 lg:mt-0 flex items-end justify-end">
                <ArchiveFilterListBox />
              </div> */}
            </div>
            <Tab.Panels>
              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">

                {collected?.map((e: any) => {
              return (
                <>

                  <div

                    data-nc-id="CardNFT"
                  >
                    <div className="relative flex-shrink-0 ">

                      <div>
                        <NcImage
                          containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                          src={`${process.env.REACT_APP_BACKEND_URL}/${e?.media}`}
                          className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                        />
                      </div>





                      {/* {Math.random() > 0.5 ? (
                        <ItemTypeVideoIcon className="absolute top-3 left-3 !w-9 !h-9" />
                      ) : ( */}
                        <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
                      {/* )} */}
                      <div className="absolute top-3 right-3 !w-9 !h-9">
                        <Dropdown>
                          <Dropdown.Toggle className="rounded-pill shadow-sm" >
                            <i className="fa fa-ellipsis-v"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu align="end" >

                            <>
                            <Link key="index6" to={`/createListItem/${e?._id}`} state={{ foo: e?.collection_id?.chain}}  className="dropdown-item"  >
                                List NFT
                              </Link>

                            </>

                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      {/* <LikeButton
          liked={isLiked}
          className="absolute top-3 right-3 z-10 !h-9"
        /> */}
                      <div className="absolute top-3 inset-x-3 flex"></div>
                    </div>

                    <div className="p-4 py-5 space-y-3">
                      <div className="flex justify-between">
                        {/* {renderAvatars()} */}
                        {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
                          01 in stock
                        </span> */}
                      </div>
                      <h2 className={`text-lg font-medium`}>
                        {e?.name} 
                        {/* #{Math.floor(Math.random() * 1000) + 1000} */}
                      </h2>

                      <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

                      <div className="flex justify-between items-end ">
                        <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" />
                        {/* <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <ClockIcon className="w-4 h-4" />
            <span className="ml-1 mt-0.5">
              {Math.floor(Math.random() * 20) + 1} hours left
            </span>
          </div> */}
                      </div>
                    </div>


                  </div>

                </>
              )
            })}
                 
                </div>

                {/* PAGINATION */}
                {/* <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  <Pagination />
                  <ButtonPrimary loading>Show me more</ButtonPrimary>
                </div> */}
              </Tab.Panel>
              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {item?.map((e: any) => {
              return (
                <>

                  <div

                    data-nc-id="CardNFT"
                  >
                    <div className="relative flex-shrink-0 ">

                      <div>
                        <NcImage
                          containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                          src={`${process.env.REACT_APP_BACKEND_URL}/${e?.media}`}
                          className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                        />
                      </div>





                      {/* {Math.random() > 0.5 ? (
                        <ItemTypeVideoIcon className="absolute top-3 left-3 !w-9 !h-9" />
                      ) : ( */}
                        <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
                      {/* )} */}
                      <div className="absolute top-3 right-3 !w-9 !h-9">
                        {/* <Dropdown>
                          <Dropdown.Toggle className="rounded-pill shadow-sm" >
                            <i className="fas fa-ellipsis-v"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu align="end" >

                            <>
                              <Link key="index2" className="dropdown-item" to={`/edititem/${e?._id}`} state={{ id: id?.id }}>
                                EDIT
                              </Link>
                              <Link key="index3" className="dropdown-item" to="/delete">
                                DELETE

                              </Link>
                             { e?.publishStatus !== true  ?  <Link key="index6" className="dropdown-item" onClick={() => marketClaim(e?._id)} to={""} >
                                Mint
                              </Link> : <>
                              { e?.status === "active" ? <Link key="index6" to={``} className="dropdown-item"  >
                                DeLIST
                              </Link> : <Link key="index6" to={`/createListItem/${e?._id}`}  className="dropdown-item"  >
                                List
                              </Link>  } </>  }
                              <Link key="index6" className="dropdown-item" to={`/item`}  >
                                ITEM DETAILS
                              </Link>
                            </>

                          </Dropdown.Menu>
                        </Dropdown> */}
                      </div>
                      {/* <LikeButton
          liked={isLiked}
          className="absolute top-3 right-3 z-10 !h-9"
        /> */}
                      <div className="absolute top-3 inset-x-3 flex"></div>
                    </div>

                    <div className="p-4 py-5 space-y-3">
                      <div className="flex justify-between">
                        {/* {renderAvatars()} */}
                        {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
                          01 in stock
                        </span> */}
                      </div>
                      <h2 className={`text-lg font-medium`}>
                        {e?.name} 
                        {/* #{Math.floor(Math.random() * 1000) + 1000} */}
                      </h2>

                      <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

                      <div className="flex justify-between items-end ">
                        <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" />
                        {/* <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <ClockIcon className="w-4 h-4" />
            <span className="ml-1 mt-0.5">
              {Math.floor(Math.random() * 20) + 1} hours left
            </span>
          </div> */}
                      </div>
                    </div>


                  </div>

                </>
              )
            })}
                </div>

                {/* PAGINATION */}
                {/* <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  <Pagination />
                  <ButtonPrimary loading>Show me more</ButtonPrimary>
                </div> */}
              </Tab.Panel>
              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {favourite?.map((e: any) => {
              return (
                <>

                  <div

                    data-nc-id="CardNFT"
                  >
                    <div className="relative flex-shrink-0 ">

                      <div>
                        <NcImage
                          containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                          src={`${process.env.REACT_APP_BACKEND_URL}/${e?.media}`}
                          className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                        />
                      </div>





                      {/* {Math.random() > 0.5 ? (
                        <ItemTypeVideoIcon className="absolute top-3 left-3 !w-9 !h-9" />
                      ) : ( */}
                        <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
                      {/* )} */}
                      <div className="absolute top-3 right-3 !w-9 !h-9">
                        {/* <Dropdown>
                          <Dropdown.Toggle className="rounded-pill shadow-sm" >
                            <i className="fa fa-ellipsis-v"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu align="end" >

                            <>
                              <Link key="index2" className="dropdown-item" to={`/edititem/${e?._id}`} state={{ id: id?.id }}>
                                EDIT
                              </Link>
                              <Link key="index3" className="dropdown-item" to="/delete">
                                DELETE

                              </Link>
                             { e?.publishStatus !== true  ?  <Link key="index6" className="dropdown-item" onClick={() => marketClaim(e?._id)} to={""} >
                                Mint
                              </Link> : <>
                              { e?.status === "active" ? <Link key="index6" to={``} className="dropdown-item"  >
                                DeLIST
                              </Link> : <Link key="index6" to={`/createListItem/${e?._id}`}  className="dropdown-item"  >
                                List
                              </Link>  } </>  }
                              <Link key="index6" className="dropdown-item" to={`/item`}  >
                                ITEM DETAILS
                              </Link>
                            </>

                          </Dropdown.Menu>
                        </Dropdown> */}
                      </div>
                      {/* <LikeButton
          liked={isLiked}
          className="absolute top-3 right-3 z-10 !h-9"
        /> */}
                      <div className="absolute top-3 inset-x-3 flex"></div>
                    </div>

                    <div className="p-4 py-5 space-y-3">
                      <div className="flex justify-between">
                        {/* {renderAvatars()} */}
                        {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
                          01 in stock
                        </span> */}
                      </div>
                      <h2 className={`text-lg font-medium`}>
                        {e?.name} 
                        {/* #{Math.floor(Math.random() * 1000) + 1000} */}
                      </h2>

                      <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

                      <div className="flex justify-between items-end ">
                        <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" />
                        {/* <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <ClockIcon className="w-4 h-4" />
            <span className="ml-1 mt-0.5">
              {Math.floor(Math.random() * 20) + 1} hours left
            </span>
          </div> */}
                      </div>
                    </div>


                  </div>

                </>
              )
            })}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  <Pagination />
                  <ButtonPrimary loading>Show me more</ButtonPrimary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                {/* LOOP ITEMS */}

                <div className='activity'>

        
        <div className="explore-items-2-wrapper">
                <div className="container-fluid">
                    <div className="g-4 g-xl-5" >
                       

                        <div className='col-lg-12'>
                            <div className="activity-wrapper">
                                <div className="container">
                                    {/* Activity Table */}
                                    <div className="activity-table">

                                    <div>
            <p className='text'>Activity</p>
        </div>
                                        
                                      
                                            <>
                                                <BootstrapTable
                                                    keyField="id"
                                                    data={datas}
                                                    columns={columns}
                                                    pagination={pagination}
                                                    bootstrap4
                                                />

                                            </>
                                         
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </div>
               
              </Tab.Panel>
              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 lg:mt-10">
                  {/* {Array.from("1").map((_, index) => (
                    <CardAuthorBox3 following key={index} />
                  ))} */}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  <Pagination />
                  <ButtonPrimary loading>Show me more</ButtonPrimary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
                  {Array.from("11111111").map((_, index) => (
                    <CardAuthorBox3 following={false} key={index} />
                  ))}
                </div>

                {/* PAGINATION */}
                {/* <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  <Pagination />
                  <ButtonPrimary loading>Show me more</ButtonPrimary>
                </div> */}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </main>

        {/* === SECTION 5 === */}
        <div className="relative py-16 lg:py-28">
          <BackgroundSection />
          <SectionGridAuthorBox data={Array.from("11111111")} boxCard="box4" />
        </div>

        {/* SUBCRIBES */}
        <SectionBecomeAnAuthor />
      </div>
    </div>
  );
};

export default AuthorPage;
