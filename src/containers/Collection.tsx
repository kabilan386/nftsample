import React, { FC } from "react";
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

export interface PageCollectionProps {
  className?: string;
}

const PageCollection: FC<PageCollectionProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageCollection  ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>Collection || Ciscryp NFT Template</title>
      </Helmet>



      <div className="container py-10 lg:pb-28 lg:pt-10 space-y-20 lg:space-y-28">
        <main>
          <div className="flex justify-end">
            <ButtonPrimary
              href="/create-collection"
              sizeClass="px-4 py-2 sm:px-5"
            >
              Create Collection
            </ButtonPrimary>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10  mt-8 lg:mt-10">
            {Array.from("11111111").map((_, index) => (
              <CardNFT key={index} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
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
