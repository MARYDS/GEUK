import regionSelected from './regionSelected.js'

const regionsSelected = (
    state = [
        { regionName: "East", checked: true },
        { regionName: "East Midlands", checked: true },
        { regionName: "London", checked: true },
        { regionName: "North East", checked: true },
        { regionName: "North West", checked: true },
        { regionName: "Northern Ireland", checked: true },
        { regionName: "Scotland", checked: true },
        { regionName: "South East", checked: true },
        { regionName: "South West", checked: true },
        { regionName: "Wales", checked: true },
        { regionName: "West Midlands", checked: true },
        { regionName: "Yorkshire and The Humber", checked: true }
    ], 
    action
) => {
    switch (action.type) {
        case 'CLEAR_REGION_SELECTIONS':
        return state.map(region => {
            return {
                ...region,
                checked: false
            }
        })

        case 'SELECT_ALL_REGIONS':
        return state.map(region => {
            return {
                ...region,
                checked: true
            }
        })
         
        case 'TOGGLE_REGION_SELECTED' :
            return state.map(region => regionSelected(region, action));
        default:
            return state;
    }
}

export default regionsSelected