import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, ImageList, ImageListItem, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { appActions } from "../store/appSice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ImageModal from "./ImageModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import UploadModal from "./UploadModal";

const Main = () => {
  const stateObj = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalLink, setModalLink] = useState(0);
  const [uploadModal, setUploadModal] = useState(false);

  useEffect(() => {
    if (!stateObj.username) {
      navigate("/");
    }
    // console.log(stateObj.username);
  }, []);

  return stateObj.username ? (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center w-full py-8">
        <button
          className="flex items-center justify-center bg-orange-400 transform rounded-xl w-36 h-10 text-white hover:bg-orange-500 active:scale-90 transition-transform ease-in-out"
          onClick={() => {
            setUploadModal(true);
          }}
        >
          <p className="font-bold text-lg">Upload</p>
          <AddIcon />
        </button>
      </div>
      <UploadModal setUploadModal={setUploadModal} uploadModal={uploadModal} />
      <div>
        {stateObj.imagelist.length ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 p-2 ">
            {stateObj.imagelist.map((i, index) => {
              return (
                <div key={i} className="relative">
                  <div
                    key={i}
                    className="h-80 rounded-2xl overflow-hidden drop-shadow-lg"
                  >
                    <LazyLoadImage
                      className="object-center object-cover max-w-xl h-full"
                      effect="blur"
                      src={i}
                      alt="cant show"
                      onClick={() => {
                        setOpenModal(true);
                        setModalLink(index);
                      }}
                    />
                  </div>

                  <DeleteIcon
                    className="absolute transform bottom-2 left-2 drop-shadow text-gray-200  transition-transform ease-in-out duration-300 active:scale-150"
                    onClick={async () => {
                      await axios.post(
                        "http://localhost:3333/auth/deleteimage",
                        {
                          username: stateObj.username,
                          url: i,
                        }
                      );
                      const newList = stateObj.imagelist.filter((x) => i !== x);
                      dispatch(appActions.resetImageList(newList));
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center font-logo opacity-25">
            <h1 className="text-5xl text-center">
              Whoop! Got something to upload?
            </h1>
            <h1 className="text-xl text-center">Hit the upload button</h1>
          </div>
        )}

        {/* <ImageList variant="masonry" cols={3} gap={8}>
          {stateObj.imagelist.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item}
                // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <div
                key={item}
                className="rounded-2xl overflow-hidden drop-shadow-lg"
              >
                <LazyLoadImage
                  className="object-cover max-w-xl h-1/2"
                  effect="blur"
                  src={item}
                  alt="cant show"
                  onClick={() => {
                    setOpenModal(true);
                    setModalLink(index);
                  }}
                />
              </div>
            </ImageListItem>
          ))}
        </ImageList> */}
      </div>
      <ImageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalLink={modalLink}
        setModalLink={setModalLink}
      />
      {/* <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          className="h-fit w-fit"
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={modalLink} alt="cant preview" />
        </Box>
      </Modal> */}
    </>
  ) : null;
};

export default Main;
