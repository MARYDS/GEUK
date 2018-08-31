const sortOptionsVisible = (state=false, action) => {
    switch (action.type) {
        case 'TOGGLE_SORT_OPTIONS_VISIBLE' :
            return !state;
        default:
            return state;
    }
}

export default sortOptionsVisible