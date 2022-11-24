import React from "react";

function InputBox({ label, type, onChange, name, value, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="mb-5" htmlFor={name}>
        {label}
      </label>
      <input
        className="mb-5 border-slate-300 border"
        id={name}
        name={name}
        type={`${type}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputBox;
