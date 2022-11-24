import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import EyeIcon from "../components/eye-icon";
import GroupOfDotSvg from "../components/groupOfDot";
import SignUp from "../components/SignUp";
import { authLogin } from "../services/api.service";


function ContactManagement() {
 

  const [signup, setSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(8, "Must be 8 characters or less")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const token = await authLogin(values);
      const data = await token;
      // console.log(data.profile)
      localStorage.setItem('authToken', data.profile.token)
      // console.log(data, "data");
      router.push("/totalcontacts");
      // formik.resetForm();
    },
  });

  return (
    <>
      <div className="logo-page">
        <div className="inside-logo-page">
          <GroupOfDotSvg className="left-svg" />

          {signup ? (
            <div className="show-signup">
              <SignUp />
            </div>
          ) : (
            <div className="register-page">
              <h1 className="logo">Logo</h1>
              <span className="sub-title">
                Enter your credentials to access your account
              </span>
              <div className="flex">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      className="border border-slate-700 max-h-14 py-4 pl-5 max-w-md w-full mb-8"
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="Mail ID"
                    />
                    <div class="error" style={{ color: "red" }}>
                      {formik.errors.email}
                    </div>
                  </div>
                  <div className="flex items-center border border-slate-700 bg-white">
                    <input
                      type={showPassword ? "text" : "password"}
                      className=" max-h-14 py-4 pl-5 max-w-md w-full"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Password"
                    />

                    <label
                      onClick={() => setShowPassword(!showPassword)}
                      for="toggle"
                    >
                      {showPassword ? (
                        <img
                          src="contact-images/eye-svgrepo-com.svg"
                          style={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      ) : (
                        <EyeIcon />
                      )}
                    </label>
                  </div>

                  <button
                    className="flex max-h-14 py-4 max-w-md w-full bg-blue-800 mt-16 mb-11 text-white justify-center"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <button
                    className="flex text-blue-800 pb-24 max-w-md w-full justify-center"
                    type="button"
                    onClick={() => setSignUp(true)}
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          )}

          <GroupOfDotSvg className="mt-16" />
        </div>
      </div>
    </>
  );
}

export default ContactManagement;
