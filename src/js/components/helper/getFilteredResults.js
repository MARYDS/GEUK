const getFilteredResults = (
    results,
    searchTerm,
    yearFilter,
    regionsSelected,
    partiesSelected
) => {

    // Default if there is no search term
    var isIncludedInSearch = true
    // Get search term as lowercase
    var searchTermLC = searchTerm.toLowerCase()

    // Filter by year, region, party and search term  
    var filterResults = results.filter((conRes) => {
        // Check for correct year
        if (conRes.year == yearFilter) {
            // Get region selected checkbox setting for item's region 
            var regionStatic =
                regionsSelected.filter(region => {
                    return conRes.reg == region.regionName
                })
            if (regionStatic[0].checked) {
                // Get party selected checkbox setting for item's party 
                var partyStatic =
                    partiesSelected.filter(party => {
                        return conRes.party == party.partyName
                    })
                if (partyStatic[0].checked) {
                    // If search term entered, is it in MP name, Constituency,
                    // Region or Party for item ?
                    if (searchTerm != "") {
                        isIncludedInSearch =
                            conRes.mp.toLowerCase().search(searchTermLC) !== -1 ||
                            conRes.con.toLowerCase().search(searchTermLC) !== -1 ||
                            conRes.reg.toLowerCase().search(searchTermLC) !== -1 ||
                            conRes.party.toLowerCase().search(searchTermLC) !== -1
                    }
                    return isIncludedInSearch
                }
            }
        }
        return false
    });
    return filterResults
}

export default getFilteredResults