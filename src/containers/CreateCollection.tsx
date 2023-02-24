import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import { RadioGroup } from "@headlessui/react";
import { nftsImgs } from "contains/fakeData";
import { useFormik, useFormikContext } from 'formik';
import * as yup from "yup";
import axios from "axios";
import MySwitch from "components/MySwitch";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import { CollectionMediaUpload } from "../API/Collection_mediaupload";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';

interface MyFormValues {
  collectionName: string;
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

const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {
  const [selected, setSelected] = useState(plans[1]);
  const [logoFile, setLogoFile] = useState("");
  const [bannerFile, setBannerFile] = useState("");
  const [inputImage, setInputImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [collectionName, setCollectionName] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [royalties, setRoyalties] = useState("");
  const initialValues: MyFormValues = { collectionName: '' };

  const CollectionLogoUpload = (e: any) => {
    const formData = new FormData();
    formData.append("formFile", e.target.files[0]);
    console.log("formData", formData)
    // CollectionMediaUpload()
  }

//   const schema = yup.object().shape({
//     logo: yup.mixed().required("Logo image is required").test("fileSize", "The file is too large", (value) => {
//         return !value || value[0].size <= 2000000
//     }).test('FILE_Type', "Image file supported jpeg , jpg & png only", (value) => {
//         return !value || checkIfFilesAreCorrectType(value[0]);
//     }),
//     banner: yup.mixed().required("Banner file is required").test("fileSize", "The file is too large", (value) => {
//         return !value || value[0].size <= 2000000
//     }).test('FILE_Type', "Image file supported jpeg , jpg & png only", (value) => {
//         return !value || checkIfFilesAreCorrectType(value[0]);
//     }),
//     title: yup.string().min(3, "Item name must be atleast 3 letter").required("Item name is required"),
//     description: yup.string().min(3, "Item description must be atleast 3 letter").required("Item description is required"),
//     royalties: yup.string().required("Royalties is required").test(
//         'Is positive?',
//         'Royalties must be greater than 0!',
//         (value) => value >= 0
//     ).test(
//         'Less then 10?',
//         'Royalties must be equal or less then 10',
//         (value) => value < 11
//     ),

// });
const formik = useFormik({
    initialValues: {
        logo: null,
        banner: null,
        title: "",
        description: "",
        royalties: 0
    },
    enableReinitialize: true,
    onSubmit: values => {
        setSpinner(true);
        let postData = {
            name: values.title,
            description: values.description,
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
                  <div className="mt-5" style={{ width: "35%" }}>
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
                              onChange={e => ImagehandleChange(e) }
                            />
                          </label>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          PNG, JPG, JPEG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold">
                    Banner image*
                  </h3>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                    This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 350 recommended.
                  </span>
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
                              onChange={e => bannerhandleChange(e) }
                            />
                          </label>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          PNG, JPG, JPEG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ---- */}
                <FormItem label="Collection name">
                 <Input   className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                    placeholder="Collection Name"
                    id="title" type="text" name='title' onChange={formik.handleChange} ></Input>
                </FormItem>

             


                {/* ---- */}


                <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>



                {/* ---- */}
                <div className="grid grid-cols-8 md:grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
                  {/* ---- */}
                  <FormItem label="Royalties">
                    <Input placeholder="10%" />
                  </FormItem>
                </div>
                {/* ---- */}
                <div className="justify-center">
                  <ButtonPrimary className=" w-1/2">Upload Collection</ButtonPrimary>
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
