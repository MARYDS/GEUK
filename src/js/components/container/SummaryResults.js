import React from 'react'
import {connect} from 'react-redux'
import SummaryResults from '../presentation/SummaryResults.js';

const mapStateToProps = (state) => {
    return {
        store: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onRowClick: (constituency) => {
            dispatch(
                {
                    type: 'SET_CONSTITUENCY',
                    constituency: constituency
                }
            )
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SummaryResults);