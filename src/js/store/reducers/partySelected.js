const partySelected = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_PARTY_SELECTED' :
            if (state.partyName !== action.partyName) {
                return state
            } else {
                return {
                    ...state,
                    checked: !state.checked
                }
            }
        default:
            return state;
    }
}

export default partySelected