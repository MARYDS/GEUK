//========================================================================
// EU referendum results for a constituency
// (Invoked from DetailResults)
//========================================================================
import React from 'react'
import EURefResultsHeading from './EURefResultsHeading.js'
import EURefResultsLocAuth from './EURefResultsLocAuth.js'

// EU Referendum results for a constituency
const EURefResults = ({
    allEURefResults,
    constituency
}) => {
    // Get the results for the required constituency
    var constitEUResults = allEURefResults.filter((result) => {
        return result.constit == constituency
    })

    // We have results for the constituency, output them     
    if (constitEUResults.length > 0) {
        return (
            <div className="euResultsDetails">
                <span className="euResultTitle">EU Referendum</span>
                <table className="euResultsDetailTable">
                    <EURefResultsHeading />
                    {constitEUResults[0].locAuthResults.map(locAuth =>
                        <EURefResultsLocAuth locAuthResult={locAuth} key={locAuth.name} />
                    )}
                </table>
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default EURefResults;