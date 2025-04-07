import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#fff"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="m285.38-196.92 40-160H180.77l10-40h144.61l41.54-166.16H232.31l10-40h144.61l40-160h38.46l-40 160h170.77l40-160h38.47l-40 160h144.61l-10 40H624.62l-41.54 166.16h144.61l-10 40H573.08l-40 160h-38.46l40-160H363.85l-40 160h-38.47Zm88.47-200h170.77l41.53-166.16H415.38l-41.53 166.16Z" />
  </svg>
)
export { SvgComponent as Hash }
