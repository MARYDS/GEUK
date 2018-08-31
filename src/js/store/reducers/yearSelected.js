const yearSelected = (state, action) => {
    switch (action.type) {
        case 'SET_YEAR_SELECTED' :
            if (state.year !== action.year) {
                return {
                    ...state,
                    checked: false
                }
            } else {
                return {
                    ...state,
                    checked: true
                }
            }
        default:
            return state;
    }
}

export default yearSelected