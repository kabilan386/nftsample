import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import NcImage from "shared/NcImage/NcImage";
import CardNFT from "components/CardNFT";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import collectionBanner from "images/nfts/collectionBanner.png";
import { nftsImgs } from "contains/fakeData";
import NftMoreDropdown from "components/NftMoreDropdown";
import ButtonDropDownShare from "components/ButtonDropDownShare";
import TabFilters from "components/TabFilters";
import SectionSliderCollections from "components/SectionSliderCollections";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import axios from "axios";
import ItemTypeVideoIcon from "../components/ItemTypeVideoIcon";
import ItemTypeImageIcon from "../components/ItemTypeImageIcon";
import LikeButton from "../components/LikeButton";
import Avatar from "shared/Avatar/Avatar";
import Prices from "../components/Prices";
import { ClockIcon } from "@heroicons/react/outline";
import { Link, useParams } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Web3 from "web3"
import { ToastContainer, toast } from 'react-toastify';



export interface PageCollectionProps {
  className?: string;
}

declare let window: any;





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

const PageCollection: FC<PageCollectionProps> = ({ className = "" }) => {

  const [collectionData, setCollectionData] = useState<any[]>([])
  const [specData, setSpecData] = useState<any[]>([])
  const [spinner, setSpinner] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const id = useParams();
  

  console.log(id, "idCollection")



  const getCollection = () => {
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?type=mycollection&collection_id=${id?.id}`, config).then(res => {
      setCollectionData(res?.data?.data?.docs)
      console.log(res, "res")
    })
  }

  const getSpecificCollection = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/collection/detail?collection_id=${id?.id}`).then(res => {
      setSpecData(res?.data?.result?.contract_address)
      console.log(res, "res")
    })

  }

  console.log(specData, "specData")

  useEffect(() => {

     getCollection()
     getSpecificCollection()

  }, [])


 

  console.log(collectionData, "collection")
 

  const marketClaim = async (id: any) => {
   
        try {
           
            await new Web3(window.web3.currentProvider);
            window.web3 = new Web3(window.web3.currentProvider);
           console.log("HI There")
            const accountResponse = await window.web3.eth.getAccounts();
           
            const instance = accountResponse[0];
            console.log(instance, "instance")
            
            const claimContract = await new window.web3.eth.Contract(JSON.parse(process.env.REACT_APP_MINT_ABI || '{}'), specData);

           console.log(claimContract, "claim")
           console.log(id, "mintID")
            try {
                const approve = await claimContract.methods.mint(1).send({ from: instance })
                if (approve) {

                  const postData = {
                    "item_id": id,
                    "token_id": approve?.events?.Transfer?.returnValues?.tokenId
                  }
                  const config = {
                    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
                  };

                  axios
                  .post(`${process.env.REACT_APP_BACKEND_URL}/item/publish`, postData, config)
                  .then((res) => {
                    console.log(res, "789")
          
                    if (res?.data?.status === true) {
                      toast.success(res?.data?.message)
                      setSpinner(false)
                    } else if (res?.data?.status === false) {
                      toast.error(res?.data?.message)
                      setSpinner(false)
                  }
                  })
                    setSpinner(false)
                }
            } catch (error: any) {
                if (error?.code === 4001) {
                    toast.warning(error.message)
                }
                setSpinner(false)
            }
        } catch (err: any) {

            if (err?.code === 4001) {
                toast.error("User Reject The Request");
                setSpinner(false)
            }
        }
    
}



  return (
    <div
      className={`nc-PageCollection  ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>Item || Ciscryp NFT Template</title>
      </Helmet>



      <div className="container py-10 lg:pb-28 lg:pt-10 space-y-20 lg:space-y-28">
        <main>
          <div className="flex justify-end">
           
          
          <ButtonPrimary
              sizeClass="px-4 py-2 sm:px-5"
              
              
            >
                <Link to={"/page-upload-item"} state={{ id: id?.id }}>
              Create Item
              </Link>
            </ButtonPrimary>
         

          </div>

          {/* LOOP ITEMS */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10  mt-8 lg:mt-10">

          { collectionData?.map((e: any ) => {
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

      
                              

        
        {Math.random() > 0.5 ? (
          <ItemTypeVideoIcon className="absolute top-3 left-3 !w-9 !h-9" />
        ) : (
          <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
        )}
          <div className="absolute top-3 right-3 !w-9 !h-9">
                                        <Dropdown>
                                            <Dropdown.Toggle className="rounded-pill shadow-sm" >
                                            <i className="fas fa-ellipsis-v"></i>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu align="end" >
                                                
                                                    <>
                                                        <Link key="index2" className="dropdown-item" to="/editItem">
                                                            EDIT
                                                        </Link>
                                                        <Link key="index3" className="dropdown-item" to="/delete">
                                                            DELETE

                                                        </Link>
                                                        <Link key="index6" className="dropdown-item" onClick={() => marketClaim(e?._id)} to={""} >
                                                            Mint
                                                        </Link>
                                                        <Link key="index6" className="dropdown-item" to={`/item`}  >
                                                            ITEM DETAILS
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
          {renderAvatars()}
          <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            01 in stock
          </span>
        </div>
        <h2 className={`text-lg font-medium`}>
          { e?.name } #{Math.floor(Math.random() * 1000) + 1000}
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
         }) }
          </div>
         
          

          {/* PAGINATION */}
          {/* <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div> */}
        </main>

        {/* === SECTION 5 === */}
        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections />
        </div>

        {/* SUBCRIBES */}
        <SectionBecomeAnAuthor />
      </div>
    </div>
  );
};

export default PageCollection;
