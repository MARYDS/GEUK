//========================================================================
// Display title for detail results for constituency
// (Invoked from DetailResultsHeading)
//========================================================================
import React from 'react'

// Detail results title for a constituency
const DetailResultsTitle = ({
    selectedConstituency
}) => {
    var wikiArticle = "https://en.wikipedia.org/wiki/" + selectedConstituency.replace(" ", "_") + "_(UK_Parliament_constituency)"

    return (
        <div className="detailResultsTitleArea">
            <h3 className="detailResultsTitle"><a href={wikiArticle} target="_blank">{selectedConstituency}</a></h3>
        </div>
    )
}

export default DetailResultsTitle