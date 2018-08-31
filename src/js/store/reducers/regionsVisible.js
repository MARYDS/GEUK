const regionsVisible = (state=false, action) => {
    switch (action.type) {
        case 'TOGGLE_REGIONS_VISIBLE' :
            return !state;
        default:
            return state;
    }
}

export default regionsVisible