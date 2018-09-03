//========================================================================
// Display detail results for one candidate in constituency
// (Invoked from DetailResultsConstituency)
//========================================================================
import React from 'react'

const DetailResultsCandidate = ({
    candidateResult,
    constituency
}) => {
    var images = require.context('../../../../images', true);
    var photoId = "Photo" + candidateResult.name
    var photoImg = images("./blank.jpg")
    if (candidateResult.photo == "Y") {
        photoImg = images("./" + candidateResult.name + "_" + constituency + ".jpg")
    }
    var wikiLink = "javascript:void(0);"
    var wikiTitle = ""
    var linkClass = "resultsDetailCandidateNoLink"
    if (candidateResult.wiki && candidateResult.wiki != "") {
        wikiLink = "https://en.wikipedia.org/wiki/" + candidateResult.wiki
        linkClass = "resultsDetailCandidateLink"
        wikiTitle = "Wikipedia page for candidate"
    }
    return (
        <tbody>
            <tr>
                <td className="resultsDetailColour" style={{ backgroundColor: candidateResult.colour }}>&nbsp;</td>
                <td className="resultsDetailCandidate"><a href={wikiLink} title={wikiTitle} target="_blank" className={linkClass}>{candidateResult.name}</a></td>
                <td className="resultsDetailPhoto" id={photoId} rowSpan="2"><img src={photoImg} class="resultsDetailImage" height="50" width="50" alt="" /></td>
                <td className="resultsDetailVotes">{candidateResult.votes.toLocaleString()}</td>
                <td className="resultsDetailShare">{candidateResult.shrPct.toFixed(1)}</td>
                <td className="resultsDetailChange">{candidateResult.chgPct.toFixed(1)}</td>
            </tr>
            <tr>
                <td className="resultsDetailColour" style={{ backgroundColor: candidateResult.colour }}>&nbsp;</td>
                <td className="resultsDetailParty">{candidateResult.party}</td>
            </tr>
        </tbody>
    )
}

export default DetailResultsCandidate