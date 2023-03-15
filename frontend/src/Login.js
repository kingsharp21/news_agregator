import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useToasts } from 'react-toast-notifications'
import { Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  // const { addToast } = useToasts()

  const [loadicon, setLoadicon] = useState("hidden");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      const url = `http://127.0.0.1:8000/api/login?email=${userEmail}&password=${password}`;
      const requestOptions = {
        method: "POST",
        // headers: { 'Content-Type': 'application/json' },
      };
      setLoadicon("");
      document.querySelector("#submit-btn").disabled = true;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            localStorage.setItem("token", data.data.id);
            localStorage.setItem("user", data.data.name);
            localStorage.setItem("authors", data.data.preference.authers);
            localStorage.setItem("sources", data.data.preference.sources);
            navigate("/");
          } else {
            toast.error(data.message, {
              position: toast.POSITION.TOP_RIGHT
          });
          setLoadicon('hidden')
          document.querySelector('#submit-btn').disabled = false;
            
          }
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  const validate = () => {
    let results = true;
    if (password === "" || password === null) {
      results = false;
      console.log("please enter password");
    }
    return results;
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <section className="login flex">
      <ToastContainer />
      <form onSubmit={ProceedLogin}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value.toLocaleLowerCase())}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" id="submit-btn" className="btn btn-primary ">
            Sign In
            <svg
              className={loadicon}
              version="1.1"
              id="L5"
              height="30px"
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enable-background="new 0 0 0 0"
            >
              <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  type="translate"
                  values="0 15 ; 0 -15; 0 15"
                  repeatCount="indefinite"
                  begin="0.1"
                />
              </circle>
              <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  type="translate"
                  values="0 10 ; 0 -10; 0 10"
                  repeatCount="indefinite"
                  begin="0.2"
                />
              </circle>
              <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  type="translate"
                  values="0 5 ; 0 -5; 0 5"
                  repeatCount="indefinite"
                  begin="0.3"
                />
              </circle>
            </svg>
          </button>
        </div>
        <p className="register text-right">
          Don't have an account yet ? <Link to={"/signup"}>register!</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
