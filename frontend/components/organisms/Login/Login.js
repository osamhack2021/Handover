import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import R from "ramda";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import useKeyPress from "_hooks/useKeyPress";
import { attemptLogin } from "_thunks/auth";
// import { attemptDummyLogin } from '_thunks/auth';

export default function Login() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(false);
  const [serviceNumber, setServiceNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const serviceNumber = localStorage.getItem("serviceNumber");
    if (serviceNumber) {
      setRemember(true);
      setServiceNumber(serviceNumber);
    }
  }, []);

  const login = () => {
    const userCredentials = { serviceNumber: serviceNumber, password };

    if (remember) {
      localStorage.setItem("serviceNumber", serviceNumber);
    }

    dispatch(attemptLogin(userCredentials)).catch(R.identity);
  };

  useKeyPress("Enter", login);

  const rememberMe = () => {
    localStorage.removeItem("serviceNumber");
    setRemember(!remember);
  };

  const updateServiceNumber = (e) => setServiceNumber(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <div className="login-box">
      <div className="login-logo" />
      <div className="login-title">로그인</div>
      <div className="login-subtitle">환영합니다!</div>
      <div className="forminput-container">
        <TextField
          fullWidth
          id="input-id"
          label="군번"
          value={serviceNumber}
          onChange={updateServiceNumber}
          margin="normal"
        />
        <TextField
          fullWidth
          id="input-password"
          label="비밀번호"
          value={password}
          type="password"
          onChange={updatePassword}
          margin="normal"
        />
      </div>
      <Button
        fullWidth
        sx={{ my: 2 }}
        variant="contained"
        onClick={login}
        size="large"
      >
        로그인
      </Button>
      <div className="login-register">
        <Link to="/recovery" className="login-link">
          비밀번호 찾기
        </Link>
      </div>
      <div className="login-register">
        계정이 없으신가요?&nbsp;
        <Link to="/register" className="login-link">
          회원가입
        </Link>
      </div>
    </div>
  );
}
