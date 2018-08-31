const regionSelected = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_REGION_SELECTED' :
            if (state.regionName !== action.regionName) {
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

export default regionSelected