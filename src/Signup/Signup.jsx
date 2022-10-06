import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Link, TextField, Typography } from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  const [issues, setIssues] = useState("");
  const [showAlert, setShowAlert] = useState("none");

  const clear = () => {
    setUserCreds({
      fullname: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(userCreds.email)) {
      alert("Invalid Email");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3333/auth/signup",
          userCreds
        );
        setIssues(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (e) {
        setIssues(e.response.data.message);
      }
      clear();
      setShowAlert("");
      setTimeout(() => {
        setShowAlert("none");
      }, 2000);
    }
  };

  return (
    <>
      <div>
        <Alert severity="info" sx={{ display: `${showAlert}` }}>
          {issues}
        </Alert>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <form
          autoComplete="off"
          noValidate
          style={{ margin: 2, width: "20rem" }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Sign Up
          </Typography>
          <TextField
            name="name"
            variant="outlined"
            label="Full Name"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.fullname}
            onChange={(e) =>
              setUserCreds({ ...userCreds, fullname: e.target.value })
            }
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.email}
            onChange={(e) =>
              setUserCreds({ ...userCreds, email: e.target.value })
            }
          />
          <TextField
            name="username"
            variant="outlined"
            label="Username"
            type="text"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.username}
            onChange={(e) =>
              setUserCreds({ ...userCreds, username: e.target.value })
            }
          />
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.password}
            onChange={(e) =>
              setUserCreds({ ...userCreds, password: e.target.value })
            }
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ mb: 2 }}
            fullWidth
          >
            Submit
          </Button>
          <Button
            onClick={clear}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
          >
            Clear
          </Button>
        </form>
        <Typography sx={{ color: "#90a4ae" }} variant="p" component="span">
          Already have an account?
        </Typography>
        <Link
          sx={{ cursor: "pointer", color: "#607d8b" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default Signup;
