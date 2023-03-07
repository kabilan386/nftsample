import Label from "components/Label/Label";
import React, { FC, useState, useEffect, useRef, CSSProperties } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import { RadioGroup } from "@headlessui/react";
import { nftsImgs } from "contains/fakeData";
import MySwitch from "components/MySwitch";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik, useFormikContext } from 'formik';
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export interface PageUploadItemProps {
  className?: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};





const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {

  const [collectionData, setCollectionData] = useState<any[]>([])
  const [inputImage, setInputImage] = useState('');
  const [inputImageformedia, setInputImageformedia] = useState('');
  const [inputvideoformedia, setInputvideoformedia] = useState('');
  const [inputmusicformedia, setInputmusicformedia] = useState('');
  const [categorystate, setCategorystate] = useState([]);
  const [formValues, setFormValues] = useState([])
  const [formValuesforLevel, setFormValuesforLevel] = useState([])
  const [formValuesforStats, setFormValuesforStats] = useState([])
  const [propertiesValues, setpropertiesValues] = useState([])
  const [levelValues, setlevelValues] = useState([])
  const [statValues, setstatValues] = useState([])
  const location = useLocation();
  const [link, setLink] = useState("");
  const [value, onChange] = useState([new Date(), new Date()]);
  const [valueBid, onChangeBid] = useState([new Date(), new Date()]);
  const [thumb, setThumb] = useState("")
  const [media, setMedia] = useState("")
  const [thumbFile, setThumbFile] = useState("")
  const [mediaFile, setMediaFile] = useState("")
  const [spinner, setSpinner] = useState(false)
  const [apiLoading, setapiLoading] = useState(false);
  const [mediaupload, setMediaupload] = useState(false);
  const collectionId = useParams();
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [choose, setChoose] = useState("")
  const [plan, setPlan] = useState(collectionData[0])

  console.log(collectionId, "collectionId")

  console.log(collectionData, "Data")


  const id = location.state || {};
  console.log(id, "ids")

  // let addFormFields = () => {
  //     setFormValues([...formValues, { type: "", name: "" }])
  // }
  // let addFormFieldsforLevel = () => {
  //     setFormValuesforLevel([...formValuesforLevel, { type: "", value: "", valueof: "" }])
  // }
  // let addFormFieldsforStats = () => {
  //     setFormValuesforStats([...formValuesforStats, { type: "", value: "", valueof: "" }])
  // }
  // let removeFormFields = (i) => {
  //     let newFormValues = [...formValues];
  //     newFormValues.splice(i, 1);
  //     setFormValues(newFormValues)
  // }
  // let removeFormFieldsforLevel = (i) => {
  //     let newFormValues = [...formValuesforLevel];
  //     newFormValues.splice(i, 1);
  //     setFormValuesforLevel(newFormValues)
  // }
  // let removeFormFieldsforStats = (i) => {
  //     let newFormValues = [...formValuesforStats];
  //     newFormValues.splice(i, 1);
  //     setFormValuesforStats(newFormValues)
  // }
  // let handleChange = (i, e) => {
  //     let newFormValues = [...formValues];
  //     newFormValues[i][e.target.name] = e.target.value;
  //     setFormValues(newFormValues);
  // }
  // let handleChangeforLevel = (i, e) => {
  //     // console.log("target name",e.target.name);
  //     // if (e.target.value >= 0) {
  //     let newFormValues = [...formValuesforLevel];
  //     newFormValues[i][e.target.name] = e.target.value;
  //     setFormValuesforLevel(newFormValues);
  //     // } else {
  //     //     toast.error("Please enter positive number")
  //     // }
  // }
  // let handleChangeforLevelOne = (i, e) => {
  //     let newFormValues = [...formValuesforLevel];
  //     newFormValues[i][e.target.name] = e.target.valueOne;
  //     setFormValuesforLevel(newFormValues);
  // }
  // let handleChangeforStats = (i, e) => {
  //     // if (e.target.value >= 0) {
  //     let newFormValues = [...formValuesforStats];
  //     newFormValues[i][e.target.name] = e.target.value;
  //     setFormValuesforStats(newFormValues);
  //     // } else {
  //     //     toast.error("Please enter positive number")
  //     // }
  // }
  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     setpropertiesValues(formValues)
  // }
  // const handleSubmitforLevel = (event) => {
  //     event.preventDefault();
  //     setlevelValues(formValuesforLevel);
  // }
  // const handleSubmitforStats = (event) => {
  //     event.preventDefault();
  //     setstatValues(formValuesforStats);
  // }
  // const ImagehandleChange = (event) => {
  //     let file = event.target.files[0];
  //     setThumbFile(event.target.files[0].name)
  //     if (supportedFormates.includes(file.type)) {
  //         let thumbFormdata = new FormData;
  //         thumbFormdata.append("collection_id", "6350d2934b286a1839636b82");
  //         thumbFormdata.append("file", file);
  //         setInputImage(URL.createObjectURL(event.target.files[0]));
  //     }




  const ImagehandleChangeFormedia = (e: any) => {

    console.log(process.env.REACT_APP_BACKEND_URL, "backendUrl")
    console.log(e.target.files[0], "789")
    setInputImage(URL.createObjectURL(e.target.files[0]));

    setTimeout(() => {

      var formData = new FormData();
      formData.append('collection_id', id?.id);
      formData.append('file', e.target.files[0]);

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/media/itemmedia`, formData, {
        })
        .then((res) => {
          console.log(res, "789")
          setMedia(res?.data?.filepath)
          setMediaFile(res?.data?.file)
          setapiLoading(false)
          setMediaupload(false)
        })
    }, 1000)

  }


  // const ImagehandleChangeFormedia = (event : any) => {

  //     let file = event.target.files[0];
  //     console.log("file", file)
  //     // if (supportedFormates.includes(file.type)) {
  //     //     let thumbFormdata = new FormData;
  //     //     thumbFormdata.append("collection_id", "6350d2934b286a1839636b82");
  //     //     thumbFormdata.append("file", file);
  //     //     if (file.type === "video/webm" || file.type === "video/mp4") {
  //     //         setInputvideoformedia(URL.createObjectURL(event.target.files[0]))
  //     //         setInputImageformedia("")
  //     //         setInputmusicformedia()
  //     //     } else if (file.type === "audio/mp3") {
  //     //         setInputvideoformedia("")
  //     //         setInputImageformedia("")
  //     //         setInputmusicformedia(URL.createObjectURL(event.target.files[0]))
  //     //     } else {
  //     //         setInputvideoformedia("")
  //     //         setInputmusicformedia("")
  //     //         setInputImageformedia(URL.createObjectURL(event.target.files[0]));
  //     //     }
  //     // }
  //     var formData = new FormData();
  //     formData.append('collection_id', id?.ids);
  //     formData.append('file', event.target.files[0]);
  //     setapiLoading(true)
  //     setMediaupload(true)
  //     axios
  //         .post(`${process.env.REACT_APP_BACKEND_URL}media/itemmedia`, formData, {
  //         })
  //         .then((res) => {
  //             setMedia(res?.data?.filepath)
  //             setMediaFile(res?.data?.file)
  //             setapiLoading(false)
  //             setMediaupload(false)
  //         })
  // }
  // for properties
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // for levels
  const [showlevel, setShowlevel] = useState(false);
  const handleCloseforlevel = () => setShowlevel(false);
  const handleShowforlevel = () => setShowlevel(true);
  // for stats
  const [showstat, setShowstat] = useState(false);
  const handleCloseforstat = () => setShowstat(false);
  const handleShowforstat = () => setShowstat(true);

  // const colourStyles = {
  //     control: (provided, state) => ({
  //         ...provided,
  //         background: '#0c153b',
  //         borderColor: '#1f0757',
  //         minHeight: '30px',
  //         height: '50px',
  //         boxShadow: state.isFocused ? null : null,
  //         color: 'white'
  //     }),
  //     option: (styles, { isFocused, isSelected }) => ({
  //         ...styles,
  //         background: isFocused
  //             ? 'white'
  //             : isSelected
  //                 ? 'white'
  //                 : undefined,
  //         zIndex: 100,
  //         color: isSelected ? 'black' : isFocused ? 'black' : undefined,

  //         textTransform: 'capitalize',

  //     }),
  //     valueContainer: (provided, state) => ({
  //         ...provided,
  //         height: '30px',
  //         padding: '0 6px',
  //         background: '#0c153b',
  //         color: 'white',
  //         textTransform: 'capitalize',
  //     }),

  //     input: (provided, state) => ({
  //         ...provided,
  //         margin: '0px',
  //         textTransform: 'uppercase',

  //     }),
  //     indicatorSeparator: state => ({
  //         display: 'none',
  //     }),
  //     indicatorsContainer: (provided, state) => ({
  //         ...provided,

  //     }),
  //     dropdownIndicator: (provided, state) => ({
  //         ...provided,
  //         transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
  //         borderColor: 'white',
  //     }),
  //     menu: (provided, state) => ({
  //         ...provided,
  //         background: '#0c153b'
  //     }),
  //     singleValue: (provided, { data }) => ({
  //         ...provided,
  //         color: 'white',
  //         // specify a fallback color here for those values not accounted for in the styleMap
  //     }),
  // };
  // const getCategory = useCategoriesGetQuery()
  // console.log("getCategory", getCategory)
  // useEffect(() => {
  //     // axios.get("")
  //     if (getCategory.status == 'fulfilled') {
  //         console.log("getCategory", getCategory.data?.data)
  //         let arr = [];
  //         let getCategorydata = getCategory.data?.data.map(e => {
  //             arr.push({ value: e._id })
  //         })
  //         setCategorystate(arr)
  //         // options.push({label:e.title,value:e._id})    
  //         // niceSelect()
  //         $(selectCata.current).niceSelect("update");

  //     }

  // }, [])

  // console.log(categorystate?.[0]?.value, "789")

  // const checkIfFilesAreCorrectType = (files: any) => {
  //     let valid = true;
  //     if (files) {
  //         if (!supportedFormates.includes(files.type)) {
  //             valid = false;
  //         }
  //     }
  //     return valid;
  // }

  // const checkIfFilesAreCorrectTypeThumb = (files: any) => {
  //     let valid = true;
  //     if (files) {
  //         if (!supportedFormatesthump.includes(files.type)) {
  //             valid = false;
  //         }
  //     }
  //     return valid;
  // }

  // console.log(id?.ids, "test")
  const schema = yup.object().shape({
      // thumbfile: yup.mixed().required("Thumb image is required").test("fileSize", "The file is too large", (value) => {
      //     return !value || value[0].size <= 100000000
      // }).test('FILE_Type', "Image file supported jpeg , jpg & png only", (value) => {
      //     return !value || checkIfFilesAreCorrectTypeThumb(value[0]);
      // }),
      // mediafile: yup.mixed().required("Media file is required").test("fileSize", "The file is too large", (value) => {
      //     return !value || value[0].size <= 100000000
      // }).test('FILE_Type', "Image file supported JPEG , PNG ,PNG, GIF, SVG, MP4, WEBM, MP3, WAV & OGG", (value) => {
      //     return !value || checkIfFilesAreCorrectType(value[0]);
      // }),
      name: yup.string().min(3, "Item name must be atleast 3 letter").required("Item name is required"),
      description: yup.string().min(3, "Item description must be atleast 3 letter").required("Item description is required"),
      link: yup.string().min(3, "Item Link must be atleast 3 letter"),
      // enableAuction: yup.boolean(),
      // enableBID: yup.boolean(),
  });
  const formik = useFormik({
    initialValues: {
      thumbfile: null,
      mediafile: null,
      name: "",
      description: "",
      link: "",
      price: 0,
      enableAuction: "false",
      enableBID: "false",
      datatimeForAuction: null
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: values => {
      setLoading(true)
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      };
      let postData = {
        "thumb": thumbFile,
        "collection_id": plan?._id,
        "description": values.description,
        "enableAuction": values.enableAuction,
        "enableBID": values.enableBID,
        "external_link": values.link,
        "dateRange": value,
        "dateRangeBid": valueBid,
        "media": media,
        "name": values.name,
        "price": values.price,
        "attributes": formValues,
        "levels": formValuesforStats,
        "stats": formValuesforStats,
      }
      setSpinner(true);

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/item/add`, postData, config)
        .then((res) => {
          console.log(res, "789")

          if (res.data.status == true) {
            toast.success(res.data.message)
            setLoading(true);
            setTimeout(() => (window.location.href = `/collection/${plan?._id}`), 1500);

          } else {
            toast.error(res.data.message)
            setTimeout(() => {
              setLoading(false)
            }, 1000);
          }
        })
      console.log(postData, "789")
      //     console.log(res.data);
      //     if (res.data.status == true) {
      //         toast.success(res.data.message)
      //     }
      // });
    },
  });
  // console.log("formik.errors",formik.errors);
  console.log("formik.values", formik.values);
  const selectCata = useRef();


  const getCollection = () => {

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };


    axios.get(`${process.env.REACT_APP_BACKEND_URL}/collection/list?page=1&&type=my`,  config ).then(res => {
      setCollectionData(res?.data?.data?.docs)
      console.log(res, "res")
    })
  }

  useEffect(() => {

    getCollection()

  }, [])

  console.log(plan, "plan")



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
              Create New Item
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div>
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
            </div>

            {/* ---- */}
            <FormItem label="Item Name">
              <Input defaultValue="NFT name" id="title" type="text" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Please enter item name" />
              <div className="form-error">{formik.errors.name}</div>
            </FormItem>

            {/* ---- */}
            <FormItem
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
            <FormItem
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

            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

            <div>
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
            </div>

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
              </ButtonPrimary> : <ButtonPrimary className="flex-1" onClick={formik.handleSubmit} type="submit">Upload item</ButtonPrimary>}
              {/* <ButtonSecondary className="flex-1">Preview item</ButtonSecondary> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PageUploadItem;
