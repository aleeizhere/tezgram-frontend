import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const ImageModal = ({ openModal, setOpenModal, modalLink, setModalLink }) => {
  const imageList = useSelector((state) => state.app.imagelist);

  // const [modalInd, setModalInd] = useState(0);

  const imageComps = imageList.map((i) => {
    return (
      <img src={i} alt="Image not Found" className="sm:w-full md:w-96"></img>
    );
  });

  // console.log("modalLink", modalLink);
  // console.log("Component Render", modalInd);
  function increaseImage(e) {
    if (modalLink < imageComps.length) setModalLink(modalLink++);
    else {
      return;
    }
  }

  function decreaseImage(e) {
    if (modalLink >= 0) setModalLink(modalLink--);
    else {
      return;
    }
  }
  return (
    // <Modal
    //   open={openModal}
    //   onClose={() => {
    //     setOpenModal(false);
    //   }}
    //   aria-labelledby="parent-modal-title"
    //   aria-describedby="parent-modal-description"
    // >
    //   <Box
    //     className="h-fit w-fit"
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       position: "absolute",
    //       top: "50%",
    //       left: "50%",
    //       transform: "translate(-50%, -50%)",
    //     }}
    //   >
    //     <img src={modalLink} alt="cant preview" />
    //   </Box>
    // </Modal>

    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div
        className="absolute top-1/2 left-1/2 transfrom -translate-x-1/2 -translate-y-1/2 outline-none"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            increaseImage(e);
            increaseImage(e);
          } else if (e.key === "ArrowLeft") {
            decreaseImage(e);
            decreaseImage(e);
          }
        }}
      >
        <div className="relative sm:w-screen md:w-max">
          {imageComps[modalLink]}
          <div
            className="absolute flex items-center justify-center left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-10 h-10 rounded-full opacity-70 transition-transform ease-in-out active:scale-75"
            onClick={(e) => {
              decreaseImage(e);
              decreaseImage(e);
            }}
          >
            <ChevronLeftIcon className="text-white" />
          </div>

          <div
            className="absolute flex items-center justify-center right-6 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-black w-10 h-10 rounded-full opacity-70 transition-transform ease-in-out active:scale-75"
            onClick={(e) => {
              increaseImage(e);
              increaseImage(e);
            }}
          >
            <ChevronRightIcon className="text-white" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
