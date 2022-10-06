import { Button, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../store/appSice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUri } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.app);
  const [issues, setIssues] = useState("none");

  useEffect(() => {
    if (loginData.username) {
      navigate("/mainpage");
    }
  }, [loginData]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userApiData = await axios.post(
        `${backendUri}/auth/login`,
        loginInfo
      );
      dispatch(appActions.setUser(userApiData.data.user));
    } catch (e) {
      //   console.log(e.response.data.status);
      if (e.response.data.status >= 400) {
        setIssues("block");
        setTimeout(() => {
          setIssues("none");
        }, 3000);
      }
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "90vh",
          alignItems: "center",
        }}
      >
        <div style={{ display: `${issues}`, color: "red" }}>
          Incorrect username or password
        </div>
        <form
          autoComplete="off"
          noValidate
          style={{ margin: 2, width: "20rem" }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Login
          </Typography>

          <TextField
            name="username"
            variant="outlined"
            label="Username"
            type="text"
            fullWidth
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, username: e.target.value });
            }}
            sx={{ mb: 1 }}
          />
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, password: e.target.value });
            }}
            sx={{ mb: 1 }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ mb: 2 }}
            fullWidth
          >
            Sign In
          </Button>
        </form>
        <Link
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Login;
