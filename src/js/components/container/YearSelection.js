import React from 'react'
import {connect} from 'react-redux'
import YearSelection from '../presentation/YearSelection.js';

const mapStateToProps = (state) => {
    return {
        yearsVisible: state.yearsVisible,
        years: state.yearsSelected 
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onYearChange: (year, checked) => {
            dispatch(
                {
                    type: 'SET_YEAR_SELECTED',
                    year: year,
                    checked: checked
                }
            )
            if (!checked) {
                dispatch(
                    {
                        type: 'SET_YEAR',
                        year: year,
                        checked: checked
                    }
                )
            }
        }
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(YearSelection)