import React from 'react'
import {connect} from 'react-redux'
import DetailResults from '../presentation/DetailResults.js';

const mapStateToProps = (state, ownProps) => {
    return {
        detailResults: state.detailResults,
        selectedResultsYear: state.yearFilter,
        resultYears: state.yearsSelected,
        selectedConstituencyName: ownProps.selectedConstituencyName
    }
}
const mapDispatchToProps = ({}) => {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailResults);