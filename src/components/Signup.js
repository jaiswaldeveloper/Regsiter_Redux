import React, { useState } from "react";
import {
  SignUpFailure,
  SignUpRequest,
  signUp,
} from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const user = useSelector((state) => state.user);
  console.log("User Data:", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.error);
  console.log("error" , error)
  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpVerificationError, setOtpVerificationError] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  const validateName = (value) => {
    if (value.trim() === "") {
      return "Name is required";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (value.trim() === "") {
      return "Email is required";
    }
    return "";
  };

  const validatePhone = (value) => {
    if (value.trim() === "") {
      return "Phone is required";
    }
    return "";
  };

  const validateWebsite = (value) => {
    if (value.trim() === "") {
      return "Website is required";
    }
    return "";
  };

  // Function to generate a random 4-digit OTP
  const generateRandomOTP = () => {
    const min = 1000;
    const max = 9000;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const requestOTP = (phone) => {
    return async (dispatch) => {
      dispatch(SignUpRequest());
      // Generate a random OTP
      const otp = generateRandomOTP();

      const api_key = "25F560B83660FB";
      const from = "TRUXCR";
      const text = `Welcome to Truxcargo Pvt Ltd.  Your verification code is  ${otp}`;
      const sms_text = text;
      const template_Id = "1207168777427633100";
      const api_url = `http://sms..com/app/smsapi/index.php?key=${api_key}&campaign=0&routeid=33&type=text&contacts=${phone}&senderid=${from}&msg=${sms_text}&template_id=${template_Id}`;

      try {
        const response = await axios.post(api_url, {
          phone,
          api_key,
          from,
          text,
          sms_text,
          template_Id,
        });

        console.log("otp request successfull:", response.data);
      } catch (error) {
        dispatch(SignUpFailure(error.message));
      }
    };
  };

  const handleSignup = async () => {
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const emailError = validateEmail(email);
    const websiteError = validateWebsite(website);

    if (nameError || phoneError || emailError || websiteError) {
      // Display error messages and prevent signup
      setNameError(nameError);
      setPhoneError(phoneError);
      setEmailError(emailError);
      setWebsiteError(websiteError);
      return;
    }



    const userData = { name, phone, email, website };
    // Generate OTP
    const generatedOtp = generateRandomOTP();

    // Store generated OTP in sessionStorage
    sessionStorage.setItem("otp", generatedOtp);

    dispatch(signUp({ ...userData, otp: generatedOtp }));
    await dispatch(requestOTP(phone)); // Assuming you have an action for requesting OTP
    // dispatch(signUp({ userData }));

    setShowOtpField(true);
  };

  const handleOtpSubmit = async () => {
    try {
      // Retrieve the correct OTP from sessionStorage
      const correctOtp = sessionStorage.getItem("otp");
      console.log("Correct OTP from sessionStorage:", correctOtp);
      // Debugging comparison

      console.log("Entered OTP:", otp);

      if (otp === correctOtp) {
        // sessionStorage.setItem("otp", otp)
        dispatch(signUp({ ...user, otp }));
        console.log("succefully otp come");
        navigate("/home");
      } else {
        setOtpVerificationError("Incorrect OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching correct OTP:", error);
      setOtpVerificationError("Error verifying OTP. Please try again.");
    }
  };

  return (
    <>
      {otpVerificationError && (
        <p style={{ color: "red" }}>{otpVerificationError}</p>
      )}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <form>
              <h4>Register</h4>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(validateName(e.target.value));
                  }}
                  required
                />
                {nameError && <p style={{ color: "red" }}>{nameError}</p>}
              </div>

              <label>Mobile No:</label>
              <input
                type="text"
                value={phone}
                className="form-control"
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError(validatePhone(e.target.value));
                }}
                required
              />
              {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
              <label>Email ID:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(validateEmail(e.target.value));
                }}
                required
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              <label>company:</label>
              <input
                type="text"
                className="form-control"
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                  setWebsiteError(validateWebsite(e.target.value));
                }}
                required
              />
              {websiteError && <p style={{ color: "red" }}>{websiteError}</p>}

              {/* <button
                type="button"
                className="btn btn-success mt-5"
                onClick={handleSignup}
              >
                Sign Up
              </button> */}
              {showOtpField ? (
          <div>
            <label>Enter OTP:</label>
            <input
              type="text"
              className="form-control"

              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="button" className="btn btn-success mt-5" onClick={handleOtpSubmit}>
              Verify OTP
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn-success mt-5"  onClick={handleSignup}>
            Sign Up
          </button>
        )}
            </form>

            <h6>Already User?  <span> <Link to="/">Login Now</Link> </span> </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
