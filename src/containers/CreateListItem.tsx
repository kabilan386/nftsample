import React, { useState, useEffect, FC, CSSProperties, useRef, MutableRefObject } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import Web3 from "web3";
import { useFormik, useFormikContext } from 'formik';
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import Form from 'react-bootstrap/Form';

import Select from 'react-select';
import moment from "moment"
import { RadioGroup } from "@headlessui/react";

declare let window: any;

interface data {
  collection_id: String

}

export interface PageUploadItemProps {
  className?: string;
}

interface timeOptions {
  value: "string"
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

interface Option {
  label: string;
  value: string;
}

const timeOptions = [
  { value: '', label: '----' },
  { value: '1D', label: '1 Day' },
  { value: '3D', label: '3 Days' },
  { value: '7D', label: '7 Days' },
  { value: '1M', label: '1 Month' },
  { value: '3M', label: '3 Month' },
  { value: '6M', label: '6 Month' },

]





const CreateListItem: FC<PageUploadItemProps> = ({ className = "" }) => {
  const [categorystate, setCategorystate] = useState([]);
  const [formValues, setFormValues] = useState([])
  const [formValuesforLevel, setFormValuesforLevel] = useState([])
  const [formValuesforStats, setFormValuesforStats] = useState([])
  const [propertiesValues, setpropertiesValues] = useState([])
  const [levelValues, setlevelValues] = useState([])
  const [getItemValue, setGetItem] = useState()
  const [statValues, setstatValues] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [enableAuctionSate, setenableAuctionSate] = useState("false")
  const [enableBidSate, setenableBidSate] = useState("false")
  const [collection_id, setCollection_id] = useState("")
  const location = useLocation();
  const [link, setLink] = useState("");
  const [value, onChange] = useState([new Date(), new Date()]);
  const [valueBid, onChangeBid] = useState([new Date(), new Date()]);
  const idValue = useParams();
  const [itemToken, setItemToken] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemLink, setItemLink] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [address, setAddress] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [aution, setAuction] = useState<boolean>();



  let [color, setColor] = useState("#ffffff");

  const [thumb, setThumb] = useState("")
  const [media, setMedia] = useState("")
  const [thumbFile, setThumbFile] = useState("")
  const [mediaFile, setMediaFile] = useState("")
  const [spinner, setSpinner] = useState(false)
  const [loading, setLoading] = useState();



  const id = location.state || {};
  console.log(idValue, "ids")

  const customStyles = {
    backgroundColor: '#f5f5f5',
    border: 'none',
    color: '#333',
    padding: '8px',
  };




  const schema = Yup.object().shape({
    // thumbfile: yup.mixed().test("fileSize", "The file is too large", (value) => {
    //     return !value || value[0].size <= 100000000
    // }).test('FILE_Type', "Image file supported jpeg , jpg & png only", (value) => {
    //     return !value || checkIfFilesAreCorrectTypeThumb(value[0]);
    // }),
    // mediafile: yup.mixed().test("fileSize", "The file is too large", (value) => {
    //     return !value || value[0].size <= 100000000
    // }).test('FILE_Type', "Image file supported JPEG , PNG ,PNG, GIF, SVG, MP4, WEBM, MP3, WAV & OGG", (value) => {
    //     return !value || checkIfFilesAreCorrectType(value[0]);
    // }),
    // name: yup.string().min(3, "Item name must be atleast 3 letter").required("Item name is required"),
    // description: yup.string().min(3, "Item description must be atleast 3 letter").required("Item description is required"),
    link: Yup.string().min(3, "Item Link must be atleast 3 letter"),

    saletype: Yup.string().required('Sale Type is Required').test("console", "console", (value) => {
        console.log("bid value", value)
      }),
    price: Yup.number().when('saletype', {
    is: (val) => val === "offer",
    then: (schema) => schema.required("Price Value is Requires"),
    otherwise: (schema) => schema.required("Price Value is Requires"),
    
  }).required("Item price is required").test(
    'Is positive?',
    'Price must be greater than 0!',
    (value) => value > 0
),
    enableAuction: Yup.boolean()
    // enableBID: yup.string().test("console", "console", (value) => {
    //   console.log("bid value", value)
    // }),
    // category: yup.string().required("Category is required")
  });

  console.log(getItemValue, "getItem")


