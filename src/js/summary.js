//========================================================================
// Summary Results list
//========================================================================
import React from 'react'
import { render } from 'react-dom'

import YearSelection from './yearselection.js';
import RegionSelection from './regionselection.js';
import PartySelection from './partyselection.js';
import SortOrderSelection from './sortorder.js';
import Search from './search.js';
import ShowButtons from './showbuttons.js';
import DetailResults from './detail.js';
var summaryData = require("./summarydata.js");

// Main title for the page
class MainTitle extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <header>
                <div className="mainTitleArea" id="mainTitleArea">
                    <h1 className="mainTitle">{this.props.selectedResultsYear}&nbsp;UK election results</h1>
                </div>
                <div className="mainTitleBlock">
                    <h1 className="mainTitle">{this.props.selectedResultsYear}&nbsp;UK election results</h1>
                </div>
            </header>
        )
    }
}

// Main footer for the page
class MainFooter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <footer>
                <div className="mainFooterArea">
                    <span className="mainFooter">2017 Election results mainly from&nbsp;
<a href="http://researchbriefings.parliament.uk/ResearchBriefing/Summary/CBP-7979">House of Commons library briefing</a> and news media reports,&nbsp;
            </span>
                    <span className="mainFooter">2015 Election results mainly from&nbsp;
<a href="http://researchbriefings.parliament.uk/ResearchBriefing/Summary/CBP-7186">House of Commons library briefing</a>,&nbsp;
            </span>
                    <span className="mainFooter">2010 Election results mainly from&nbsp;
<a href="http://www.electoralcommission.org.uk/our-work/our-research/electoral-data/electoral-data-files-and-reports"
                        >Electoral Commission, UK Parliament general election</a>, published 6 May 2010.&nbsp;
            </span>
                    <span className="mainFooter">EU Referendum results mainly from&nbsp;
<a href="https://www.electoralcommission.org.uk/our-work/our-research/electoral-data/electoral-data-files-and-reports"
                        >Electoral Commission, Referendum on the UK membership of the EU</a>, published 23
                      June 2016.&nbsp;
            </span>
                    <span className="mainFooter">MP photes from&nbsp;
<a href="https://beta.parliament.uk"
                        >UK Parliament Beta site</a>, which are under an <a href="https://creativecommons.org/licenses/by/3.0/">Attribution 3.0 Unported (CC BY 3.0)</a> license.
            </span>&nbsp;
        
         </div>
                <div className="mainFooterBlock">
                    &nbsp;
         </div>
            </footer>
        )
    }
}
// Table heading for results summary list
class SummaryHeading extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <thead>
                <tr>
                    <th colSpan="2" className="summListCon">Constituency / Region</th>
                    <th colSpan="2" className="summListMP">Elected MP / Party</th>
                    <th colSpan="2" className="summListMar">Margin %</th>
                </tr>
            </thead>
        )
    }
}

// Summary results one constituency result row
class SummaryItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <tbody>
                <tr onClick={this.props.clickEventHandler} id={this.props.conRes.con}>
                    <td className="summListL1 summListPrev1"
                        style={{ backgroundColor: this.props.conRes.prev }}
                        title={"Previous: " + this.props.conRes.prevparty}>
                        &nbsp;
               </td>
                    <td className="summListL1 summListCon" >
                        {this.props.conRes.con}
                    </td>
                    <td className="summListL1 summListCurr1"
                        style={{ backgroundColor: this.props.conRes.curr }}
                        title={"Current: " + this.props.conRes.party}>
                        &nbsp;
               </td>
                    <td className="summListL1 summListMP">
                        {this.props.conRes.mp}
                    </td>
                    <td className="summListL1 summListMar">
                        {this.props.conRes.mar.toFixed(1)}
                    </td>
                    <td className="summListL1 summListSec1"
                        style={{ backgroundColor: this.props.conRes.sec }}
                        title={"Second Party: " + this.props.conRes.secparty}>
                        &nbsp;
               </td>
                </tr>
                <tr onClick={this.props.clickEventHandler} id={this.props.conRes.con}>
                    <td className="summListL2 summListPrev2"
                        style={{ backgroundColor: this.props.conRes.prev }}
                        title={"Previous: " + this.props.conRes.prevparty}>
                        &nbsp;
               </td>
                    <td className="summListL2 summListReg">
                        {this.props.conRes.reg}
                    </td>
                    <td className="summListL2 summListCurr2"
                        style={{ backgroundColor: this.props.conRes.curr }}
                        title={"Current: " + this.props.conRes.party}>
                        &nbsp;
               </td>
                    <td className="summListL2 summListParty">
                        {this.props.conRes.party}
                    </td>
                    <td className="summListL2 summListEmpty">
                        &nbsp;
               </td>
                    <td className="summListL2 summListSec2"
                        style={{ backgroundColor: this.props.conRes.sec }}
                        title={"Second Party: " + this.props.conRes.secparty}>
                        &nbsp;
               </td>
                </tr>
            </tbody>
        )
    }
}

