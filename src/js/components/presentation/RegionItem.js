//========================================================================
// One checkbox selection when choosing which regions to display
// (Invoked from RegionSelection)
//========================================================================
import React from 'react'

// Checkbox in region selection area
const RegionItem = ({
    regionName,
    checked,
    onChange
}) => {
    return (
        <label className="resultsSummaryRegionField">
            <input type="checkbox" name="regions" className="resultsSummaryRegionFieldInputBox"
                onChange={onChange}
                value={regionName}
                checked={checked}
            />
            {regionName}
        </label>
    )
}
 
export default RegionItem