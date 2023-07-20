import React, { FC, CSSProperties, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import { BeatLoader } from "react-spinners";
import LikeSaveBtns from "./LikeSaveBtns";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import VerifyIcon from "components/VerifyIcon";
import { nftsLargeImgs, personNames } from "contains/fakeData";
import TimeCountDown from "./TimeCountDown";
import TabDetail from "./TabDetail";
import collectionPng from "images/nfts/collection.png";
import ItemTypeVideoIcon from "components/ItemTypeVideoIcon";
import LikeButton from "components/LikeButton";
import { useParams } from "react-router-dom";
import AccordionInfo from "./AccordionInfo";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import axios from "axios";
import { Form } from "react-bootstrap";
import Web3 from "web3";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal';


import { toast } from "react-toastify";
import { string } from "yup";

declare let window: any;

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

// declare namespace NodeJS {
//   interface ProcessEnv {
//     REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS: string;
//     // add more environment variables here
//   }
// }

export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const NftDetailPage: FC<NftDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {

  const id = useParams()
  const [getitemDetails, setGetDetails] = useState([])
  const [itemName, setItemName] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [collectionImage, setCollectionimage] = useState('');
  const [currentOwner, setCurrentOwner] = useState('');
  const [itemLink, setItemLink] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemId, setItemId] = useState('');
  const [color, setColor] = useState("#0000FF");
  const [itemCount, setItemCount] = useState();
  const [itemPrice, setItemPrice] = useState('');
  const [itemContract, setItemContract] = useState("")
  const [currentBid, setCurrentBid] = useState('');
  const [chainName, setChainName] = useState<any>({});
  const [chainNetwork, setChainNetwork] = useState<any>("")
  const [chainId, setChainId] = useState<any>("")
  const [loading, setLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [placeBid, setPlaceBid] = useState();
  const [adminCommistion, setAdminCommistion] = useState("")
  const [autherState, setAutherState] = useState("")
  const [royaltiesVal, setRoyalities] = useState("")
  const [toAddressVal, setToAddress] = useState("")
  const [offerVal, setOfferValue] = useState("")
  const [token_id, setToken_id] = useState("")
  const [item_Bid, setItemBid] = useState("")
  const [enable_auction, setEnableAuction] = useState()
  const [enable_Bid, setEnableBid] = useState()
  const [bidTime, setTimeBid] = useState("")
  const [auctionStatus, setAutionStatus] = useState<any>("")


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showBid, setShowBid] = useState(false);

  const handleCloseBid = () => setShowBid(false);
  const handleShowBid = () => setShowBid(true);

  const getItem = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?type=view&item_id=${id?.id}`).then(res => {

      setItemName(res?.data?.data?.docs?.[0]?.name)
      setItemDescription(res?.data?.data?.docs?.[0]?.description)
      setItemLink(res?.data?.data?.docs?.[0]?.external_link)
      setItemImage(res?.data?.data?.docs?.[0]?.media)
      setItemPrice(res?.data?.data?.docs?.[0]?.price)
      setCurrentBid(res?.data?.data?.docs?.[0]?.endDateTime)
      setItemContract(res?.data?.data?.docs?.[0]?.collection_id?.contract_address)
      setCollectionName(res?.data?.data?.docs?.[0]?.collection_id?.name)
      setChainId(res?.data?.data?.docs?.[0]?.collection_id?.chain)
      setCollectionimage(res?.data?.data?.docs?.[0]?.collection_id?.image)
      setItemId(res?.data?.data?.docs?.[0]?._id)
      setItemCount(res?.data?.data?.docs?.[0]?.like_count)
      setPlaceBid(res?.data?.data?.docs?.[0]?.enableBID)
      setCurrentOwner(res?.data?.data?.docs?.[0]?.current_owner?._id)
      setCurrentAddress(res?.data?.data?.docs?.[0]?.current_owner?.address)
      setToAddress(res?.data?.data?.docs?.[0]?.current_owner?.metamask_info?.id)
      setAutherState(res?.data?.data?.docs[0]?.author_id?.metamask_info?.id)
      setRoyalities(res?.data?.data?.docs?.[0]?.collection_id?.royalties)
      setToken_id(res?.data?.data?.docs?.[0]?.token_id)
      setEnableBid(res?.data?.data?.docs?.[0]?.enableBID)
      setEnableAuction(res?.data?.data?.docs?.[0]?.enableAuction)
      setTimeBid(res?.data?.data?.docs?.[0]?.endDateTimeBID)




    })
  }

  console.log(collectionPng, "fixed")

  console.log(itemId, currentOwner, "name")

  useEffect(() => {

    getItem()
    getOfferData()

  }, [])

  useEffect(() => {

    getCommission()
   //  getBid()

  }, [adminCommistion])



  const getCommission = () => {

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };



    axios.get(`${process.env.REACT_APP_BACKEND_URL}/settings/getoptions?name=admin_commission`, config).then(res => {
      setAdminCommistion(res?.data?.result?.value)
      console.log(res, "res")
    })
  }


  //settings/getoptions?name=admin_commission

  const AddOffer = () => {

    if (sessionStorage.getItem("token") === null) {
      toast.error("Please connect Wallet")
      return false;
    }

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };


    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/item/addoffer`, {
        "item_id": itemId,
        "price": offerVal
      }, config)
      .then((res) => {
        console.log(res, "789")
        if (res.data.status == true) {

          toast.success(res.data.message)
          setTimeout(() => (window.location.href = `/nft-detailt/${itemId}`), 1500);

        } else {
          toast.error(res.data.message)
          // setTimeout(() => {
          //   setLoading(false)
          // }, 1000);
        }

      })

  }

  const AddBid = () => {

    if (sessionStorage.getItem("token") === null) {
      toast.error("Please connect Wallet")
      return false;
    }

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };


    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/item/make-bid`, {
        "item_id": itemId,
        "price": item_Bid
      }, config)
      .then((res) => {
        console.log(res, "789")
        if (res.data.status == true) {

          toast.success(res.data.message)
          setTimeout(() => (window.location.href = `/nft-detailt/${itemId}`), 1500);

        } else {
          toast.error(res.data.message)
          // setTimeout(() => {
          //   setLoading(false)
          // }, 1000);
        }

      })

  }

  const handleCallBack = (e) => {
    setAutionStatus(e)
  }

  console.log(typeof(auctionStatus), "aution")

 

  





  console.log(currentOwner === sessionStorage.getItem("user_id"), "value")

  const buyFunctionForauction = async (data, price) => {

    console.log("Hii There")

    console.log(data, price, currentAddress, 'error')


    if (!sessionStorage.getItem("token")) {
      toast.error("Please connect your wallet")
      setTimeout(() => (window.location.href = "/connet-wallet"), 1500);
    } else {

      setLoading(true)

      const requestData = {
        id: chainId
      };
  
      const chainData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chain/getSingleChain`, requestData)
      
      setChainName(chainData?.data?.data || null)
  
     
  
      console.log(chainName?.chainID === "80001", "chain");
      let networkSwitched = true;

      console.log(chainData, chainName, window.ethereum.chainId, "Testing" )

      if (window.ethereum) {
        const networkId = await window.ethereum.request({ method: 'net_version' });
        console.log(networkId, "network");
        setChainNetwork(networkId);
      }
  
      if (chainData && chainData?.data?.data?.chainID === '97') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }]
          });
          console.log("Hii There");
        } catch (err: any) {
          setLoading(false)
          if (err.code === 4001) {
            console.log("User rejected the request to switch or add Ethereum");
            networkSwitched = false;
            toast.warning(err.message)
            throw new Error("User rejected the request to switch or add Ethereum");
          }

          if(err.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x61',
                    chainName: 'Binance Smart Chain Testnet',
                    nativeCurrency: {
                      name: 'BNB',
                      symbol: 'BNB',
                      decimals: 18,
                    },
                    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                    blockExplorerUrls: ['https://testnet.bscscan.com'],
                  },
                ],
              });
            } catch (err: any) {
              setLoading(false)
              if (err.code === 4001) {
                console.log("User rejected the request to switch or add Ethereum");
                networkSwitched = false;
                toast.warning(err.message)
                throw new Error("User rejected the request to switch or add Ethereum");
              }
              throw err;
            }
          }
          throw err;
        }
      } else if ( chainData && chainData?.data?.data?.chainID === '80001') {

        try {

          console.log("Hi Matic Two");
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }]
          })
          
        } catch (err: any) {
          setLoading(false)
          if (err.code === 4001) {
            console.log("User rejected the request to switch or add Ethereum");
            networkSwitched = false;
            toast.warning(err.message)
            throw new Error("User rejected the request to switch or add Ethereum");
          }

          if(err.code === 4902) {
            try {
              console.log("Hi Matic");
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x13881',
                    chainName: 'Mumbai Testnet',
                    nativeCurrency: {
                      name: 'MATIC',
                      symbol: 'MATIC',
                      decimals: 18,
                    },
                    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
                  },
                ],
              });
            } catch (err: any) {
              setLoading(false)
              if (err.code === 4001) {
                console.log("User rejected the request to switch or add Ethereum");
                networkSwitched = false;
                toast.warning(err.message)
                throw new Error("User rejected the request to switch or add Ethereum");
              }
              throw err;
            }
          }
          throw err;
        }
        console.log(window.ethereum.chainId !== '80001', "wallet");
       
      } else if (chainData && chainData?.data?.data?.chainID === '11155111') {
        console.log("Hi There Three");
  
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }]
          });
          console.log("Hi There");
          console.log("Hii There");
        } catch (err: any) {
          setLoading(false)
          if (err.code === 4001) {
            console.log("User rejected the request to switch or add Ethereum");
            toast.warning(err.message)
            throw new Error("User rejected the request to switch or add Ethereum");
          }
          // This error code indicates that the chain has not been added to MetaMask.
          if (err.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0xaa36a7',
                    chainName: 'Sepolia',
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                    rpcUrls: ['https://rpc.sepolia.org'],
                    blockExplorerUrls: ['https://sepolia.etherscan.io'],
                  },
                ],
              });
            } catch (addError) {
              setLoading(false)
              // handle "add" error
            }
          }
          throw err;
        }
      }


      const params = {
        from: window.ethereum.selectedAddress,
        to: currentAddress,
        value: Number((price * Math.pow(10, 18))).toString(),
        gasPrice: '20000000000'
      };
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      if(chainData && chainData?.data?.data?.chainID === '11155111') {
        let contractAddress = process.env.REACT_APP_SEPHOLIA_MULTI_SEND_CONTRACT_ADDRESS;

        let factoryabi = JSON.parse(process.env.REACT_APP_MULTI_SEND_CONTRACT_ADDRESS_ABI || '{}')
      let instance = new window.web3.eth.Contract(factoryabi, contractAddress);
      let platformcommision = adminCommistion != null ? Number(adminCommistion) : 0;
      let royaltiesCommission = data?.data?.data?.docs?.[0]?.collection_id?.royalties ? data?.data?.data?.docs?.[0]?.collection_id?.royalties : 0;
      let platformprice = price * platformcommision / 100;
      let royalties = price * royaltiesCommission / 100;
      let totalCommission = Number(platformcommision) + Number(royaltiesCommission);
      let balancePrice = price * ((100 - totalCommission) / 100);
      let recipients: string[] = [];
      let amounts: number[] = [];

      // const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
      // console.log(address, "address")
      // if (address) {
      //   console.log("Address")

      // }
      console.log(currentAddress, currentAddress, "sample")
      const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
      console.log(address, "address")
      if (address) {
        recipients.push(address);
      }
      console.log(currentAddress, currentAddress, "sample")
      console.log("test")
      recipients.push(currentAddress);
      recipients.push(currentAddress);
      amounts.push(Math.floor(platformprice * Math.pow(10, 18)));
      amounts.push(Math.floor(royalties * Math.pow(10, 18)));
      amounts.push(Math.floor(balancePrice * Math.pow(10, 18)));
      console.log("test")
      console.log(recipients, amounts, "test")

 

        instance.methods.sendNFT(recipients, amounts).send(params).then((res: any) => {
          if (res.status) {
            console.log("test")

            const config = {
              headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
            };


            axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/item/purchase`, { "item_id": itemId, "price": price }, config)
              .then((res) => {
                console.log(res, "789")
                if (res.data.status == true) {
                  //  setLoading(false)
                  toast.success(res.data.message)
                  setTimeout(() => (window.location.href = "/page-search"), 1500);

                } else {
                  setLoading(false)
                  toast.error(res.data.message)
                  // setTimeout(() => {
                  //   setLoading(false)
                  // }, 1000);
                }
              })

          }
        }).catch((err: any) => {  if(err.code === 4001) { toast.warning(err.message)}});
      } else if(chainData && chainData?.data?.data?.chainID === '97') {
        let contractAddress = process.env.REACT_APP_MULTI_SEND_CONTRACT_ADDRESS;

        let factoryabi = JSON.parse(process.env.REACT_APP_MULTI_SEND_CONTRACT_ADDRESS_ABI || '{}')
      let instance = new window.web3.eth.Contract(factoryabi, contractAddress);
      let platformcommision = adminCommistion != null ? Number(adminCommistion) : 0;
      let royaltiesCommission = data?.data?.data?.docs?.[0]?.collection_id?.royalties ? data?.data?.data?.docs?.[0]?.collection_id?.royalties : 0;
      let platformprice = price * platformcommision / 100;
      let royalties = price * royaltiesCommission / 100;
      let totalCommission = Number(platformcommision) + Number(royaltiesCommission);
      let balancePrice = price * ((100 - totalCommission) / 100);
      let recipients: string[] = [];
      let amounts: number[] = [];

      // const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
      // console.log(address, "address")
      // if (address) {
      //   console.log("Address")

      // }
      console.log(currentAddress, currentAddress, "sample")
      const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
      console.log(address, "address")
      if (address) {
        recipients.push(address);
      }
      console.log(currentAddress, currentAddress, "sample")
      console.log("test")
      recipients.push(currentAddress);
      recipients.push(currentAddress);
      amounts.push(Math.floor(platformprice * Math.pow(10, 18)));
      amounts.push(Math.floor(royalties * Math.pow(10, 18)));
      amounts.push(Math.floor(balancePrice * Math.pow(10, 18)));
      console.log("test")
      console.log(recipients, amounts, "test")

 

        instance.methods.sendNFT(recipients, amounts).send(params).then((res: any) => {
          if (res.status) {
            console.log("test")

            const config = {
              headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
            };


            axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/item/purchase`, { "item_id": itemId, "price": price }, config)
              .then((res) => {
                console.log(res, "789")
                if (res.data.status == true) {
                  //  setLoading(false)
                  toast.success(res.data.message)
                  setTimeout(() => (window.location.href = "/page-search"), 1500);

                } else {
                  setLoading(false)
                  toast.error(res.data.message)
                  // setTimeout(() => {
                  //   setLoading(false)
                  // }, 1000);
                }
              })

          }
        }).catch((err: any) => {  if(err.code === 4001) { toast.warning(err.message)}});
      } else if(chainData && chainData?.data?.data?.chainID === '80001') {
        let contractAddress = process.env.REACT_APP_MATIC_MULTI_SEND_CONTRACT_ADDRESS;

        let factoryabi = JSON.parse(process.env.REACT_APP_MULTI_SEND_CONTRACT_ADDRESS_ABI || '{}')
      let instance = new window.web3.eth.Contract(factoryabi, contractAddress);
      let platformcommision = adminCommistion != null ? Number(adminCommistion) : 0;
      let royaltiesCommission = data?.data?.data?.docs?.[0]?.collection_id?.royalties ? data?.data?.data?.docs?.[0]?.collection_id?.royalties : 0;
      let platformprice = price * platformcommision / 100;
      let royalties = price * royaltiesCommission / 100;
      let totalCommission = Number(platformcommision) + Number(royaltiesCommission);
      let balancePrice = price * ((100 - totalCommission) / 100);
      let recipients: string[] = [];
      let amounts: number[] = [];

      // const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
      // console.log(address, "address")
      // if (address) {
      //   console.log("Address")

      // }
      console.log(currentAddress, currentAddress, "sample")
      const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
      console.log(address, "address")
      if (address) {
        recipients.push(address);
      }
      console.log(currentAddress, currentAddress, "sample")
      console.log("test")
      recipients.push(currentAddress);
      recipients.push(currentAddress);
      amounts.push(Math.floor(platformprice * Math.pow(10, 18)));
      amounts.push(Math.floor(royalties * Math.pow(10, 18)));
      amounts.push(Math.floor(balancePrice * Math.pow(10, 18)));
      console.log("test")
      console.log(recipients, amounts, "test")

 

        instance.methods.sendNFT(recipients, amounts).send(params).then((res: any) => {
          if (res.status) {
            console.log("test")

            const config = {
              headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
            };


            axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/item/purchase`, { "item_id": itemId, "price": price }, config)
              .then((res) => {
                console.log(res, "789")
                if (res.data.status == true) {
                  //  setLoading(false)
                  toast.success(res.data.message)
                  setTimeout(() => (window.location.href = "/page-search"), 1500);

                } else {
                  setLoading(false)
                  toast.error(res.data.message)
                  // setTimeout(() => {
                  //   setLoading(false)
                  // }, 1000);
                }
              })

          }
        }).catch((err: any) => { setLoading(false);  if(err.code === 4001) { toast.warning(err.message)}});
      }
      

   
    }
  }



  console.log(chainName, "chain")



  const getOfferData = async () => {

    const requestData = {
      id: chainId
    };

    const chainData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chain/getSingleChain`, requestData)
      
    setChainName(chainData?.data?.data || null)

  }



  const buyFunction = async () => {

    if (!sessionStorage.getItem("token")) {
      toast.error("Please login your account")
      setTimeout(() => (window.location.href = "/connect-wallet"), 1500);
    }

    
    // else if (!active) {
    //   toast.error("Please connect your wallet")
    //   setTimeout(() => (window.location.href = "/connet-wallet"), 1500);
    // }
    else {

      setLoading(true)

      console.log("HII There")

      const requestData = {
        id: chainId
      };
  
      const chainData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chain/getSingleChain`, requestData)
      
      setChainName(chainData?.data?.data || null)
  
     
  
      console.log(chainName?.chainID === "80001", "chain");
      let networkSwitched = true;

      console.log(chainData, chainName, window.ethereum.chainId, "Testing" )

      if (window.ethereum) {
        const networkId = await window.ethereum.request({ method: 'net_version' });
        console.log(networkId, "network");
        setChainNetwork(networkId);
      }
  
      if (chainData && chainData?.data?.data?.chainID === '97') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }]
          });
          console.log("Hii There");
        } catch (err: any) {
          setLoading(false)
          if (err.code === 4001) {
            
            console.log("User rejected the request to switch or add Ethereum");
            networkSwitched = false;
            toast.warning(err.message)
            throw new Error("User rejected the request to switch or add Ethereum");
          }

          if(err.code === 4902) {
            
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x61',
                    chainName: 'Binance Smart Chain Testnet',
                    nativeCurrency: {
                      name: 'BNB',
                      symbol: 'BNB',
                      decimals: 18,
                    },
                    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                    blockExplorerUrls: ['https://testnet.bscscan.com'],
                  },
                ],
              });
            } catch (err: any) {
              setLoading(false)
              if (err.code === 4001) {
                console.log("User rejected the request to switch or add Ethereum");
                networkSwitched = false;
                toast.warning(err.message)
                throw new Error("User rejected the request to switch or add Ethereum");
              }
              throw err;
            }
          }
          throw err;
        }
      } else if ( chainData && chainData?.data?.data?.chainID === '80001') {

        try {

          console.log("Hi Matic Two");
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }]
          })
          
        } catch (err: any) {
          setLoading(false)
          if (err.code === 4001) {
            console.log("User rejected the request to switch or add Ethereum");
            networkSwitched = false;
            toast.warning(err.message)
            throw new Error("User rejected the request to switch or add Ethereum");
          }

          if(err.code === 4902) {
            try {
              console.log("Hi Matic");
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x13881',
                    chainName: 'Mumbai Testnet',
                    nativeCurrency: {
                      name: 'MATIC',
                      symbol: 'MATIC',
                      decimals: 18,
                    },
                    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
                  },
                ],
              });
            } catch (err: any) {
              setLoading(false)
              if (err.code === 4001) {
                console.log("User rejected the request to switch or add Ethereum");
                networkSwitched = false;
                toast.warning(err.message)
                throw new Error("User rejected the request to switch or add Ethereum");
              }
              throw err;
            }
          }
          throw err;
        }
        console.log(window.ethereum.chainId !== '80001', "wallet");
       
      } else if (chainData && chainData?.data?.data?.chainID === '11155111') {
        console.log("Hi There Three");
  
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }]
          });
          console.log("Hi There");
          console.log("Hii There");
        } catch (err: any) {
          setLoading(false)
          if (err.code === 4001) {
            console.log("User rejected the request to switch or add Ethereum");
            toast.warning(err.message)
            throw new Error("User rejected the request to switch or add Ethereum");
          }
          // This error code indicates that the chain has not been added to MetaMask.
          if (err.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0xaa36a7',
                    chainName: 'Sepolia',
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                    rpcUrls: ['https://rpc.sepolia.org'],
                    blockExplorerUrls: ['https://sepolia.etherscan.io'],
                  },
                ],
              });
            } catch (addError) {
              setLoading(false)
              // handle "add" error
            }
          }
          throw err;
        }
      }

      // let toAddress = currentAddress;
      let price = Number(itemPrice);

      const params = {
        from: window.ethereum.selectedAddress,
        to: currentAddress,
        value: (price * Math.pow(10, 18)).toString(),
        gasPrice: '20000000000'
      };

      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      if(chainData && chainData?.data?.data?.chainID === '11155111') {
        let contractAddress = process.env.REACT_APP_SEPHOLIA_MULTI_SEND_CONTRACT_ADDRESS;
          let factoryabi = JSON.parse(process.env.REACT_APP_MULTI_SEND_CONTRACT_ADDRESS_ABI || '{}')

      console.log("test")
      let instance = new window.web3.eth.Contract(factoryabi, contractAddress);
      let platformcommision = adminCommistion != null ? Number(adminCommistion) : 0;
      let royaltiesCommission = royaltiesVal ? Number(royaltiesVal) : 0;
      let platformprice = price * platformcommision / 100;
      let royalties = price * royaltiesCommission / 100;
      let totalCommission = Number(platformcommision) + Number(royaltiesCommission);
      let balancePrice = price * ((100 - totalCommission) / 100);
      let recipients: string[] = [];;
      let amounts: number[] = [];


      console.log(currentAddress, currentAddress, "sample")
      const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
      console.log(address, "address")
      if (address) {
        recipients.push(address);
      }
      
      recipients.push(currentAddress);
      recipients.push(currentAddress);

      amounts.push(Math.floor(platformprice * Math.pow(10, 18)));
      amounts.push(Math.floor(royalties * Math.pow(10, 18)));
      amounts.push(Math.floor(balancePrice * Math.pow(10, 18)));
      // setSpinner(true)

      console.log("test")
   
        instance.methods.sendNFT(recipients, amounts).send(params).then((res: any) => {
          if (res.status) {
            // item/purchase
            const config = {
              headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
            };


            axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/item/purchase`, { "item_id": itemId }, config)
              .then((res) => {
                console.log(res, "789")
                if (res.data.status == true) {
                  //  setLoading(false)
                  toast.success(res.data.message)
                  setTimeout(() => (window.location.href = "/page-search"), 1500);

                } else {
                  setLoading(false)
                  toast.error(res.data.message)
                  // setTimeout(() => {
                  //   setLoading(false)
                  // }, 1000);
                }
              })

          }
        }).catch((err: any) => {setLoading(false); if(err.code === 4001) { toast.warning(err.message) } });
      } else if(chainData && chainData?.data?.data?.chainID === '97') {
        let contractAddress = process.env.REACT_APP_MULTI_SEND_CONTRACT_ADDRESS;

        let factoryabi = JSON.parse(process.env.REACT_APP_MULTI_SEND_CONTRACT_ADDRESS_ABI || '{}')

        console.log("test")
        let instance = new window.web3.eth.Contract(factoryabi, contractAddress);
        let platformcommision = adminCommistion != null ? Number(adminCommistion) : 0;
        let royaltiesCommission = royaltiesVal ? Number(royaltiesVal) : 0;
        let platformprice = price * platformcommision / 100;
        let royalties = price * royaltiesCommission / 100;
        let totalCommission = Number(platformcommision) + Number(royaltiesCommission);
        let balancePrice = price * ((100 - totalCommission) / 100);
        let recipients: string[] = [];;
        let amounts: number[] = [];
  
  
        console.log(currentAddress, currentAddress, "sample")
        const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
        console.log(address, "address")
        if (address) {
          recipients.push(address);
        }
        
        recipients.push(currentAddress);
        recipients.push(currentAddress);
  
        amounts.push(Math.floor(platformprice * Math.pow(10, 18)));
        amounts.push(Math.floor(royalties * Math.pow(10, 18)));
        amounts.push(Math.floor(balancePrice * Math.pow(10, 18)));
        // setSpinner(true)
  
        console.log("test")
     
          instance.methods.sendNFT(recipients, amounts).send(params).then((res: any) => {
            if (res.status) {
              // item/purchase
              const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
              };
  
  
              axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/item/purchase`, { "item_id": itemId }, config)
                .then((res) => {
                  console.log(res, "789")
                  if (res.data.status == true) {
                    //  setLoading(false)
                    toast.success(res.data.message)
                      setTimeout(() => (window.location.href = "/collection"), 1500);
  
                  } else {
                    setLoading(false)
                    toast.error(res.data.message)
                    // setTimeout(() => {
                    //   setLoading(false)
                    // }, 1000);
                  }
                })
  
            }
          }).catch((err: any) => {setLoading(false); if(err.code === 4001) { toast.warning(err.message) } });
      } else if(chainData && chainData?.data?.data?.chainID === '80001') {
        let contractAddress = process.env.REACT_APP_MATIC_MULTI_SEND_CONTRACT_ADDRESS;

        let factoryabi = JSON.parse(process.env.REACT_APP_MULTI_SEND_CONTRACT_ADDRESS_ABI || '{}')

        console.log("test")
        let instance = new window.web3.eth.Contract(factoryabi, contractAddress);
        let platformcommision = adminCommistion != null ? Number(adminCommistion) : 0;
        let royaltiesCommission = royaltiesVal ? Number(royaltiesVal) : 0;
        let platformprice = price * platformcommision / 100;
        let royalties = price * royaltiesCommission / 100;
        let totalCommission = Number(platformcommision) + Number(royaltiesCommission);
        let balancePrice = price * ((100 - totalCommission) / 100);
        let recipients: string[] = [];;
        let amounts: number[] = [];
  
  
        console.log(currentAddress, currentAddress, "sample")
        const address = process.env.REACT_APP_BSC_CHAIN_TESTNET_PLATFORMADDRESS;
        console.log(address, "address")
        if (address) {
          recipients.push(address);
        }
        
        recipients.push(currentAddress);
        recipients.push(currentAddress);
  
        amounts.push(Math.floor(platformprice * Math.pow(10, 18)));
        amounts.push(Math.floor(royalties * Math.pow(10, 18)));
        amounts.push(Math.floor(balancePrice * Math.pow(10, 18)));
        // setSpinner(true)
  
        console.log("test")
     
          instance.methods.sendNFT(recipients, amounts).send(params).then((res: any) => {
            if (res.status) {
              // item/purchase
              const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
              };
  
  
              axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/item/purchase`, { "item_id": itemId }, config)
                .then((res) => {
                  console.log(res, "789")
                  if (res.data.status == true) {
                    // setLoading(false)
                    toast.success(res.data.message)
                    setTimeout(() => (window.location.href = "/collection"), 1500);
  
                  } else {
                    setLoading(false)
                    toast.error(res.data.message)
                    // setTimeout(() => {
                    //   setLoading(false)
                    // }, 1000);
                  }
                })
  
            }
          }).catch((err: any) => {setLoading(false); if(err.code === 4001) { toast.warning(err.message) } });
      }
    
      
    }


  }








  const renderSection1 = () => {


    return (
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* ---------- 1 ----------  */}
        <div className="pb-9 space-y-5">
          <div className="flex justify-between items-center">
            <Badge name="Virtual Worlds" color="green" />
            {/* <LikeSaveBtns id={itemId} owner={currentOwner} /> */}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {itemName}
          </h2>

          {/* ---------- 4 ----------  */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
            <div className="flex items-center ">
              <Avatar sizeClass="h-9 w-9" radius="rounded-full" />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Current Owner</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span className="currentAddress">{currentAddress}</span>
                  <VerifyIcon iconClass="w-4 h-4" />
                </span>
              </span>
            </div>
            <div className="hidden sm:block h-6 border-l border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex items-center">
              <Avatar
                imgUrl={`${process.env.REACT_APP_BACKEND_URL}${collectionImage}`}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Collection</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{collectionName}</span>
                  <VerifyIcon iconClass="w-4 h-4" />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------- 6 ----------  */}
        { (enable_Bid === false) && (enable_auction === false) ? <></> : <div className="py-9">
          <TimeCountDown time={currentBid} enableBid={enable_Bid} bidTime={bidTime} />
        </div> }

        {/* ---------- 7 ----------  */}
        {/* PRICE */}
        <div className="pb-9 pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
              <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                Current Bid
              </span>
              <span className="text-3xl xl:text-4xl font-semibold text-green-500">
                {itemPrice}
              </span>
            </div>

            <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-5 mt-2 sm:mt-0 sm:ml-10">
              [96 in stock]
            </span>
          </div>

         {auctionStatus === "accepted" ? <></> :  <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            {placeBid !== true ?
              <>
                {currentOwner === sessionStorage.getItem("user_id") ? null :
                  <ButtonPrimary onClick={() => buyFunction()} className="flex-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 12H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="ml-2.5">BUY NOW</span>
                  </ButtonPrimary>
                  }
              </> : <>  
              {
currentOwner === sessionStorage.getItem("user_id") ? null : 
<ButtonPrimary onClick={handleShowBid} className="flex-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 12H14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2.5">Place a bid</span>
              </ButtonPrimary>} </>}
            {placeBid !== true ?
              <>
                {currentOwner === sessionStorage.getItem("user_id") ? null : 
                <>{ (enable_Bid === false) && (enable_auction === false) ? <></> : 
                <ButtonSecondary onClick={handleShow} className="flex-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8.57007 15.27L15.11 8.72998"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.98001 10.3699C9.65932 10.3699 10.21 9.81923 10.21 9.13992C10.21 8.46061 9.65932 7.90991 8.98001 7.90991C8.3007 7.90991 7.75 8.46061 7.75 9.13992C7.75 9.81923 8.3007 10.3699 8.98001 10.3699Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.52 16.0899C16.1993 16.0899 16.75 15.5392 16.75 14.8599C16.75 14.1806 16.1993 13.6299 15.52 13.6299C14.8407 13.6299 14.29 14.1806 14.29 14.8599C14.29 15.5392 14.8407 16.0899 15.52 16.0899Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="ml-2.5"> Make offer</span>
                </ButtonSecondary> }
                </>}
              </> : null}
          </div>}
        </div>

        {/* ---------- 9 ----------  */}
        <div className="pt-9">
          <TabDetail auction={handleCallBack} current={currentOwner} buyFunctionForauction={buyFunctionForauction} bid={enable_Bid} bidTimer={bidTime} />
        </div>
      </div>
    );
  };



  return (
<>
{ !loading ?  
    <div
    className={`nc-NftDetailPage  ${className}`}
    data-nc-id="NftDetailPage"
  >
    {/* MAIn */}
    <main className="container mt-11 flex ">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
        {/* CONTENT */}
        <div className="space-y-8 lg:space-y-10">
          {/* HEADING */}
          <div className="relative">
            <NcImage
              src={`${process.env.REACT_APP_BACKEND_URL}/${itemImage}`}
              containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
            />
            {/* META TYPE */}
            <ItemTypeVideoIcon className="absolute left-3 top-3  w-8 h-8 md:w-10 md:h-10" />

            {/* META FAVORITES */}
            <LikeButton className="absolute right-3 top-3" id={itemId} likeCount={itemCount} />
          </div>

          <AccordionInfo details={itemDescription} contract={itemContract} token_id={token_id} />
        </div>

        {/* SIDEBAR */}
        <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
          {renderSection1()}
        </div>
      </div>
    </main>

    {/* OTHER SECTION */}
    {!isPreviewMode && (
      <div className="container py-24 lg:py-32">
        {/* SECTION 1 */}
        <div className="relative py-24 lg:py-28">
          <BackgroundSection />
          <SectionSliderCategories />
        </div>

        {/* SECTION */}
        <SectionBecomeAnAuthor className="pt-24 lg:pt-32" />
      </div>
    )}

    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Enter your Price IN {chainName?.chainSymbol} </p>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
              }}
              noValidate
              autoComplete="off"
            >

              <TextField id="filled-basic" label="Enter Your Offer" variant="filled" onChange={(e) => setOfferValue(e.target.value)} />

            </Box>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={() => AddOffer()}>Add Offer</Button>
        </Modal.Footer>
      </Modal>
    </>

    <>


<Modal show={showBid} onHide={handleCloseBid}>
<Modal.Header closeButton>
  <Modal.Title>Make Bid</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div>
    <p>Enter your Price IN { chainName?.chainSymbol }</p>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <TextField id="filled-basic" label="Enter Your Bid Amount" variant="filled" onChange={(e) => setItemBid(e.target.value)} />

    </Box>
  </div>
</Modal.Body>
<Modal.Footer>
  <Button variant="contained" onClick={() => AddBid()}>Add Bid</Button>
</Modal.Footer>
</Modal>
</>


  </div> :   
  <div style={{ display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "50vh" }}>
  <BeatLoader
  color="#3a9fbf"
  size={25}
/></div> 
}
</>
  );
};

export default NftDetailPage;
