import React from 'react'

import './tooltip.css'

export default function Tooltip(props) {
  return (
    <div className="tool-tip">
      {props.tooltipContent}
    </div>
  )
}
