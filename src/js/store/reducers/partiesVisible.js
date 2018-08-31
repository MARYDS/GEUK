const partiesVisible = (state=false, action) => {
    switch (action.type) {
        case 'TOGGLE_PARTIES_VISIBLE' :
            return !state;
        default:
            return state;
    }
}

export default partiesVisible