// Summary results all constituencies
class SummaryResults extends React.Component {

    constructor(props) {
        super(props)

        // Will replace hardcoded lists with database later
        this.state = {
            selectedResultsYear: "2017",
            searchTerm: "",
            selectYearDisplayed: false,
            selectRegionsDisplayed: false,
            selectPartiesDisplayed: false,
            selectSortOptionsDisplayed: false,
            selectedConstituencyName: "Basildon and Billericay",
            years: [
                { year: "2017+", checked: false },
                { year: "2017", checked: true },
                { year: "2015+", checked: false },
                { year: "2015", checked: false },
                { year: "2010+", checked: false },
                { year: "2010", checked: false }
            ],
            regions: [
                { regionName: "East", checked: true },
                { regionName: "East Midlands", checked: true },
                { regionName: "London", checked: true },
                { regionName: "North East", checked: true },
                { regionName: "North West", checked: true },
                { regionName: "Northern Ireland", checked: true },
                { regionName: "Scotland", checked: true },
                { regionName: "South East", checked: true },
                { regionName: "South West", checked: true },
                { regionName: "Wales", checked: true },
                { regionName: "West Midlands", checked: true },
                { regionName: "Yorkshire and The Humber", checked: true }
            ],
            parties: [
                { partyName: "Conservative", checked: true },
                { partyName: "Labour", checked: true },
                { partyName: "Liberal Democrats", checked: true },
                { partyName: "Green", checked: true },
                { partyName: "Scottish National Party", checked: true },
                { partyName: "Plaid Cymru", checked: true }, { partyName: "Respect", checked: true },
                { partyName: "UK Independence Party", checked: true },
                { partyName: "Alliance", checked: true },
                { partyName: "Ulster Unionist Party", checked: true },
                { partyName: "Democratic Unionist Party", checked: true },
                { partyName: "Social Democratic and Labour Party", checked: true },
                { partyName: "Sinn Fein", checked: true },
                { partyName: "Independent", checked: true },
                { partyName: "Speaker", checked: true }
            ],
            sortOrder: [
                { itemName: "Region", ascending: true },
                { itemName: "Constituency", ascending: true },
                { itemName: "Party", ascending: true },
                { itemName: "MP", ascending: true },
                { itemName: "Margin", ascending: true },
                { itemName: "Prev_Party", ascending: true },
                { itemName: "2nd_Party", ascending: true }
            ]
        }
        this.searchChangeHandler = this.searchChangeHandler.bind(this)
        this.yearChangeHandler = this.yearChangeHandler.bind(this)
        this.regionChangeHandler = this.regionChangeHandler.bind(this)
        this.regionClearAllHandler = this.regionClearAllHandler.bind(this)
        this.regionSelectAllHandler = this.regionSelectAllHandler.bind(this)
        this.partyChangeHandler = this.partyChangeHandler.bind(this)
        this.partyClearAllHandler = this.partyClearAllHandler.bind(this)
        this.partySelectAllHandler = this.partySelectAllHandler.bind(this)
        this.sortOrderChangeHandler = this.sortOrderChangeHandler.bind(this)
        this.sortOrderClickHandler = this.sortOrderClickHandler.bind(this)
        this.selectYearClickHandler = this.selectYearClickHandler.bind(this)
        this.selectRegionsClickHandler = this.selectRegionsClickHandler.bind(this)
        this.selectPartiesClickHandler = this.selectPartiesClickHandler.bind(this)
        this.selectSortOptionsClickHandler = this.selectSortOptionsClickHandler.bind(this)
        this.selectConstituencyClickHandler = this.selectConstituencyClickHandler.bind(this)
        this.getResults = this.getResults.bind(this)
        this.filterResults = this.filterResults.bind(this)
        this.sortResults = this.sortResults.bind(this)
    }

