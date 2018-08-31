//========================================================================
// Main Title for the page
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'

// Main title for the page
let MainTitle = ({
    yearFilter
}) => {
    return (
        <header>
            <div className="mainTitleArea" id="mainTitleArea">
                <h1 className="mainTitle">{yearFilter}&nbsp;UK election results</h1>
            </div>
            <div className="mainTitleBlock">
                <h1 className="mainTitle">{yearFilter}&nbsp;UK election results</h1>
            </div>
        </header>
    )
}

export default MainTitle