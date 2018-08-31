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
                <th colSpan="2" className="summListCon">Constituency / Region</th>
                <th colSpan="2" className="summListMP">Elected MP / Party</th>
                <th colSpan="2" className="summListMar">Margin %</th>
            </tr>
        </thead>
    )
}

export default SummaryHeading