    // Search term changed, change class state  
    searchChangeHandler(event) {
        this.setState({ searchTerm: event.target.value })
    }

    // Year button changed in year selection, change class state
    yearChangeHandler(event) {
        var selectedYear = this.state.selectedResultsYear
        var newYears = this.state.years.map(year => {
            if (year.year == event.target.value) {
                year.checked = event.target.checked
                if (event.target.checked) {
                    selectedYear = event.target.value
                }
            } else {
                if (event.target.checked) {
                    year.checked = false
                }
            }
            return year
        })

        this.setState({ years: newYears }, () =>
            this.setState({ selectedResultsYear: selectedYear })
        )
    }

    // Region checkbox changed in region selection, change class state
    regionChangeHandler(event) {
        var newRegions = this.state.regions.map(region => {
            if (region.regionName == event.target.value) {
                region.checked = event.target.checked
            }
            return region
        })
        this.setState({ regions: newRegions })
    }

    // Clear all regions checkboxes button clicked, change class state
    regionClearAllHandler(event) {
        var newRegions = this.state.regions.map(region => {
            region.checked = false
            return region
        })
        this.setState({ regions: newRegions })
    }

    // Select all regions checkboxes button clicked, change class state  
    regionSelectAllHandler(event) {
        var newRegions = this.state.regions.map(region => {
            region.checked = true
            return region
        })
        this.setState({ regions: newRegions })
    }

    // Party checkbox changed in party selection, change class state  
    partyChangeHandler(event) {
        var newParties = this.state.parties.map(party => {
            if (party.partyName == event.target.value) {
                party.checked = event.target.checked
            }
            return party
        })
        this.setState({ parties: newParties })
    }

    // Clear all parties checkboxes button clicked, change class state
    partyClearAllHandler(event) {
        var newParties = this.state.parties.map(party => {
            party.checked = false
            return party
        })
        this.setState({ parties: newParties })
    }

    // Select all parties checkboxes button clicked, change class state   
    partySelectAllHandler(event) {
        var newParties = this.state.parties.map(party => {
            party.checked = true
            return party
        })
        this.setState({ parties: newParties })
    }

    // Clicked on sort item, change ascending/descending class state for item
    sortOrderClickHandler(event) {

        var newSortOrder = this.state.sortOrder.map(sortItem => {
            if (sortItem.itemName == event.target.id) {
                sortItem.ascending = !sortItem.ascending
            }
            return sortItem
        })

        this.setState({ sortOrder: newSortOrder })
    }

    // Sort order button moved, change it's position in class state array 
    sortOrderChangeHandler(event) {
        event.preventDefault();

        var buttonToMoveId = event.dataTransfer.getData("text")
        var buttonToPutBefore = event.target.id
        var buttonToMoveAsc = true

        document.getElementById(buttonToMoveId).style.opacity = '1.0'

        // Remove the "move from" button storing its ascending value
        var newSortOrder = this.state.sortOrder.filter(sortItem => {
            if (sortItem.itemName == buttonToMoveId) {
                buttonToMoveAsc = sortItem.ascending
            }
            return sortItem.itemName != buttonToMoveId
        })

        // Insert "move from" button before "move to" button
        for (var i = 0; i < newSortOrder.length; i++) {
            if (newSortOrder[i].itemName == buttonToPutBefore) {
                var itemToInsert = { itemName: buttonToMoveId, ascending: buttonToMoveAsc }
                newSortOrder.splice(i, 0, itemToInsert)
                break
            }
        }

        this.setState({ sortOrder: newSortOrder })
    }

