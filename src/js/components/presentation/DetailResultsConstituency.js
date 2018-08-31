//========================================================================
// Display detail results for all candidates in constituency
// (Invoked from DetailResults)
//========================================================================
import React from 'react'
import DetailResultsCandidate from './DetailResultsCandidate.js';

// Detail results for all candidates in constituency
const DetailResultsConstituency = ({
    detailResults,
    constituency
}) => {
    return (
        <div className="detailResultsDetails">
            <table className="resultsDetailTable">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th className="resultsDetailCandidate">Candidate</th>
                        <th className="resultsDetailPhoto">&nbsp;</th>
                        <th className="resultsDetailVotes">Votes</th>
                        <th className="resultsDetailShare">Share %</th>
                        <th className="resultsDetailChange">Change %</th>
                    </tr>
                </thead>
                {detailResults.map(candRes =>
                    <DetailResultsCandidate
                        candidateResult={candRes}
                        constituency={constituency}
                        key={candRes.name} />
                )}
            </table>
        </div>
    )
}

export default DetailResultsConstituency