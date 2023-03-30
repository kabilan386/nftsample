import ButtonDropDownShare from "components/ButtonDropDownShare";
import NftMoreDropdown from "components/NftMoreDropdown";
import React from "react";

const LikeSaveBtns = ({ id, owner }) => {


console.log(id, owner, "itemID")


  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <ButtonDropDownShare panelMenusClass="!w-52" />
        {  sessionStorage?.getItem("user_id") !== owner ? <NftMoreDropdown itemId={id}/> : null  }
      </div>
    </div>
  );
};

export default LikeSaveBtns;
