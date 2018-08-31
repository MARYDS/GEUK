import React from 'react'
import {connect} from 'react-redux'
import EURefResults from '../presentation/EURefResults.js';

const mapStateToProps = (state, ownProps) => {
    return {
        allEURefResults: state.euRefResults,
        constituency: ownProps.constituency
    }
}
const mapDispatchToProps = ({}) => {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EURefResults);