  const formik = useFormik({
    initialValues: {
      collection_id: collection_id,
      thumbfile: null,
      mediafile: itemImage,
      name: itemName,
      description: itemDescription,
      link: itemLink,
      saletype: null,
      price: 0,
      elem: null
    },
    enableReinitialize: true,
    validationSchema: schema,

    onSubmit: values => {

      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      };


      let postData = {
        "collection_id": values?.collection_id,
        "description": values?.description,
        "item_id": idValue?.id,
        "enableAuction": values.saletype === "offer" ? "true" : "false",
        "enableBID": values.saletype === "bid" ? "true" : "false",
        "external_link": values.link,
        "dateRange": value,
        "dateRangeBid": valueBid,
        "media": values?.mediafile,
        "name": values.name,
        "price": values.price,
        "attributes": formValues,
        "levels": formValuesforStats,
        "stats": formValuesforStats,
      }
      // if (thumbFile !== null) {
      //     postData.thumb = thumbFile
      // }
      // if (mediaFile !== null) {
      //     postData.media = mediaFile
      // }
      console.log("sadfasdf");
      // if (formik.enableAuction === "true") {
      //     postData.dateRange = value;
      // }

      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/item/update`, postData, config)
        .then((res) => {
          console.log(res, "789")

          if (res?.data?.status === true) {
            toast.success(res?.data?.message)
            listNFT(itemToken, idValue?.id)
            // setTimeout(() => (window.location.href = `/author/${userId}`), 1500);
          } else if (res?.data?.status === false) {
            toast.error(res?.data?.message)
          }


        })
      console.log(postData, "789")


    },
  });

  

  useEffect(() => {

    getItem()

  }, [])

  const getItem = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/list?type=view&item_id=${idValue?.id}`).then(res => {

      console.log(res, "ids")
      setGetItem(res?.data?.data?.docs?.[0])
      setCollection_id(res?.data?.data?.docs?.[0]?.collection_id?._id)
      setAddress(res?.data?.data?.docs?.[0]?.collection_id?.contract_address)

      setItemName(res?.data?.data?.docs?.[0]?.name)
      setItemDescription(res?.data?.data?.docs?.[0]?.description)
      setItemLink(res?.data?.data?.docs?.[0]?.external_link)
      setItemImage(res?.data?.data?.docs?.[0]?.media)
      setItemToken(res?.data?.data?.docs?.[0]?.token_id)
      setAuction(res?.data?.data?.docs?.[0]?.enableAuction)

    })
  }




