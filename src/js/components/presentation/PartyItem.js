//========================================================================
// One checkbox selection when choosing which parties to display
// (Invoked from PartySelection)
//========================================================================
import React from 'react'

// Checkbox in party selection area
const PartyItem = ({
    partyName,
    checked,
    onChange
}) => {
    return (
        <label className="resultsSummaryPartyField">
            <input type="checkbox" name="parties" className="resultsSummaryPartyFieldInputBox"
                onChange={onChange}
                value={partyName}
                checked={checked}
            />
            {partyName}
        </label>
    )
}

export default PartyItem