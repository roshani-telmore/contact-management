import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import SelectBox from "../components/SelectBox";
import InputBox from "../components/InputBox";
import { addContactsApi } from "../services/api.service";
import { useAuthStore } from "../services/store.service";

export default function NewContactPage({user}) {
  const router = useRouter();
  // const user = useAuthStore((state) => state.user);

  // console.log(user, "usersssss");
  const newContactMut = useMutation(addContactsApi);
  console.log("useraaa",user)
  // const user = localStorage.getItem("user");

  const newContactForm = useFormik({
    initialValues: {
      name: null,
      email: null,
      phone_number: null,
      country: null,
      designation: null,
      company: null,
      industry: null,
      user_id: user?.id,
    },
    onSubmit: (values) => {
      const newValues = {
        ...values,
        country_id: values.country?.id ? values.country.id : null,
        company_id: values.company?.id ? values.company.id : null,
        designation_id: values.designation?.id ? values.designation.id : null,
        industry_id: values.industry?.id ? values.industry.id : null,
      };

      newContactMut.mutate(newValues);
      console.log(newValues, "newvalues");
      // router.push("/totalcontacts");
    },
  });

  const handleChange = (fieldName, value) => {
    newContactForm.setFieldValue(fieldName, value);
  };

  return (
    <>
      <div className="w-3/6 flex justify-center ">
        {/* {<h1> {user.id}</h1>} */}
        <form onSubmit={newContactForm.handleSubmit} className="w-3/4">
          <div className="block">
            <InputBox
              type="text"
              label="Name"
              name="name"
              onChange={newContactForm.handleChange}
            />
          </div>
          <SelectBox
            label="Designation"
            name="designation"
            link="designations"
            onChange={handleChange}
          />

          <SelectBox
            label="Company"
            name="company"
            link="companies"
            onChange={handleChange}
          />

          <SelectBox
            label="Industry"
            name="industry"
            link="industries"
            onChange={handleChange}
          />

          <InputBox
            type="email"
            label="Email"
            name="email"
            onChange={newContactForm.handleChange}
          />

          <InputBox
            type="tel"
            label="Phone"
            name="phone_number"
            onChange={newContactForm.handleChange}
          />

          <SelectBox
            label="Country"
            name="country"
            link="countries"
            onChange={handleChange}
          />

          <div className="bg-blue-400 w-20 h-8 flex align-middle justify-center">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
      <div className="pagination"> </div>
    </>
  );
}
