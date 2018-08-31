//========================================================================
// Choose which parties to display
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'
import PartyItem from './PartyItem.js'

// Party selection checkboxes 
const PartySelection = ({
    partiesVisible,
    parties,
    clearAll,
    selectAll,
    onPartyChange
}) => {   
    if (partiesVisible) {

        return (
            <div className="resultsSummaryPartyArea">
                <form>
                    <fieldset className="resultsSummaryPartyFieldset">
                        <div className="resultsSummaryPartyButtons">
                            <button type="button" className="resultsSummaryPartyButton"
                                onClick={clearAll}>
                                Clear All
                          </button>
                            <button type="button" className="resultsSummaryPartyButton"
                                onClick={selectAll}>
                                Select All
                          </button>
                        </div>

                        {parties.map(party =>
                            <PartyItem
                                partyName={party.partyName}
                                checked={party.checked}
                                onChange={() => {onPartyChange(party.partyName, party.checked)}}
                                key={party.partyName} 
                            />
                        )}
                    </fieldset>
                </form>
            </div>
        )
    } else {
        return (null)
    }
}

export default PartySelection;