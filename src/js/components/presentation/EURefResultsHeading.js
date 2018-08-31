//========================================================================
// EU referendum results heading for a constituency
// (Invoked from EURefResults)
//========================================================================
import React from 'react'

const EURefResultsHeading = () => {
    return (
        <thead>
            <tr>
                <th className="euResultsColour">&nbsp;</th>
                <th className="euResultsLocAuth">Local Authority (wards)</th>
                <th className="euResultsElectorate">Electorate</th>
                <th className="euResultsTurnoutPct">Turnout %</th>
                <th className="euResultsRemainVotes">Remain</th>
                <th className="euResultsRemainPct">Remain %</th>
                <th className="euResultsLeaveVotes">Leave</th>
                <th className="euResultsLeavePct">Leave %</th>
            </tr>
        </thead>
    )
}

export default EURefResultsHeading