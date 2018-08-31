import React from 'react'
import {connect} from 'react-redux'
import ShowButtons from '../presentation/ShowButtons.js';

const mapStateToProps = (state) => {
    return {
        yearsVisible: state.yearsVisible,
        regionsVisible: state.regionsVisible,
        partiesVisible: state.partiesVisible,
        sortOptionsVisible: state.sortOptionsVisible
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        yearsClickHandler: () => {
            dispatch(
                {
                    type: 'TOGGLE_YEARS_VISIBLE'
                }
            )
        },
        regionsClickHandler: () => {
            dispatch(
                {
                    type: 'TOGGLE_REGIONS_VISIBLE'
                }
            )
        },
        partiesClickHandler: () => {
            dispatch(
                {
                    type: 'TOGGLE_PARTIES_VISIBLE'
                }
            )
        },
        sortOptionsClickHandler: () => {
            dispatch(
                {
                    type: 'TOGGLE_SORT_OPTIONS_VISIBLE'
                }
            )
        },
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ShowButtons)