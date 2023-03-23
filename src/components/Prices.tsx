import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  contentClass?: string;
  labelTextClassName?: string;
  labelText?: string;
  price?: string;
  priceValue?: string;
}

const Prices: FC<PricesProps> = ({
  className = "pt-3",
  price = "0",
  contentClass = "py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold",
  labelTextClassName = "bg-white",
  priceValue = "0",
  labelText = Math.random() > 0.4 ? "Price" : "Price",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-baseline border-2 border-green-500 rounded-lg relative ${contentClass} `}
      >
        <span
          className={`block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 ${labelTextClassName}`}
        >
          {labelText}
        </span>
        <span className=" text-green-500 !leading-none">{priceValue}</span>
      </div>
    </div>
  );
};

export default Prices;
