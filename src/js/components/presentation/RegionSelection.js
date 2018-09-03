//========================================================================
// Choose which regions to display
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'
import RegionItem from './RegionItem.js'

// Region selection checkboxes 
const RegionSelection = ({
    regionsVisible,
    regions,
    clearAll,
    selectAll,
    onRegionChange
}) => {
    if (regionsVisible) {

        return (
            <article className="resultsSummaryRegionArea">
                <form>
                    <fieldset className="resultsSummaryRegionFieldset">
                        <div className="resultsSummaryRegionButtons">
                            <button type="button" className="resultsSummaryRegionButton"
                                onClick={clearAll}>
                                Clear All
                            </button>
                            <button type="button" className="resultsSummaryRegionButton"
                                onClick={selectAll}>
                                Select All
                            </button>
                        </div>
                        {regions.map(region =>
                            <RegionItem
                                regionName={region.regionName}
                                checked={region.checked}
                                onChange={() => {onRegionChange(region.regionName, region.checked)}}
                                key={region.regionName}
                            />
                        )}
                    </fieldset>
                </form>
            </article>
        )

    } else {
        return (null)
    }
}

export default RegionSelection