  const listNFT = async (id: any, item_id: any) => {

    try {
      setSpinner(true);
      await new Web3(window.web3.currentProvider)
      window.web3 = new Web3(window.web3.currentProvider)
      const accountResponse = await window.web3.eth.getAccounts();
      const instance = accountResponse[0];
      const claimContract = await new window.web3.eth.Contract(JSON.parse(process.env.REACT_APP_MINT_ABI || '{}'), address);

      try {
        const approve = await claimContract.methods.putForSale(id).send({ from: instance })
        console.log("approve", approve)
        if (approve) {

          const newpost = {
            "item_id": item_id,
          }

          const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
          };

          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/item/listnft`, newpost, config)
            .then((res) => {
              console.log(res, "789")
              // setMedia(res?.data?.filepath)
              // setMediaFile(res?.data?.file)
            })


        }
      } catch (error: any) {
        console.log(error);
        if (error.code === 4001) {
          toast.warning(error.message)
        }
        setSpinner(false)
      }
    } catch (err: any) {
      console.log(err);
      if (err.code === 4001) {
        toast.error("User Reject The Request");
        setSpinner(false)
      }
    }
  }

  const selectInputRef = useRef<HTMLInputElement>(null)
  const onClear = () => {
    if (selectInputRef.current) {
      selectInputRef.current.value = ""
    }
  };
  const selectCata = useRef();
  // const niceSelect = () => {
  //     $(selectCata.current).niceSelect('update');
  //     // $(selectCata.current).niceSelect();
  // }

  const colourStyles = {
    control: (provided, state) => ({
      ...provided,
      background: 'rgba(var(--c-primary-600), var(--tw-bg-opacity))',
      borderColor: 'lightblue',
      minHeight: '30px',
      height: '50px',
      boxShadow: state.isFocused ? null : null,
      color: 'white'
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused
        ? 'white'
        : isSelected
          ? 'white'
          : undefined,
      zIndex: 100,
      color: isSelected ? 'black' : undefined,
      textTransform: 'capitalize',

    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '0 6px',
      background: 'rgba(var(--c-primary-600), var(--tw-bg-opacity));',
      color: '#111',
      textTransform: 'capitalize',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
      textTransform: 'uppercase',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,

    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      borderColor: 'white',
    }),
    menu: (provided, state) => ({
      ...provided,
      background: 'rgba(var(--c-primary-600), var(--tw-bg-opacity));'
    }),
    singleValue: (provided, { data }) => ({
      ...provided,
      color: '#fff',
      // specify a fallback color here for those values not accounted for in the styleMap
    }),
  };

  const rangeSelect = (value) => {
    if (value) {

      console.log(value, "new date")

      if (value.value === "1D") {
        var new_date = moment(new Date(), "DD-MM-YYYY").add('days', 1);
        console.log(new_date, "new Date")
        console.log(new_date.toDate(), "new_date")


        onChangeBid([new Date(), new_date.toDate()])



      } else if (value.value === "3D") {
        var new_date = moment(new Date(), "DD-MM-YYYY").add('days', 3);
        onChangeBid([new Date(), new_date.toDate()])
      } else if (value.value === "7D") {
        var new_date = moment(new Date(), "DD-MM-YYYY").add('days', 7);
        onChangeBid([new Date(), new_date.toDate()])
      } else if (value.value === "1M") {
        var new_date = moment(new Date(), "DD-MM-YYYY").add('months', 1);
        onChangeBid([new Date(), new_date.toDate()])
      } else if (value.value === "3M") {
        var new_date = moment(new Date(), "DD-MM-YYYY").add('months', 3);
        onChangeBid([new Date(), new_date.toDate()])
      } else if (value.value === "6M") {
        var new_date = moment(new Date(), "DD-MM-YYYY").add('months', 6);
        onChangeBid([new Date(), new_date.toDate()])
      }
    }
  }

  console.log(formik.errors, "errors")

  console.log(typeof (formik.values.saletype), "saletype")


  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Create Item || NFT React Template</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              List Nft Item
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            {/* <div>
            <h3 className="text-lg sm:text-2xl font-semibold">
              Image, Video, Audio, or 3D Model
            </h3>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </span>
            {inputImage ? <>
              <div className="nft-card card shadow-sm">
                <div className="card-body">
                  <div className="img-wrap">
                    <img src={inputImage} alt="" style={{ width: "100%", height: "400px", borderRadius: "10px" }} />
                  </div>
                </div>
              </div>
            </> : <>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input

                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={e => ImagehandleChangeFormedia(e)}

                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </>}
          </div> */}

            {/* ---- */}


            <FormItem label="Sale Type">

              <div className='row'>

                <div className="col-3">
                  <Form.Check
                    className="mb-4 mb-md-0"
                    type="radio"
                    label="Offer"
                    id="rememberMe"
                    name="saletype"
                    value="offer"
                    onChange={formik.handleChange}
                  // defaultChecked={formik.values.enableAuction === "true"}
                  // {data?.data?.data?.docs?.[0]?.enableAuction ? checked : null}  
                  // checked={aution ? true boolean : null}
                  />


                </div>



                <div className="col-3">
                  <Form.Check
                    className="mb-4 mb-md-0"
                    type="radio"
                    label="Auction"
                    id="rememberMe"
                    value="bid"
                    name="saletype"
                    onChange={formik.handleChange}
                  // checked={data?.data?.data?.docs?.[0]?.enableBID ? true : false}
                  // defaultChecked={!formik.values.enableAuction}
                  />
                </div>



              </div>

              <div className="form-error" >{formik.errors.saletype}</div>

            </FormItem>

            {formik.values.saletype === "offer" ? (
              <>
                <div className="col-12">
                  <div className='row'>
                    <h5 style={{ float: "left", margin: "10px", marginLeft: '0px' }}>Start and end date</h5>
                  </div>

                  <div className='row'>
                    <div className='col-12'>
                      <>
                        {console.log(value, "test")}
                        <div>
                          <DateTimeRangePicker onChange={onChange} value={value} />
                        </div>
                      </>

                    </div>
                  </div>

                  {formik.values.saletype === "bid" ? null : <div style={{ margin: "20px 0" }}>
                    <FormItem label="Item Price">
                      <Input defaultValue="NFT name" id="price" type="text" name="price" onChange={formik.handleChange} value={formik.values.price} placeholder="Please enter item Price" />
                      <div className="form-error">{formik.errors.price}</div>
                    </FormItem>
                  </div>}

                </div>
              </>
            ) : null}

            <br />
            {formik?.values?.saletype === "bid" ? (
              <div className="col-12 col-md-12">
                <Form.Group >
                  <Form.Label className="mb-2 fz-16">Select time </Form.Label>
                  <Select
                    options={timeOptions}
                    // value={timeOptions}
                    styles={colourStyles}
                    // defaultValue={{ label: "----", value: null }}
                    onChange={selectedOption => {
                      rangeSelect(selectedOption)
                    }} />
                  {/* <div className="form-error">{formik.errors.category}</div> */}
                </Form.Group>
              </div>) : null}

            {formik?.values?.saletype === "bid" ? (
              <>
                <div className="col-12">
                  <div className='row'>
                    <h5 style={{ float: "left", margin: "10px", marginLeft: '0px' }}>Start and end date</h5>
                  </div>

                  <div className='row'>
                    <div className='col-12'>
                      <div>
                        <DateTimeRangePicker onChange={(e) => {
                          onClear()
                          onChangeBid(e)
                        }} value={valueBid} />
                      </div>
                    </div>
                  </div>

                </div>
              </>
            ) : null}

            {/* ---- */}
            {/* <FormItem
                            label="External link"
                            desc="Ciscrypt will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
                        >
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    https://
                                </span>
                                <Input className="!rounded-l-none" placeholder="abc.com" id="link" type='text' name="link" onChange={formik.handleChange} value={formik.values.link} />
                                <div className="form-error">{formik.errors.link}</div>
                            </div>
                        </FormItem>


                        {/* ---- */}
            {/* <FormItem
                            label="Description"
                            desc={
                                <div>
                                    The description will be included on the item's detail page
                                    underneath its image.{" "}
                                    <span className="text-green-500">Markdown</span> syntax is
                                    supported.
                                </div>
                            }
                        >
                            <Textarea rows={6} className="mt-1.5" placeholder="..." id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />
                            <div className="form-error">{formik.errors.description}</div>
                        </FormItem>

                        <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div> */}

            {/* <div>
            <Label>Choose collection</Label>
            <div className="text-neutral-500 dark:text-neutral-400 text-sm">
              Choose an exiting collection or create a new one
            </div>
            <RadioGroup value={plan} onChange={setPlan}>
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                {collectionData.map((plan, index) => (
                  
                  <RadioGroup.Option
                  
                    key={index}
                    value={plan}
                             
                    className={({ active, checked }) =>
                      `${active
                        ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                        : ""
                      }
                ${checked
                        ? "bg-teal-600 text-white"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }
                  relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <div className="flex items-center justify-between">
                                <RadioGroup.Description
                                  as="div"
                                  className={"rounded-full w-16"}
                                >
                                  <NcImage
                                    containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                    src={`${process.env.REACT_APP_BACKEND_URL}${plan?.image}`}
                                  />
                                </RadioGroup.Description>
                                {checked && (
                                  
                                  <div className="flex-shrink-0 text-white">
                                    <CheckIcon className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <RadioGroup.Label
                                as="p"
                                className={`font-semibold mt-3  ${checked ? "text-white" : ""
                                  }`}
                              >
                                {plan?.name}
                              </RadioGroup.Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div> */}

            {/* ---- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
              {/* ---- */}
              {/* <FormItem label="Royalties">
              <Input placeholder="20%" />
            </FormItem> */}
              {/* ---- */}
              {/* <FormItem label="Size">
              <Input placeholder="165Mb" />
            </FormItem> */}
              {/* ---- */}
              {/* <FormItem label="Propertie">
              <Input placeholder="Propertie" />
            </FormItem> */}
            </div>

            {/* ---- */}
            {/* <MySwitch enabled /> */}

            {/* ---- */}
            {/* <MySwitch
            label="Instant sale price"
            desc="Enter the price for which the item will be instantly sold"
          /> */}

            {/* ---- */}
            {/* <MySwitch
            enabled
            label="Unlock once purchased"
            desc="Content will be unlocked after successful transaction"
          /> */}

            {/* ---- */}
            <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
              {loading ? <ButtonPrimary className="flex-1">
                <ClipLoader
                  color={color}
                  loading={loading}
                  cssOverride={override}
                  size={35}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </ButtonPrimary> : <ButtonPrimary className="flex-1" onClick={formik.handleSubmit} type="submit">Update List Item</ButtonPrimary>}
              {/* <ButtonSecondary className="flex-1">Preview item</ButtonSecondary> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateListItem