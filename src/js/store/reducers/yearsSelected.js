import yearSelected from './yearSelected.js'

const yearsSelected = (
    state = [
        { year: "2017+", checked: false },
        { year: "2017", checked: true },
        { year: "2015+", checked: false },
        { year: "2015", checked: false },
        { year: "2010+", checked: false },
        { year: "2010", checked: false }
    ], 
    action
) => {
    switch (action.type) {
        case 'SET_YEAR_SELECTED' :
            return state.map(year => yearSelected(year, action));
        default:
            return state;
    }
}

export default yearsSelected