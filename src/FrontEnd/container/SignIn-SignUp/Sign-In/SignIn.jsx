import { useState, useEffect } from "react";
import "../CommonSignInSignUp.css";
import { FormInput } from "../Form-Inputs/FormInput";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character!",
      label: "Password",
      required: true,
    },
  ];

  useEffect(() => {
    // Check if user data exists in localStorage and populate the form
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setValues({
        email: userData.email || "",
        password: "", // You might not want to pre-fill the password for security reasons
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleSubmit = (e) => {
  
    try {
      const storedUserData = localStorage.getItem("userData");
  
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
          navigate("/");
          alert("Succesfully registered!");
          window.location.reload(true);
      } else {
        alert("User does not exist!");
      }
    } catch (err) {
      alert("Invalid credentials!");
    }
  };
  
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="SignInSignUp">
        <form className="SignInSignUpForm" onSubmit={handleSubmit}>
          <div className="SignInSignUpTitle">Sign In</div>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="SignInSignUpButton">Submit</button>
        </form>
      </div>
    </>
  );
};
