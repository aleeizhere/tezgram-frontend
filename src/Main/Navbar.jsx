import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appActions } from "../store/appSice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between w-full border-b-1 px-10 py-1 bg-gray-50 border-gray-300">
      <div className="text-3xl font-logo">Tezgram</div>

      <button
        type="submit"
        className="rounded-md px-7 text-red-700 font-semibold transition-all ease-in hover:bg-red-400 hover:text-white"
        onClick={() => {
          dispatch(appActions.logout());
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
