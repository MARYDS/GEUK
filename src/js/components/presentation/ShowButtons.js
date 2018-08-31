//========================================================================
// Buttons to show/hide year/party/region/sort selection areas
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'
import ShowButton from './ShowButton.js';

const ShowButtons = ({
    yearsVisible,
    regionsVisible,
    partiesVisible,
    sortOptionsVisible,
    yearsClickHandler,
    regionsClickHandler,
    partiesClickHandler,
    sortOptionsClickHandler
}) => {

    var selectYear = "Select Year"
    if (yearsVisible) {
        selectYear = "Hide Years"
    }

    var selectRegions = "Select Regions"
    if (regionsVisible) {
        selectRegions = "Hide Regions"
    }

    var selectParties = "Select Parties"
    if (partiesVisible) {
        selectParties = "Hide Parties"
    }

    var selectSortOptions = "Select Sort Options"
    if (sortOptionsVisible) {
        selectSortOptions = "Hide Sort Options"
    }

    return (
        <div className="resultsSummaryMenuOptions">
            <ShowButton text={selectYear}
                clickEventHandler={yearsClickHandler} />
            <ShowButton text={selectRegions}
                clickEventHandler={regionsClickHandler} />
            <ShowButton text={selectParties}
                clickEventHandler={partiesClickHandler} />
            <ShowButton text={selectSortOptions}
                clickEventHandler={sortOptionsClickHandler} />
        </div>
    )
}

export default ShowButtons;
