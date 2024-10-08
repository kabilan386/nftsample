import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import NcModal from "shared/NcModal/NcModal";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import QrCodeImg from "images/qr-code.png";
import metamaskImg from "images/metamask.webp";
import walletconnectImg from "images/walletconnect.webp";
import walletlinkImg from "images/walletlink.webp";
import fortmaticImg from "images/fortmatic.webp";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { WalletLogin } from '../API/Login_api';
export interface PageConnectWalletProps {
  className?: string;
}

declare let window: any;

const plans = [
  {
    name: "Metamask",
    img: metamaskImg,
  }
  
];
const PageConnectWallet: FC<PageConnectWalletProps> = ({ className = "" }) => {
  const [showModal, setShowModal] = useState(false);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const ethereum = (window as any).ethereum;
  let navigate = useNavigate()
  const showToastMessage = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  // const networkVersion: string = (window as any).ethereum.request({
  //   method: "net_version",
  // });

  const [network, setNetwork] = useState("");

  useEffect(() => {
    // Check if MetaMask is installed
    if (!(window.ethereum && window.ethereum.isMetaMask)) {
      console.log("MetaMask is not installed");
      return;
    }

    // Retrieve the network ID
    window.ethereum
      .request({ method: "net_version" })
      .then((networkId) => {
        console.log(networkId, "network")
        // Map network ID to network name
        

        setNetwork(networkId);
      })
      .catch((error) => {
        console.log("Failed to retrieve network ID:", error);
      });
  }, []);
  console.log(network, "network")



 console.log(typeof(network), "network")
  
  //Does the User have an Ethereum wallet/account?
  async function connectWallet(): Promise<void> {
    //to get around type checking
    
    (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: string[]) => {
        console.log("networkVersion",(window as any).ethereum.networkVersion);
        if(network === "97") {
          if((window as any).ethereum.networkVersion === process.env.REACT_APP_BNB_CHAIN_ID_DECIMAL){
            WalletLogin({ address: accounts[0].toLowerCase() }).then((res: any) => {
              if (res.status === true) {
                console.log(res, "resData")
                // toast.success(`${res?.message}`)
                sessionStorage.setItem('address', accounts[0]);
                sessionStorage.setItem("token", res?.token)
                sessionStorage.setItem("user_id", res.user_id)
                sessionStorage.setItem('Connected', "true");
                setAccount(accounts[0]);
                navigate("/")
              }
            })
          } 
        } else if(network === "80001") {

          if((window as any).ethereum.networkVersion === process.env.REACT_APP_MATIC_CHAIN_ID_DECIMAL){
            WalletLogin({ address: accounts[0].toLowerCase() }).then((res: any) => {
              if (res.status === true) {
                console.log(res, "resData")
                // toast.success(`${res?.message}`)
                sessionStorage.setItem('address', accounts[0]);
                sessionStorage.setItem("token", res?.token)
                sessionStorage.setItem("user_id", res.user_id)
                sessionStorage.setItem('Connected', "true");
                setAccount(accounts[0]);
                navigate("/")
              }
            })
          }

        } else if(network === "11155111") {
          if((window as any).ethereum.networkVersion === process.env.REACT_APP_ETH_CHAIN_ID_DECIMAL){
            WalletLogin({ address: accounts[0].toLowerCase() }).then((res: any) => {
              if (res.status === true) {
                console.log(res, "resData")
                // toast.success(`${res?.message}`)
                sessionStorage.setItem('address', accounts[0]);
                sessionStorage.setItem("token", res?.token)
                sessionStorage.setItem("user_id", res.user_id)
                sessionStorage.setItem('Connected', "true");
                setAccount(accounts[0]);
                navigate("/")
              }
            })
          }
        }
        
      })
      .catch((error: any) => {
        showToastMessage(error.message);
      });
  }
  
  // ethereum.on('accountsChanged', (accounts: any) => {
  //   connectWallet();
  // });

  ethereum?.on('chainChanged', (chainId: any) => {
    if(process.env.REACT_APP_CHAIN_ID === chainId){
      sessionStorage.removeItem('address');
      sessionStorage.removeItem('Connected');
    }else{
      sessionStorage.removeItem('address');
      sessionStorage.removeItem('Connected');
    }
    console.log("chainChanged", chainId);
    window.location.reload();
  });
  useEffect(() => {
    if ((window as any).ethereum) {
      //check if Metamask wallet is installed
      setIsMetamaskInstalled(true);
    }
  }, []);
  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Scan to connect
        </h3>
        <span className="text-sm">
          Open Coinbase Wallet on your mobile phone and scan
        </span>

        <div className="p-5 border bg-white dark:bg-neutral-300 border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center justify-center mt-4">
          <NcImage className="w-40" src={QrCodeImg} />
        </div>

        <div className="mt-5 space-x-3">
          <ButtonPrimary type="submit">Install app</ButtonPrimary>
          <ButtonSecondary type="button">Cancel</ButtonSecondary>
        </div>
      </form>
    );
  };

  return (
    <div
      className={`nc-PageConnectWallet ${className}`}
      data-nc-id="PageConnectWallet"
    >
      <Helmet>
        <title>Connect Wallet || NFT React Template</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-3xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Connect your wallet.
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              Connect with one of our available wallet providers or create a new
              one.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => connectWallet()}
                  typeof="button"
                  tabIndex={0}
                  className="relative rounded-xl hover:shadow-lg hover:bg-neutral-50 border 
                border-neutral-200 dark:border-neutral-700 px-3 sm:px-5 py-4 cursor-pointer flex 
                focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 
                dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                >
                  <div className="flex items-center w-full">
                    <NcImage
                      src={plan.img}
                      containerClassName="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 p-2 sm:p-3 bg-white rounded-full overflow-hidden shadow-lg"
                    />
                    <div
                      className={`ml-4 sm:ml-8 font-semibold text-xl sm:text-2xl `}
                    >
                      {plan.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ---- */}
            <div className="pt-2 ">
              <ButtonPrimary href={"/"} className="flex-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 12H3.67004"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2">Go Back Home</span>
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>

      <NcModal
        renderTrigger={() => null}
        isOpenProp={showModal}
        renderContent={renderContent}
        contentExtraClass="max-w-md"
        onCloseModal={() => setShowModal(false)}
        modalTitle="Connect Wallet"
      />
    </div>
  );
};

export default PageConnectWallet;
