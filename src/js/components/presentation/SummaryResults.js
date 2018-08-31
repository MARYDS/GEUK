//========================================================================
// Summary Results list for all constituencies
// (Invoked from main App)
//========================================================================
import React from 'react'

import MainTitle from './MainTitle.js';
import MainFooter from './MainFooter.js';
import Search from './Search.js';
import YearSelection from '../container/YearSelection.js';
import RegionSelection from '../container/RegionSelection.js';
import PartySelection from '../container/PartySelection.js';
import SortOrderSelection from './SortSelection.js';
import ShowButtons from '../container/ShowButtons.js';
import DetailResults from '../container/DetailResults.js';
import SummaryHeading from './SummaryHeading.js';
import SummaryItem from './SummaryItem.js';
import getFilteredResults from '../helper/getFilteredResults.js';
import getSortedResults from '../helper/getSortedResults.js';

// Summary results all constituencies
class SummaryResults extends React.Component {

    constructor(props) {
        super(props)

        // Will replace hardcoded lists with database later
        this.state = {
            searchTerm: "",
            selectedConstituencyName: 'Basildon and Billericay',
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
        this.selectConstituencyClickHandler = this.selectConstituencyClickHandler.bind(this)
        this.sortOrderChangeHandler = this.sortOrderChangeHandler.bind(this)
        this.sortOrderClickHandler = this.sortOrderClickHandler.bind(this)
    }

    // Search term changed, change class state  
    searchChangeHandler(event) {
        this.setState({ searchTerm: event.target.value })
    }

    // Constituency row clicked on the summary results table, set as selected
    selectConstituencyClickHandler(event) {
        this.setState({ selectedConstituencyName: event.target.parentElement.id })
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

    // Render the HTML components 
    render() {

        // Get the election results and filter and sort them based on entered selections
        var sortedFilteredResults = 
            getSortedResults(
                getFilteredResults(
                    this.props.store.summaryResults, 
                    this.state.searchTerm, 
                    this.props.store.yearFilter,
                    this.props.store.regionsSelected,
                    this.props.store.partiesSelected
                ),
                this.state.sortOrder
            )

        return (
            <div className="mainResultsPage">

                <MainTitle yearFilter={this.props.store.yearFilter}/>
                <main>
                    <DetailResults 
                        selectedConstituencyName={this.state.selectedConstituencyName} />

                    <section id="summaryResultsHeading">
                        <YearSelection />
                        <RegionSelection />
                        <PartySelection />

                        <SortOrderSelection sortOrder={this.state.sortOrder}
                            sortOrderChangeHandler={this.sortOrderChangeHandler}
                            sortOrderClickHandler={this.sortOrderClickHandler}
                            selectSortOptionsDisplayed={this.props.store.sortOptionsVisible} />

                        <Search searchTerm={this.searchTerm}
                                searchChangeHandler={this.searchChangeHandler}/>
                        <ShowButtons />

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

}

export default SummaryResults