    // Button to show/hide the select year panel clicked, toggle show state
    selectYearClickHandler(event) {
        let newSelectYear = !this.state.selectYearDisplayed
        this.setState({ selectYearDisplayed: newSelectYear })
    }

    // Button to show/hide the select regions panel clicked, toggle show state
    selectRegionsClickHandler(event) {
        let newSelectRegion = !this.state.selectRegionsDisplayed
        this.setState({ selectRegionsDisplayed: newSelectRegion })
    }

    // Button to show/hide the select parties panel clicked, toggle show state
    selectPartiesClickHandler(event) {
        let newSelectParty = !this.state.selectPartiesDisplayed
        this.setState({ selectPartiesDisplayed: newSelectParty })
    }

    // Button to show/hide the select sort options panel clicked, toggle show state
    selectSortOptionsClickHandler(event) {
        let newSelectSortOption = !this.state.selectSortOptionsDisplayed
        this.setState({ selectSortOptionsDisplayed: newSelectSortOption })
    }

    // Constituency row clicked on the summary results table, set as selected
    selectConstituencyClickHandler(event) {
        this.setState({ selectedConstituencyName: event.target.parentElement.id })
    }

    // Sort constituency results that have already been filtered  
    sortResults(filteredResults) {
        // For each of the 7 possible sort fields, set -1/0/1 for order  
        // 'or' the results to if sort required - 0 equates to false, -1/1 true
        // Switch input element comparess based on ascending/descending required
        var sortedResults = filteredResults.sort((a, b) => {

            var res = [0, 0, 0, 0, 0, 0, 0]
            for (var i = 0; i < this.state.sortOrder.length; i++) {

                switch (this.state.sortOrder[i].itemName) {

                    case "Region":
                        if (this.state.sortOrder[i].ascending) {
                            res[i] = a.reg < b.reg ? -1 : a.reg > b.reg ? 1 : 0;
                        } else {
                            res[i] = a.reg > b.reg ? -1 : a.reg < b.reg ? 1 : 0;
                        }
                        break;

                    case "Constituency":
                        if (this.state.sortOrder[i].ascending) {
                            res[i] = a.con < b.con ? -1 : a.con > b.con ? 1 : 0;
                        } else {
                            res[i] = a.con > b.con ? -1 : a.con < b.con ? 1 : 0;
                        }
                        break;

                    case "Party":
                        if (this.state.sortOrder[i].ascending) {
                            res[i] = a.party < b.party ? -1 : a.party > b.party ? 1 : 0;
                        } else {
                            res[i] = a.party > b.party ? -1 : a.party < b.party ? 1 : 0;
                        }
                        break;

                    case "MP":
                        if (this.state.sortOrder[i].ascending) {
                            res[i] = a.mprev < b.mprev ? -1 : a.mprev > b.mprev ? 1 : 0;
                        } else {
                            res[i] = a.mprev > b.mprev ? -1 : a.mprev < b.mprev ? 1 : 0;
                        }
                        break;

                    case "Prev_Party":
                        if (this.state.sortOrder[i].ascending) {
                            res[i] = a.prevparty < b.prevparty ? -1 : a.prevparty > b.prevparty ? 1 : 0;
                        } else {
                            res[i] = a.prevparty > b.prevparty ? -1 : a.prevparty < b.prevparty ? 1 : 0;
                        }
                        break;

                    case "2nd_Party":
                        if (this.state.sortOrder[i].ascending) {
                            res[i] = a.secparty < b.secparty ? -1 : a.secparty > b.secparty ? 1 : 0;
                        } else {
                            res[i] = a.secparty > b.secparty ? -1 : a.secparty < b.secparty ? 1 : 0;
                        }
                        break;

                    case "Margin":
                        if (this.state.sortOrder[i].ascending) {
                            res[i] = parseFloat(a.mar) < parseFloat(b.mar) ? -1 :
                                parseFloat(a.mar) > parseFloat(b.mar) ? 1 : 0;
                        } else {
                            res[i] = parseFloat(a.mar) > parseFloat(b.mar) ? -1 :
                                parseFloat(a.mar) < parseFloat(b.mar) ? 1 : 0;
                        }
                        break;
                } // switch
            } // for

            return (res[0] || res[1] || res[2] || res[3] || res[4])
        }) // sort

        return sortedResults
    }

