import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import rightImgDemo from "images/rightLargeImg.png";
import rightLargeImgDark from "images/rightLargeImgDark.png";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Logo from "shared/Logo/Logo";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { toast } from "react-toastify"

export interface SectionBecomeAnAuthorProps {
  className?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
}) => {

  const navigate = useNavigate()

  const getToast = () => {
    if (!sessionStorage.getItem("token")) {
      toast.error("Please login your account")
      setTimeout(() => (window.location.href = "/connect-wallet"), 1500);
    } else {
      navigate("/page-upload-item")
    }
  }

  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-28" />
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
          Earn free crypto <br /> with Ciscrypt
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400 ">
          A creative agency that lead and inspire.
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <ButtonPrimary onClick={getToast} className="">
            Create item
          </ButtonPrimary>
          <ButtonSecondary href="/page-search" className="">
            Discover more
          </ButtonSecondary>
        </div>
      </div>
      <div className="flex-grow">
        <NcImage containerClassName="block dark:hidden" src={rightImgDemo} />
        <NcImage
          containerClassName="hidden dark:block"
          src={rightLargeImgDark}
        />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
