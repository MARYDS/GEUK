//========================================================================
// Display summary results for constituency with pie-charts
// (Invoked from DetailResults)
//========================================================================
import React from 'react'
import DetailResultsTitle from './DetailResultsTitle.js';
import DetailResultsHeadingLeft from './DetailResultsHeadingLeft.js';
import DetailResultsHeadingCenter from './DetailResultsHeadingCenter.js';
import DetailResultsHeadingRight from './DetailResultsHeadingRight.js';

// Detail results heading section for a constituency
const DetailResultsHeading = ({
    constituency,
    constitResults,
    constitPrevResults,
    year
}) => {
    return (
        <div className="detailResultsOverall" id="detailResultsOverall">
            <DetailResultsTitle selectedConstituency={constituency} />
            <div>
                <DetailResultsHeadingLeft constitResults={constitResults}
                    selectedResultsYear={year} />
                <DetailResultsHeadingCenter overallResults={constitResults.overallResults} />
                <DetailResultsHeadingRight constitPrevResults={constitPrevResults}
                    selectedConstituencyName={constituency}
                />
            </div>
        </div>

    )
}

export default DetailResultsHeading