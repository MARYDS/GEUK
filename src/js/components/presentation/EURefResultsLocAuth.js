//========================================================================
// EU referendum results by local authority for a constituency
// (Invoked from EURefResults)
//========================================================================
import React from 'react'

// Detail local authority result for a constituency
const EURefResultsLocAuth = ({
    locAuthResult
}) => {
    var resultColour
    if (locAuthResult.remain > locAuthResult.leave) {
        resultColour = '#FCC822'
    } else {
        resultColour = '#0069b5'
    }
    return (
        <tbody>
            <tr>
                <td className="euResultsColour" style={{ backgroundColor: resultColour }}>&nbsp;</td>
                <td className="euResultsLocAuth">{locAuthResult.name}&nbsp;{locAuthResult.wards}</td>
                <td className="euResultsElectorate">{locAuthResult.electorate.toLocaleString()}</td>
                <td className="euResultsTurnoutPct">{locAuthResult.topct.toLocaleString()}</td>
                <td className="euResultsRemainVotes">{locAuthResult.remain.toLocaleString()}</td>
                <td className="euResultsRemainPct">{locAuthResult.remainpct.toLocaleString()}</td>
                <td className="euResultsLeaveVotes">{locAuthResult.leave.toLocaleString()}</td>
                <td className="euResultsLeavePct">{locAuthResult.leavepct.toLocaleString()}</td>
            </tr>
        </tbody>
    )
}

export default EURefResultsLocAuth