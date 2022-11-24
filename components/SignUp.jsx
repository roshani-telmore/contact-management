import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { userRegister } from "../services/api.service";
function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(8, "Must be 8 characters or less")
        .required("Required"),

      password_confirmation: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    }),

    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));

      const register = await userRegister(values);
      const data = await register;
      // console.log("data", data);
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="signup-page">
        <h1 className="logo">Logo</h1>
        <span className="mb-9">Create New Account</span>
        <form onSubmit={formik.handleSubmit}>
          <input
            className="border border-slate-700 max-h-14 py-4 pl-5 max-w-md w-full mb-6"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Mail ID"
          />
          <input
            className="border border-slate-700 max-h-14 py-4 pl-5 max-w-md w-full mb-6"
            type="text"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          <span class="error" style={{ color: "red" }}>
            {formik.errors.password}
          </span>
          <div>
            <input
              className="border border-slate-700 max-h-14 py-4 pl-5 max-w-md w-full mb-6"
              type="text"
              name="password_confirmation"
              onChange={formik.handleChange}
              value={formik.values.password_confirmation}
              placeholder="Confirm Password"
              // required
            />
            <span class="error" style={{ color: "red" }}>
              {formik.errors.password_confirmation}
            </span>
          </div>

          <button
            className=" max-w-md w-full max-h-14 bg-blue-800 text-white justify-center py-4"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
