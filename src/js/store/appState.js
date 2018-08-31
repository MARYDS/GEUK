import {combineReducers} from 'redux'

import yearFilter from './reducers/yearFilter.js'
import yearsVisible from './reducers/yearsVisible.js'
import regionsVisible from './reducers/regionsVisible.js'
import partiesVisible from './reducers/partiesVisible.js'
import sortOptionsVisible from './reducers/sortOptionsVisible.js'
import yearsSelected from './reducers/yearsSelected.js'
import regionsSelected from './reducers/regionsSelected.js'
import partiesSelected from './reducers/partiesSelected.js'
import summaryResults from './reducers/summaryResults.js'
import detailResults from './reducers/detailResults.js'
import euRefResults from './reducers/euRefResults.js'
import searchTerm from './reducers/searchTerm.js'

const appState = combineReducers ({
    searchTerm,
    yearFilter,
    yearsVisible,
    regionsVisible,
    partiesVisible,
    sortOptionsVisible,
    yearsSelected,
    regionsSelected,
    partiesSelected,
    summaryResults,
    detailResults,
    euRefResults
})

export default appState;