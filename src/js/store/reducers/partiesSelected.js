import partySelected from './partySelected.js'

const partiesSelected = (
    state = [
        { partyName: "Conservative", checked: true },
        { partyName: "Labour", checked: true },
        { partyName: "Liberal Democrats", checked: true },
        { partyName: "Green", checked: true },
        { partyName: "Scottish National Party", checked: true },
        { partyName: "Plaid Cymru", checked: true }, { partyName: "Respect", checked: true },
        { partyName: "UK Independence Party", checked: true },
        { partyName: "Alliance", checked: true },
        { partyName: "Ulster Unionist Party", checked: true },
        { partyName: "Democratic Unionist Party", checked: true },
        { partyName: "Social Democratic and Labour Party", checked: true },
        { partyName: "Sinn Fein", checked: true },
        { partyName: "Independent", checked: true },
        { partyName: "Speaker", checked: true }
    ], 
    action
) => {
    switch (action.type) {
        case 'CLEAR_PARTY_SELECTIONS':
        return state.map(party => {
            return {
                ...party,
                checked: false
            }
        })

        case 'SELECT_ALL_PARTIES':
        return state.map(party => {
            return {
                ...party,
                checked: true
            }
        })
         
        case 'TOGGLE_PARTY_SELECTED' :
            return state.map(party => partySelected(party, action));
        default:
            return state;
    }
}

export default partiesSelected