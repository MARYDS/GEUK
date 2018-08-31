//========================================================================
// Choose which year's election results to display
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'    
import YearItem from './YearItem.js';

// Year selection radio buttons 
const YearSelection = ({
    yearsVisible,
    years,  
    onYearChange
}) => {

    if (yearsVisible) {
        return (
            <div className="resultsSummaryYearArea">
                <form>
                    <fieldset className="resultsSummaryYearFieldset">
                        {years.map(year =>
                            <YearItem
                                year={year.year}
                                checked={year.checked}
                                onChange={() => {onYearChange(year.year, year.checked)}}
                                key={year.year}
                            />
                        )}
                    </fieldset>
                </form>
            </div>
        )
    } else {
        return (null)
    }
}

export default YearSelection