    // Filter the overall results list by Election Year/Region/Party/Search term
    filterResults(results) {

        // Default if there is no search term
        var isIncludedInSearch = true

        // Get search term as lowercase
        var searchTermLC = this.state.searchTerm.toLowerCase()

        // Filter by year, region, party and search term  
        var filteredResults = results.filter((conRes) => {

            // Check for correct year
            if (conRes.year == this.state.selectedResultsYear) {

                // Get region selected checkbox setting for item's region 
                var regionStatic = this.state.regions.filter(region => {
                    return conRes.reg == region.regionName
                })
                if (regionStatic[0].checked) {

                    // Get party selected checkbox setting for item's party 
                    var partyStatic = this.state.parties.filter(party => {
                        return conRes.party == party.partyName
                    })
                    if (partyStatic[0].checked) {

                        // If search term entered, is it in MP name, Constituency,
                        // Region or Party for item ?
                        if (this.state.searchTerm != "") {
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

        return filteredResults
    }

    // Render the HTML components 
    render() {

        // Get the election results and filter and sort them based on entered selections
        var sortedFilteredResults = this.sortResults(this.filterResults(this.getResults()))
        return (
            <div className="mainResultsPage">

                <MainTitle selectedResultsYear={this.state.selectedResultsYear} />
                <main>
                    <DetailResults selectedResultsYear={this.state.selectedResultsYear}
                        resultYears={this.state.years}
                        selectedConstituencyName={this.state.selectedConstituencyName} />

                    <section id="summaryResultsHeading">


                        <YearSelection years={this.state.years}
                            yearChangeHandler={this.yearChangeHandler}
                            selectYearDisplayed={this.state.selectYearDisplayed} />

                        <RegionSelection regions={this.state.regions}
                            regionChangeHandler={this.regionChangeHandler}
                            regionClearAllHandler={this.regionClearAllHandler}
                            regionSelectAllHandler={this.regionSelectAllHandler}
                            selectRegionsDisplayed={this.state.selectRegionsDisplayed} />

                        <PartySelection parties={this.state.parties}
                            partyChangeHandler={this.partyChangeHandler}
                            partyClearAllHandler={this.partyClearAllHandler}
                            partySelectAllHandler={this.partySelectAllHandler}
                            selectPartiesDisplayed={this.state.selectPartiesDisplayed} />

                        <SortOrderSelection sortOrder={this.state.sortOrder}
                            sortOrderChangeHandler={this.sortOrderChangeHandler}
                            sortOrderClickHandler={this.sortOrderClickHandler}
                            selectSortOptionsDisplayed={this.state.selectSortOptionsDisplayed} />

                        <Search searchTerm={this.state.searchTerm}
                            searchChangeHandler={this.searchChangeHandler} />


                        <ShowButtons selectSortOptionsClickHandler={this.selectSortOptionsClickHandler}
                            selectYearClickHandler={this.selectYearClickHandler}
                            selectRegionsClickHandler={this.selectRegionsClickHandler}
                            selectPartiesClickHandler={this.selectPartiesClickHandler}
                            selectYearDisplayed={this.state.selectYearDisplayed}
                            selectRegionsDisplayed={this.state.selectRegionsDisplayed}
                            selectPartiesDisplayed={this.state.selectPartiesDisplayed}
                            selectSortOptionsDisplayed={this.state.selectSortOptionsDisplayed} />

                    </section>
                    <section className="resultsSummaryConstituencies">
                        <table className="resultsSummaryTable">
                            <SummaryHeading />
                            {sortedFilteredResults.map(conRes =>
                                <SummaryItem conRes={conRes} key={conRes.con}
                                    clickEventHandler={this.selectConstituencyClickHandler} />
                            )}
                        </table>
                    </section>
                </main>
                <MainFooter />

            </div>
        )
    }

    getResults() {
        return summaryData
    }

}

export default SummaryResults;
