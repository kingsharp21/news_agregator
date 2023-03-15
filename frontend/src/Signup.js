import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup(params) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [pass, setpass] = useState("");
  const [com_pass, setcom_pass] = useState("");

  const ProceedRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      const url = `http://127.0.0.1:8000/api/register?name=${username}&email=${useremail}&password=${pass}&password_confirmation=${com_pass}`;
      const requestOptions = {
        method: "POST",
        // headers: { 'Content-Type': 'application/json' },
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            localStorage.setItem("token", data.data.id);
            localStorage.setItem("user", data.data.name);
            setDefaultPreference(data.data.id);

            navigate("/"); //navigate to select preference
            toast.success("Welcome", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            console.log(data.message[0]);
            toast.error(data.message[0], {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .then((error) => console.log(error));
    }
  };

  const setDefaultPreference = (id) => {
    const url = `http://127.0.0.1:8000/api/post_preference?user_id=${id}&authors=king&sources=bbc,cnn`;
    const requestOptions = {
      method: "POST",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("authors", "king");
        localStorage.setItem("sources", "bbc,cnn");
      })
      .then((error) => console.log(error));
  };

  const validate = () => {
    let results = true;
    if (pass !== com_pass) {
      results = false;
      toast.error("password does not match", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    return results;
  };
  return (
    <section className="signup flex">
      <ToastContainer />
      <form onSubmit={ProceedRegister}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>User Name *</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email address *</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setUseremail(e.target.value.toLocaleLowerCase())}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password *</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setpass(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password *</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            onChange={(e) => setcom_pass(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to={"/login"}>sign in?</Link>
        </p>
      </form>
    </section>
  );
}
