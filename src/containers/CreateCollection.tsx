
import Label from "components/Label/Label";
import React, { CSSProperties, FC, useState, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import { RadioGroup } from "@headlessui/react";
import { nftsImgs } from "contains/fakeData";
import { useFormik, useFormikContext } from 'formik';
import Select from "react-select";
import * as yup from "yup";
import axios from "axios";
import MySwitch from "components/MySwitch";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import { CollectionMediaUpload } from "../API/Collection_mediaupload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import Form from 'react-bootstrap/Form';

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Field,
  FieldProps,
} from 'formik';
import { CircleLoader } from "react-spinners";

interface MyFormValues {
  collectionName: string;
}


interface timeOptions {
  value: "string"
}



export interface PageUploadItemProps {
  className?: string;
}

const plans = [
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[0],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[1],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[2],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[3],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[4],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[5],
  },
];

interface ChainData {
  _id: string;
  chainSymbol: string;
  // Add other properties as needed
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};





const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {
  const supportedFormates = ['image/jpeg', 'image/jpg', 'image/png'];
  const [selected, setSelected] = useState(plans[1]);
  const [logoFile, setLogoFile] = useState("");
  const [bannerFile, setBannerFile] = useState("");
  const [inputImage, setInputImage] = useState('');
  const [chainData, setChainData] = useState<ChainData[]>([]);
  const [bannerImage, setBannerImage] = useState('');
  const [collectionName, setCollectionName] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [royalties, setRoyalties] = useState("");
  const initialValues: MyFormValues = { collectionName: '' };
  let [color, setColor] = useState("#ffffff");
  const [chooseChain, setChooseChain] = useState("")

  useEffect(() => {

    getChainDetails();

  }, [])


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



  const CollectionLogoUpload = (e: any) => {
    const formData = new FormData();
    formData.append("formFile", e.target.files[0]);
    console.log("formData", formData)
    // CollectionMediaUpload()
  }

  // const timeOptions = [
  //   { value: '', label: 'Select Chain' },
  //   { value: '1D', label: 'BNB' },
  //   { value: '3D', label: 'ys' },
  //   { value: '7D', label: '7 Days' },
  //   { value: '1M', label: '1 Month' },
  //   { value: '3M', label: '3 Month' },
  //   { value: '6M', label: '6 Month' },

  // ]

  const timeOptions = chainData?.map((values: ChainData) => ({
    value: values?._id,
    label: values.chainSymbol,
  }));



  const checkIfFilesAreCorrectType = (files: any) => {
    let valid = true;
    if (files) {
      if (!supportedFormates.includes(files.type)) {
        valid = false;
      }
    }
    return valid;
  }

  const getChainDetails = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/chain/chainGet`).then(res => {

      setChainData(res?.data?.data)


    })
  }




  const schema = yup.object().shape({
    logo: yup.mixed().required("Logo image is required").test("fileSize", "The file is too large", (value) => {
      return (!value || value[0].size <= 2000000)
    }).test('FILE_Type', "Image file supported jpeg , jpg & png only", (value) => {
      return !value || checkIfFilesAreCorrectType(value[0]);
    }),
    // banner: yup.mixed().required("Banner file is required").test("fileSize", "The file is too large", (value) => {
    //   return !value || value[0].size <= 2000000
    // }).test('FILE_Type', "Image file supported jpeg , jpg & png only", (value) => {
    //   return !value || checkIfFilesAreCorrectType(value[0]);
    // }),
    title: yup.string().min(3, "Collection name must be atleast 3 letter").required("Collection name is required"),
    chain: yup.string().required("Chain is Required"),
    royalties: yup.string().required("Royalties is required").test(
      'Is positive?',
      'Royalties must be greater than 0!',
      (value) => Number(value) >= 0
    ).test(
      'Less then 10?',
      'Royalties must be equal or less then 10',
      (value) => Number(value) < 11
    ),

  });
  const formik = useFormik({
    initialValues: {
      logo: null,
      banner: null,
      title: "",
      chain: "",
      description: "",
      royalties: 0
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: values => {
      setSpinner(true);
      setLoading(true)
      let postData = {
        name: values.title,
        description: values.description,
        chain: values.chain,
        banner: bannerFile,
        image: logoFile,
        royalties: values.royalties
      }

      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      };

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/collection/add`, postData, config)
        .then((res) => {
          console.log(res, "789")
          setLogoFile(res?.data?.filepath)
          if (res.data.status == true) {
            setLoading(false)
            toast.success(res.data.message)
            setTimeout(() => (window.location.href = "/collection"), 1500);

          } else {
            toast.error(res.data.message)
            setTimeout(() => {
              setLoading(false)
            }, 1000);
          }
        })
      // createPost(postData)
      //.then(res => {
      //     console.log(res.data);
      //     if (res.data.status == true) {
      //         toast.success(res.data.message)
      //     }
      // });
    },
  });
  const ImagehandleChange = (e: any) => {
    setLogoFile(e.target.files[0])
    console.log(process.env.REACT_APP_BACKEND_URL, "backendUrl")
    console.log(e.target.files[0], "789")
    setInputImage(URL.createObjectURL(e.target.files[0]));
    console.log(logoFile, "789")
    setTimeout(() => {

      var formData = new FormData();
      formData.append('file', e.target.files[0]);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/media/collectionlogo`, formData, {
        })
        .then((res) => {
          console.log(res, "789")
          setLogoFile(res?.data?.filepath)
        })
    }, 1000)

  }
  const bannerhandleChange = (e: any) => {
    setBannerImage(URL.createObjectURL(e.target.files[0]));
    setTimeout(() => {
      var formData = new FormData();
      formData.append('file', e.target.files[0]);

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}media/collectionbanner`, formData, {
        })
        .then((res) => {
          console.log(res, "789")
          setBannerFile(res?.data?.filepath)
        })
    }, 1000)
  }

  console.log(formik.errors, formik.values.chain, "errors")

  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"    >
      <Helmet>
        <title>Create Collection</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Create New Collection
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            <Form onSubmit={formik.handleSubmit}>
              <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold">
                    Logo image*
                  </h3>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                    This image will also be used for navigation. 350 x 350 recommended.
                  </span>
                  {inputImage ?
                    <>
                      <div className="nft-card card shadow-sm">
                        <div className="card-body">
                          <div className="img-wrap">
                            <img src={inputImage} alt="" style={{ width: "100%", height: "400px", borderRadius: "10px" }} />
                          </div>
                        </div>
                      </div>


                    </> :
                    <>
                      <div className="mt-5" style={{ width: "100%" }}>
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
                                  name="logo"
                                  type="file"
                                  className="sr-only"
                                  onChange={e => {
                                    formik.setFieldValue("logo", e.target.files)
                                    ImagehandleChange(e)
                                  }
                                  }
                                />
                              </label>
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              PNG, JPG, JPEG
                            </p>
                          </div>
                        </div>
                      </div>
                    </>}
                  <div className="form-error">{formik.errors.logo}</div>
                </div>
                {/* <div>
                  <h3 className="text-lg sm:text-2xl font-semibold">
                    Banner image*
                  </h3>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                    This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 350 recommended.
                  </span>
                  {bannerImage ?
                    <>
                      <div className="nft-card card shadow-sm">
                        <div className="card-body">
                          <div className="img-wrap">
                            <img src={bannerImage} alt="" style={{ width: "100%", height: "400px", borderRadius: "10px" }} />
                          </div>
                        </div>
                      </div>

                    </> :
                    <>
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
                                  onChange={e => bannerhandleChange(e)}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              PNG, JPG, JPEG
                            </p>
                          </div>
                        </div>
                      </div>
                    </>}
                </div> */}
                {/* ---- */}
                <FormItem label="Collection name">
                  <Input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                    placeholder="Collection Name"
                    id="title" type="text" name='title' onChange={formik.handleChange} ></Input>
                  <div className="form-error">{formik.errors.title}</div>
                </FormItem>

                <div className="col-12 col-md-12">
                  <Form.Group>
                    <Form.Label className="mb-2 fz-16">Select Chain</Form.Label>
                    <Select
                      options={timeOptions}
                      styles={colourStyles}
                      name="chain" // Set the name attribute to match the field name from the validation schema
                      defaultValue={{ label: "Choose Chain", value: "" }}
                      onChange={selectedOption => {
                        formik.setFieldValue("chain", selectedOption?.value ?? ""); 
                      }}
                      onBlur={formik.handleBlur("chain")}
                    />
                    {formik.touched.chain && formik.errors.chain && (
                      <div className="form-error">{formik.errors.chain}</div>
                    )}
                  </Form.Group>

                </div>




                {/* ---- */}


                <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>



                {/* ---- */}
                <div className="grid grid-cols-8 md:grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
                  {/* ---- */}
                  <FormItem label="Royalties">
                    <Input placeholder="10%" />
                    <div className="form-error">{formik.errors.royalties}</div>
                  </FormItem>
                </div>
                {/* ---- */}
                <div className="justify-center">
                  {loading ? <ButtonPrimary className=" w-1/2">
                    <ClipLoader
                      color={color}
                      loading={loading}
                      cssOverride={override}
                      size={35}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </ButtonPrimary> : <ButtonPrimary className=" w-1/2" type="submit">Upload Collection</ButtonPrimary>}

                </div>
              </div>
            </Form>
          </Formik>
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
