import * as React from "react"

function DashboardIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_26_3035)">
        <path
          d="M19 6v2h-4V6h4zM9 6v6H5V6h4zm10 8v6h-4v-6h4zM9 18v2H5v-2h4zM21 4h-8v6h8V4zM11 4H3v10h8V4zm10 8h-8v10h8V12zm-10 4H3v6h8v-6z"
          fill="#181818"
        />
      </g>
      <defs>
        <clipPath id="clip0_26_3035">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default DashboardIcon
