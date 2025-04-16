import type { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#fff"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M200-400v-40h280v40H200Zm0-160v-40h440v40H200Zm0-160v-40h440v40H200Zm329.23 520v-88.38l213.31-212.31q5.92-5.93 12.22-8 6.3-2.08 12.6-2.08 6.87 0 13.5 2.58 6.64 2.57 12.06 7.73l37 37.77q4.93 5.92 7.5 12.31Q840-444 840-437.62q0 6.39-2.46 12.89-2.46 6.5-7.62 12.42L617.62-200h-88.39Zm275.39-237.62-37-37.76 37 37.76Zm-240 202.24h38l138.69-138.93-18.77-19-18.23-19.54-139.69 139.47v38Zm157.92-157.93-18.23-19.54 37 38.54-18.77-19Z" />
  </svg>
)
export { SvgComponent as EditNote }
