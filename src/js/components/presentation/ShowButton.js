//========================================================================
// One menu button to show/hide year/party/region/sort selection areas
// (Invoked from ShowButtons)
//========================================================================
import React from 'react'

const ShowButton = ({
  text,
  clickEventHandler
}) => {
  return (
    <button className="resultsSummarySelectButton"
      onClick={clickEventHandler}>
      {text}
    </button>
  )
}

 export default ShowButton