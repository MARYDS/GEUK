import React from 'react'
import {connect} from 'react-redux'
import RegionSelection from '../presentation/RegionSelection.js';

const mapStateToProps = (state) => {
    return {
        regionsVisible: state.regionsVisible,
        regions: state.regionsSelected 
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        clearAll: () => {
            dispatch(
                {
                    type: 'CLEAR_REGION_SELECTIONS'
                }
            )
        },
        selectAll: () => {
            dispatch(
                {
                    type: 'SELECT_ALL_REGIONS'
                }
            )
        },
        onRegionChange: (regionName, checked) => {
            dispatch(
                {
                    type: 'TOGGLE_REGION_SELECTED',
                    regionName: regionName,
                    checked: checked
                }
            )
        }
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(RegionSelection)