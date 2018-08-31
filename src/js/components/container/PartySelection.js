import React from 'react'
import {connect} from 'react-redux'
import PartySelection from '../presentation/PartySelection.js';

const mapStateToProps = (state) => {
    return {
        partiesVisible: state.partiesVisible,
        parties: state.partiesSelected 
    } 
}
const mapDispatchToProps = (dispatch) => {

    return { 
        clearAll: () => {
            dispatch(
                {
                    type: 'CLEAR_PARTY_SELECTIONS'
                }
            )
        },
        selectAll: () => {
            dispatch(
                {
                    type: 'SELECT_ALL_PARTIES'
                }
            )
        },
        onPartyChange: (partyName, checked) => {
            dispatch(
                {
                    type: 'TOGGLE_PARTY_SELECTED',
                    partyName: partyName,
                    checked: checked
                }
            )
        }
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(PartySelection)