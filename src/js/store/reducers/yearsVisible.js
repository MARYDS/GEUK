const yearsVisible = (state=false, action) => {
    switch (action.type) {
        case 'TOGGLE_YEARS_VISIBLE' :
            return !state;
        default:
            return state;
    }
}

export default yearsVisible