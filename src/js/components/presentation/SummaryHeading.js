//========================================================================
// Heading for the Constituency Summary Results section
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'

// Table heading for results summary list
const SummaryHeading = () => {
    return (
        <thead>
            <tr>
                <th className="summListPrev1">&nbsp;</th>
                <th className="summListCon">Constituency / Region</th>
                <th className="summListCurr1">&nbsp;</th>
                <th className="summListMP">Elected MP / Party</th>
                <th className="summListMar">Margin %</th>
                <th className="summListSec1">&nbsp;</th>
            </tr>
        </thead>
    )
}

export default SummaryHeading