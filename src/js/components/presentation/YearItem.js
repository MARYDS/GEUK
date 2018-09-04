//========================================================================
// One radio button when choosing which year to display
// (Invoked from Year selection)
//========================================================================
import React from 'react'

// Radio buttion in year selection area
const YearItem = ({
    year,
    checked,
    onChange
}) => {
    return (
        <label className="resultsSummaryYearField">
            <input type="radio" name="year" className="resultsSummaryYearFieldRadio"
                onChange={onChange}
                value={year}
                checked={checked}
            />
            {year}
        </label>
    )
}
export default YearItem