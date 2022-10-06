import { CircularProgress, Modal } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appActions } from "../store/appSice";
import { uploadFile } from "./uploadFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AnimatePresence, motion } from "framer-motion";

const UploadModal = ({ uploadModal, setUploadModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateObj = useSelector((state) => state.app);
  const [imageUpload, setImageUpload] = useState(null);
  const uploadBtn = useRef(null);
  const rmBtn = useRef(null);
  const [newUrl, setnewUrl] = useState({});
  const [waitingUpload, setwaitingUpload] = useState(false);

  // Image drag and drop
  const onDrop = useCallback((acceptedFiles) => {
    setImageUpload(acceptedFiles);
    uploadBtn.current.removeAttribute("disabled");
    rmBtn.current.removeAttribute("disabled");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // Image drag and drop
  useEffect(() => {
    if (!uploadModal) {
      return;
    } else {
      if (imageUpload) {
        setTimeout(() => {
          uploadBtn.current.removeAttribute("disabled");
        }, 50);
      }
    }
  }, [uploadModal]);

  return (
    <Modal
      open={uploadModal}
      onClose={() => {
        setUploadModal(false);
      }}
    >
      <div className="absolute bg-white transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 w-2/3">
        <div
          {...getRootProps()}
          className="flex justify-center items-center w-full h-80 rounded-lg border-dashed border-2 border-gray-400"
        >
          <input
            {...getInputProps()}
            type="file"
            className="border-2 border-black"
          />
          {isDragActive ? (
            <div className="flex flex-col items-center">
              <ArrowDropDownIcon
                sx={{ fontSize: 100 }}
                className="opacity-20"
              />
              <p className="text-lg opacity-20 text font-bold">
                Drop the files here ...
              </p>
            </div>
          ) : !imageUpload ? (
            <div>
              <FileUploadIcon sx={{ fontSize: 100 }} className="opacity-20" />
            </div>
          ) : (
            <div className="w-full h-full overflow-y-scroll">
              {waitingUpload && (
                <CircularProgress className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></CircularProgress>
              )}
              <div className="grid grid-cols-5">
                {imageUpload.map((i, index) => {
                  return (
                    <div key={index} className="w-full">
                      <img
                        key={index}
                        className="object-cover w-full h-full"
                        src={URL.createObjectURL(i)}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between lg:flex-row md:flex-col-reverse sm:flex-col-reverse">
          <button
            className="bg-red-500 disabled:opacity-10 text-white font-semibold px-4 py-2 my-2 rounded-lg  enabled:hover:bg-red-700 enabled:active:scale-90 transform 
            transition-transform"
            // disabled
            ref={rmBtn}
            onClick={() => {
              setImageUpload(null);
              console.log("Heyy");
            }}
          >
            Remove Image
          </button>
          <button
            className="disabled:opacity-10 bg-teal-500 text-white font-semibold px-4 py-2 my-2 rounded-lg  enabled:hover:bg-teal-700 enabled:active:scale-90 transform 
            transition-transform"
            // disabled
            ref={uploadBtn}
            onClick={() => {
              if (imageUpload) {
                setwaitingUpload(true);
                console.log("Image Upload =>", imageUpload.length);
                let uploadCount = 0;
                imageUpload.forEach(async (x) => {
                  const urlMain = await uploadFile(x, stateObj);
                  dispatch(appActions.setNewImage(urlMain));
                  uploadCount++;
                  console.log(uploadCount);
                  if (uploadCount === imageUpload.length) {
                    setImageUpload(null);
                    setUploadModal(false);
                    setwaitingUpload(false);
                  }
                });
                // console.log("Code Reached Here");
              } else {
                return;
              }
            }}
          >
            Upload Image
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
