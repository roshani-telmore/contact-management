import * as React from "react"

function NewContactIcon(props) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5 2.5h-12C.675 2.5 0 3.063 0 3.75v7.5c0 .688.675 1.25 1.5 1.25h12c.825 0 1.5-.563 1.5-1.25v-7.5c0-.688-.675-1.25-1.5-1.25zm0 8.75h-12v-7.5h12v7.5zM1.5 0h12v1.25h-12V0zm0 13.75h12V15h-12v-1.25zm6-6.25c1.035 0 1.875-.7 1.875-1.563 0-.862-.84-1.562-1.875-1.562-1.035 0-1.875.7-1.875 1.563 0 .862.84 1.562 1.875 1.562zm0-2.188c.412 0 .75.282.75.625 0 .344-.338.625-.75.625s-.75-.28-.75-.625c0-.343.338-.625.75-.625zm3.75 4.682c0-1.306-2.482-1.869-3.75-1.869-1.268 0-3.75.563-3.75 1.869v.631h7.5v-.631zm-6.143-.306c.458-.325 1.523-.626 2.393-.626.877 0 1.943.3 2.4.626H5.107z"
        fill="#000"
      />
    </svg>
  )
}

export default NewContactIcon
