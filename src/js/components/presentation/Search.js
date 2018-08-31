//========================================================================
// Search box
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'

// Search box area
const Search = ({
    searchTerm,
    searchChangeHandler
}) => {
    return (
        <div className="resultsSummarySearchArea">
            <form>
                <input type="text" className="resultsSummarySearchBox"
                    placeholder="Search"
                    onChange={searchChangeHandler}
                    value={searchTerm} />
            </form>
        </div>
    )
}

export default Search;