const yearFilter = (state='2019', action) => {
    switch (action.type) {
        case 'SET_YEAR' :
            return action.year;
        default:
            return state;
    }
}

export default yearFilter