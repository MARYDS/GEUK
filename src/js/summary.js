//========================================================================
// Summary Results list
//========================================================================
import React from 'react'
import {render} from 'react-dom'

import YearSelection from './yearselection.js';
import RegionSelection from './regionselection.js';
import PartySelection from './partyselection.js';
import SortOrderSelection from './sortorder.js';
import Search from './search.js';
import ShowButtons from './showbuttons.js';
import DetailResults from './detail.js';

// Main title for the page
class MainTitle extends React.Component {
   constructor(props){
      super(props)
   }  
   render() {
      return (
         <div className="mainTitleArea">
            <h2 className="mainTitle">{this.props.selectedResultsYear}&nbsp;UK election results</h2>
         </div>         
      )
   }    
}

// Table heading for results summary list
class SummaryHeading extends React.Component {
   constructor(props){
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
   constructor(props){
      super(props)
   }
   render() {
      return ( 
         <tbody>
            <tr onClick={this.props.clickEventHandler} id={this.props.conRes.con}>
               <td className="summListL1 summListPrev1"
                  style={{backgroundColor: this.props.conRes.prev}}
                  title={"Previous: " + this.props.conRes.prevparty}>
                  &nbsp;
               </td>
               <td className="summListL1 summListCon" > 
                 {this.props.conRes.con}
               </td>
               <td className="summListL1 summListCurr1" 
                   style={{backgroundColor: this.props.conRes.curr}}
                    title={"Current: " + this.props.conRes.party}>
                 &nbsp;
               </td>
               <td className="summListL1 summListMP">
                 {this.props.conRes.mp}
               </td>
               <td className="summListL1 summListMar">
                 {this.props.conRes.mar.toLocaleString()}
               </td>
               <td className="summListL1 summListSec1" 
                   style={{backgroundColor: this.props.conRes.sec}}
                   title={"Second Party: " + this.props.conRes.secparty}>
                 &nbsp;
               </td> 
           </tr> 
           <tr onClick={this.props.clickEventHandler} id={this.props.conRes.con}>
               <td className="summListL2 summListPrev2" 
                   style={{backgroundColor: this.props.conRes.prev}}
                   title={"Previous: " + this.props.conRes.prevparty}>
                   &nbsp;
               </td>            
               <td className="summListL2 summListReg">
                  {this.props.conRes.reg}
               </td>
               <td className="summListL2 summListCurr2" 
                   style={{backgroundColor: this.props.conRes.curr}}
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
                   style={{backgroundColor: this.props.conRes.sec}}
                   title={"Second Party: " + this.props.conRes.secparty}>
                   &nbsp;
               </td>          
           </tr>
        </tbody>
     )
  }
}

// Summary results all constituencies
class SummaryResults extends React.Component{

   constructor(props){
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
                                {year: "2017", checked: true}, 
                                {year: "2015+", checked: false},
                                {year: "2015", checked: false},
                                {year: "2010+", checked: false},
                                {year: "2010", checked: false}
                      ],
                      regions: [
                                {regionName: "East", checked: true}, 
                                {regionName: "East Midlands", checked: true},
                                {regionName: "London", checked: true},
                                {regionName: "North East", checked: true},
                                {regionName: "North West", checked: true},
                                {regionName: "Northern Ireland", checked: true},
                                {regionName: "Scotland", checked: true},
                                {regionName: "South East", checked: true},
                                {regionName: "South West", checked: true},
                                {regionName: "Wales", checked: true},
                                {regionName: "West Midlands", checked: true},
                                {regionName: "Yorkshire and The Humber",checked: true} 
                       ],
                       parties: [
                                {partyName: "Conservative", checked: true}, 
                                {partyName: "Labour", checked: true},   
                                {partyName: "Liberal Democrats", checked: true},
                                {partyName: "Green", checked: true},
                                {partyName: "Scottish National Party", checked: true},
                                {partyName: "Plaid Cymru", checked: true},                                                                 {partyName: "Respect", checked: true},
                                {partyName: "UK Independence Party", checked: true},
                                {partyName: "Alliance", checked: true}, 
                                {partyName: "Ulster Unionist Party", checked: true}, 
                                {partyName: "Democratic Unionist Party", checked: true},
                                {partyName: "Social Democratic and Labour Party", checked: true},
                                {partyName: "Sinn Fein", checked: true},
                                {partyName: "Independent", checked: true},
                                {partyName: "Speaker", checked: true}
                        ],
                             sortOrder: [
                                {itemName: "Region", ascending: true}, 
                                {itemName: "Constituency", ascending: true},
                                {itemName: "Party", ascending: true},
                                {itemName: "MP", ascending: true},
                                {itemName: "Margin", ascending: true},
                                {itemName: "Prev_Party", ascending: true},
                                {itemName: "2nd_Party", ascending: true}
                        ]  
                     }
        this.searchChangeHandler = this.searchChangeHandler.bind(this)
        this.yearChangeHandler = this.yearChangeHandler.bind(this)
        this.regionChangeHandler = this.regionChangeHandler.bind(this)
        this.regionClearAllHandler = this.regionClearAllHandler.bind(this)
        this.regionSelectAllHandler  = this.regionSelectAllHandler.bind(this)
        this.partyChangeHandler = this.partyChangeHandler.bind(this)
        this.partyClearAllHandler = this.partyClearAllHandler.bind(this)
        this.partySelectAllHandler  = this.partySelectAllHandler.bind(this)
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
    searchChangeHandler(event){
        this.setState({searchTerm: event.target.value})
    }

    // Year button changed in year selection, change class state
    yearChangeHandler(event){
        var selectedYear = this.state.selectedResultsYear
        var newYears = this.state.years.map(year => {
          if (year.year == event.target.value){
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

        this.setState({years: newYears}, () =>
           this.setState({selectedResultsYear: selectedYear})
        )
    }

    // Region checkbox changed in region selection, change class state
    regionChangeHandler(event){
        var newRegions = this.state.regions.map(region => {
          if (region.regionName == event.target.value){
              region.checked = event.target.checked
          }
          return region
        })
        this.setState({regions: newRegions})
    }
  
    // Clear all regions checkboxes button clicked, change class state
    regionClearAllHandler(event){
        var newRegions = this.state.regions.map(region => { 
           region.checked = false
           return region
        })
        this.setState({regions: newRegions})        
    } 

    // Select all regions checkboxes button clicked, change class state  
    regionSelectAllHandler(event){
        var newRegions = this.state.regions.map(region => { 
           region.checked = true
           return region
        })
        this.setState({regions: newRegions})        
    } 

    // Party checkbox changed in party selection, change class state  
    partyChangeHandler(event){
        var newParties = this.state.parties.map(party => {
          if (party.partyName == event.target.value){
              party.checked = event.target.checked
          }
          return party
        })
        this.setState({parties: newParties})
    }

    // Clear all parties checkboxes button clicked, change class state
    partyClearAllHandler(event){
        var newParties = this.state.parties.map(party => { 
           party.checked = false
           return party
        })
        this.setState({parties: newParties})        
    } 

    // Select all parties checkboxes button clicked, change class state   
    partySelectAllHandler(event){
        var newParties = this.state.parties.map(party => { 
           party.checked = true
           return party
        })
        this.setState({parties: newParties})        
    } 

     // Clicked on sort item, change ascending/descending class state for item
    sortOrderClickHandler(event){  
      
       var newSortOrder = this.state.sortOrder.map(sortItem => {
          if (sortItem.itemName == event.target.id) {
            sortItem.ascending = !sortItem.ascending
          }
          return sortItem
       })
      
       this.setState({sortOrder: newSortOrder})
    }

    // Sort order button moved, change it's position in class state array 
    sortOrderChangeHandler(event){  
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
       for (var i=0; i<newSortOrder.length; i++) {
          if (newSortOrder[i].itemName == buttonToPutBefore) {
             var itemToInsert = {itemName: buttonToMoveId,  ascending: buttonToMoveAsc}
             newSortOrder.splice(i, 0, itemToInsert) 
             break
          }
       }  
      
       this.setState({sortOrder: newSortOrder})
    }
  
    // Button to show/hide the select year panel clicked, toggle show state
    selectYearClickHandler(event) { 
       let newSelectYear = !this.state.selectYearDisplayed
       this.setState({selectYearDisplayed: newSelectYear})
    }

    // Button to show/hide the select regions panel clicked, toggle show state
    selectRegionsClickHandler(event) { 
       let newSelectRegion = !this.state.selectRegionsDisplayed
       this.setState({selectRegionsDisplayed: newSelectRegion})
    }

    // Button to show/hide the select parties panel clicked, toggle show state
    selectPartiesClickHandler(event) { 
       let newSelectParty = !this.state.selectPartiesDisplayed
       this.setState({selectPartiesDisplayed: newSelectParty})
    }

    // Button to show/hide the select sort options panel clicked, toggle show state
    selectSortOptionsClickHandler(event) {   
       let newSelectSortOption = !this.state.selectSortOptionsDisplayed
       this.setState({selectSortOptionsDisplayed: newSelectSortOption})
    }

    // Constituency row clicked on the summary results table, set as selected
    selectConstituencyClickHandler(event) { 
       this.setState({selectedConstituencyName: event.target.parentElement.id})
    }
  
    // Sort constituency results that have already been filtered  
    sortResults(filteredResults) {
       // For each of the 7 possible sort fields, set -1/0/1 for order  
       // 'or' the results to if sort required - 0 equates to false, -1/1 true
       // Switch input element comparess based on ascending/descending required
       var sortedResults = filteredResults.sort((a, b) => {
    
          var res = [0,0,0,0,0,0,0]            
          for (var i=0; i<this.state.sortOrder.length; i++) {
          
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
                      res[i] = a.party < b.party ? -1 : a.party > b.party ? 1 :0;
                   } else {
                      res[i] = a.party > b.party ? -1 : a.party < b.party ? 1 :0;
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
   
          return(res[0] || res[1] || res[2] || res[3] || res[4])                     
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

              <MainTitle selectedResultsYear = {this.state.selectedResultsYear} />

              <DetailResults selectedResultsYear = {this.state.selectedResultsYear} 
                             resultYears = {this.state.years}
                             selectedConstituencyName = {this.state.selectedConstituencyName}/>
           
              <div id="summaryResultsHeading">  
                

                 <YearSelection years={this.state.years} 
                                 yearChangeHandler = {this.yearChangeHandler}
                                 selectYearDisplayed = {this.state.selectYearDisplayed}/>

                 <RegionSelection regions={this.state.regions} 
                                 regionChangeHandler = {this.regionChangeHandler}
                                 regionClearAllHandler = {this.regionClearAllHandler}
                                 regionSelectAllHandler = {this.regionSelectAllHandler}
                                 selectRegionsDisplayed = {this.state.selectRegionsDisplayed}/>
 
                 <PartySelection parties={this.state.parties} 
                                 partyChangeHandler = {this.partyChangeHandler} 
                                 partyClearAllHandler = {this.partyClearAllHandler}
                                 partySelectAllHandler = {this.partySelectAllHandler}
                                 selectPartiesDisplayed = {this.state.selectPartiesDisplayed}/>
  
                 <SortOrderSelection sortOrder={this.state.sortOrder} 
                                     sortOrderChangeHandler = {this.sortOrderChangeHandler} 
                                     sortOrderClickHandler = {this.sortOrderClickHandler} 
                                     selectSortOptionsDisplayed = {this.state.selectSortOptionsDisplayed}/>
           
                 <Search searchTerm={this.state.searchTerm} 
                         searchChangeHandler = {this.searchChangeHandler}/>
 

                 <ShowButtons selectSortOptionsClickHandler = {this.selectSortOptionsClickHandler} 
                              selectYearClickHandler = {this.selectYearClickHandler}
                              selectRegionsClickHandler = {this.selectRegionsClickHandler}
                              selectPartiesClickHandler = {this.selectPartiesClickHandler} 
                              selectYearDisplayed = {this.state.selectYearDisplayed}
                              selectRegionsDisplayed = {this.state.selectRegionsDisplayed}
                              selectPartiesDisplayed = {this.state.selectPartiesDisplayed}
                              selectSortOptionsDisplayed = {this.state.selectSortOptionsDisplayed} />           
           
              </div>
              <div className="resultsSummaryConstituencies">
                  <table className = "resultsSummaryTable">
                      <SummaryHeading />
                      {sortedFilteredResults.map( conRes => 
                          <SummaryItem conRes={conRes} key = {conRes.con}  
                                       clickEventHandler={this.selectConstituencyClickHandler} />
                      )}
                  </table>
              </div>
           
           </div>
        )
    }
  
    getResults() {
        // Will come from database in future     
        return [
{year:"2015",con:"Aberavon",mp:"Stephen Kinnock",mprev:"Kinnock Stephen",mar: 33.13,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Aberconwy",mp:"Guto Bebb",mprev:"Bebb Guto",mar: 13.26,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Aberdeen North",mp:"Kirsty Blackman",mprev:"Blackman Kirsty",mar: 30.49,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Aberdeen South",mp:"Callum McCaig",mprev:"McCaig Callum",mar: 14.89,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Airdrie and Shotts",mp:"Neil Gray",mprev:"Gray Neil",mar: 19.82,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Aldershot",mp:"Gerald Howarth",mprev:"Howarth Gerald",mar: 32.26,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Aldridge-Brownhills",mp:"Wendy Morton",mprev:"Morton Wendy",mar: 29.68,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Altrincham and Sale West",mp:"Graham Brady",mprev:"Brady Graham",mar: 26.31,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Alyn and Deeside",mp:"Mark Tami",mprev:"Tami Mark",mar: 8.09,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Amber Valley",mp:"Nigel Mills",mprev:"Mills Nigel",mar: 9.2,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Angus",mp:"Mike Weir",mprev:"Weir Mike",mar: 25.24,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2015",con:"Arfon",mp:"Hywel Williams",mprev:"Williams Hywel",mar: 13.67,reg:"Wales",party:"Plaid Cymru",prev:"#008142",curr:"#008142",sec:"#DC241f",prevparty: "Plaid Cymru",secparty:"Labour"},
{year:"2015",con:"Argyll and Bute",mp:"Brendan O'Hara",mprev:"O'Hara Brendan",mar: 16.33,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Arundel and South Downs",mp:"Nick Herbert",mprev:"Herbert Nick",mar: 46.35,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Ashfield",mp:"Gloria De Piero",mprev:"De Piero Gloria",mar: 18.6,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Ashford",mp:"Damian Green",mprev:"Green Damian",mar: 33.63,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Ashton-Under-Lyne",mp:"Angela Rayner",mprev:"Rayner Angela",mar: 27.64,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Aylesbury",mp:"David Lidington",mprev:"Lidington David",mar: 30.96,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Ayr, Carrick and Cumnock",mp:"Corri Wilson",mprev:"Wilson Corri",mar: 21.58,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Banbury",mp:"Victoria Prentis",mprev:"Prentis Victoria",mar: 31.71,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Banff and Buchan",mp:"Eilidh Whiteford",mprev:"Whiteford Eilidh",mar: 31.43,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2015",con:"Barking",mp:"Margaret Hodge",mprev:"Hodge Margaret",mar: 35.48,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Barnsley Central",mp:"Dan Jarvis",mprev:"Jarvis Dan",mar: 34.01,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Barnsley East",mp:"Michael Dugher",mprev:"Dugher Michael",mar: 31.24,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Barrow and Furness",mp:"John Woodcock",mprev:"Woodcock John",mar: 1.84,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Basildon and Billericay",mp:"John Baron",mprev:"Baron John",mar: 29.01,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Basingstoke",mp:"Maria Miller",mprev:"Miller Maria",mar: 20.84,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bassetlaw",mp:"John Mann",mprev:"Mann John",mar: 17.94,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Bath",mp:"Ben Howlett",mprev:"Howlett Ben",mar: 8.13,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Batley and Spen",mp:"Jo Cox",mprev:"Cox Jo",mar: 12,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Battersea",mp:"Jane Ellison",mprev:"Ellison Jane",mar: 15.56,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Beaconsfield",mp:"Dominic Grieve",mprev:"Grieve Dominic",mar: 49.49,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Beckenham",mp:"Bob Stewart",mprev:"Stewart Bob",mar: 37.85,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bedford",mp:"Richard Fuller",mprev:"Fuller Richard",mar: 2.38,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Belfast East",mp:"Gavin Robinson",mprev:"Robinson Gavin",mar: 6.54,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#F6CB2F",curr:"#D46A4C",sec:"#F6CB2F",prevparty: "Alliance",secparty:"Alliance"},
{year:"2015",con:"Belfast North",mp:"Nigel Dodds",mprev:"Dodds Nigel",mar: 13.12,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#008800",prevparty: "Democratic Unionist Party",secparty:"Sinn Fein"},
{year:"2015",con:"Belfast South",mp:"Alasdair McDonnell",mprev:"McDonnell Alasdair",mar: 2.33,reg:"Northern Ireland",party:"Social Democratic and Labour Party",prev:"#99FF66",curr:"#99FF66",sec:"#D46A4C",prevparty: "Social Democratic and Labour Party",secparty:"Democratic Unionist Party"},
{year:"2015",con:"Belfast West",mp:"Paul Maskey",mprev:"Maskey Paul",mar: 35,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#9400d3",prevparty: "Sinn Fein",secparty:"People Before Profit Alliance"},
{year:"2015",con:"Bermondsey and Old Southwark",mp:"Neil Coyle",mprev:"Coyle Neil",mar: 8.73,reg:"London",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Berwickshire, Roxburgh and Selkirk",mp:"Calum Kerr",mprev:"Kerr Calum",mar: 0.6,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2015",con:"Berwick-Upon-Tweed",mp:"Anne-Marie Trevelyan",mprev:"Trevelyan Anne-Marie",mar: 12.16,reg:"North East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Bethnal Green and Bow",mp:"Rushanara Ali",mprev:"Ali Rushanara",mar: 45.95,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Beverley and Holderness",mp:"Graham Stuart",mprev:"Stuart Graham",mar: 23.17,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bexhill and Battle",mp:"Huw Merriman",mprev:"Merriman Huw",mar: 36.36,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Bexleyheath and Crayford",mp:"David Evennett",mprev:"Evennett David",mar: 21.04,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Birkenhead",mp:"Frank Field",mprev:"Field Frank",mar: 52.76,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Edgbaston",mp:"Gisela Stuart",mprev:"Stuart Gisela",mar: 6.55,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Erdington",mp:"Jack Dromey",mprev:"Dromey Jack",mar: 14.79,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Hall Green",mp:"Roger Godsiff",mprev:"Godsiff Roger",mar: 42.12,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Hodge Hill",mp:"Liam Byrne",mprev:"Byrne Liam",mar: 56.93,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Ladywood",mp:"Shabana Mahmood",mprev:"Mahmood Shabana",mar: 60.89,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Northfield",mp:"Richard Burden",mprev:"Burden Richard",mar: 5.91,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Perry Barr",mp:"Khalid Mahmood",mprev:"Mahmood Khalid",mar: 35.94,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Selly Oak",mp:"Stephen McCabe",mprev:"McCabe Stephen",mar: 18.65,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Birmingham, Yardley",mp:"Jess Phillips",mprev:"Phillips Jess",mar: 16.03,reg:"West Midlands",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Bishop Auckland",mp:"Helen Goodman",mprev:"Goodman Helen",mar: 8.91,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Blackburn",mp:"Kate Hollern",mprev:"Hollern Kate",mar: 29,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Blackley and Broughton",mp:"Graham Stringer",mprev:"Stringer Graham",mar: 45.47,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Blackpool North and Cleveleys",mp:"Paul Maynard",mprev:"Maynard Paul",mar: 8.48,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Blackpool South",mp:"Gordon Marsden",mprev:"Marsden Gordon",mar: 7.97,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Blaenau Gwent",mp:"Nick Smith",mprev:"Smith Nick",mar: 40.09,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Blaydon",mp:"David Anderson",mprev:"Anderson David",mar: 31.66,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Blyth Valley",mp:"Ronnie Campbell",mprev:"Campbell Ronnie",mar: 24,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Bognor Regis and Littlehampton",mp:"Nick Gibb",mprev:"Gibb Nick",mar: 29.6,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Bolsover",mp:"Dennis Skinner",mprev:"Skinner Dennis",mar: 26.77,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Bolton North East",mp:"David Crausby",mprev:"Crausby David",mar: 10.14,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Bolton South East",mp:"Yasmin Qureshi",mprev:"Qureshi Yasmin",mar: 26.82,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Bolton West",mp:"Chris Green",mprev:"Green Chris",mar: 1.65,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Bootle",mp:"Peter Dowd",mprev:"Dowd Peter",mar: 63.57,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Boston and Skegness",mp:"Matt Warman",mprev:"Warman Matt",mar: 10,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Bosworth",mp:"David Tredinnick",mprev:"Tredinnick David",mar: 20.51,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Bournemouth East",mp:"Tobias Ellwood",mprev:"Ellwood Tobias",mar: 32.6,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bournemouth West",mp:"Conor Burns",mprev:"Burns Conor",mar: 29.71,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Bracknell",mp:"Phillip Lee",mprev:"Lee Phillip",mar: 38.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bradford East",mp:"Imran Hussain",mprev:"Hussain Imran",mar: 17.11,reg:"Yorkshire and The Humber",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Bradford South",mp:"Judith Cummins",mprev:"Cummins Judith",mar: 17.15,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Bradford West",mp:"Naz Shah",mprev:"Shah Naz",mar: 28.34,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#46801c",prevparty: "Labour",secparty:"Respect"},
{year:"2015",con:"Braintree",mp:"James Cleverly",mprev:"Cleverly James",mar: 35.02,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Brecon and Radnorshire",mp:"Chris Davies",mprev:"Davies Chris",mar: 12.73,reg:"Wales",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Brent Central",mp:"Dawn Butler",mprev:"Butler Dawn",mar: 41.78,reg:"London",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2015",con:"Brentford and Isleworth",mp:"Ruth Cadbury",mprev:"Cadbury Ruth",mar: 0.81,reg:"London",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Brent North",mp:"Barry Gardiner",mprev:"Gardiner Barry",mar: 20.74,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Brentwood and Ongar",mp:"Eric Pickles",mprev:"Pickles Eric",mar: 42.03,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Bridgend",mp:"Madeleine Moon",mprev:"Moon Madeleine",mar: 4.88,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Bridgwater and West Somerset",mp:"Ian Liddell-Grainger",mprev:"Liddell-Grainger Ian",mar: 26.78,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Brigg and Goole",mp:"Andrew Percy",mprev:"Percy Andrew",mar: 25.83,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Brighton, Kemptown",mp:"Simon Kirby",mprev:"Kirby Simon",mar: 1.52,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Brighton, Pavilion",mp:"Caroline Lucas",mprev:"Lucas Caroline",mar: 14.57,reg:"South East",party:"Green",prev:"#6AB023",curr:"#6AB023",sec:"#DC241f",prevparty: "Green",secparty:"Labour"},
{year:"2015",con:"Bristol East",mp:"Kerry McCarthy",mprev:"McCarthy Kerry",mar: 8.61,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Bristol North West",mp:"Charlotte Leslie",mprev:"Leslie Charlotte",mar: 9.54,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bristol South",mp:"Karin Smyth",mprev:"Smyth Karin",mar: 14.02,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Bristol West",mp:"Thangam Debbonaire",mprev:"Debbonaire Thangam",mar: 8.83,reg:"South West",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#6AB023",prevparty: "Liberal Democrats",secparty:"Green"},
{year:"2015",con:"Broadland",mp:"Keith Simpson",mprev:"Simpson Keith",mar: 31.72,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bromley and Chislehurst",mp:"Robert Neill",mprev:"Neill Robert",mar: 30.78,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bromsgrove",mp:"Sajid Javid",mprev:"Javid Sajid",mar: 31.64,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Broxbourne",mp:"Charles Walker",mprev:"Walker Charles",mar: 36.34,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Broxtowe",mp:"Anna Soubry",mprev:"Soubry Anna",mar: 8.02,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Buckingham",mp:"John Bercow",mprev:"Bercow John",mar: 42.73,reg:"South East",party:"Speaker",prev:"#000000",curr:"#000000",sec:"#70147A",prevparty: "Speaker",secparty:"UK Independence Party"},
{year:"2015",con:"Burnley",mp:"Julie Cooper",mprev:"Cooper Julie",mar: 8.16,reg:"North West",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Burton",mp:"Andrew Griffiths",mprev:"Griffiths Andrew",mar: 22.24,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bury North",mp:"David Nuttall",mprev:"Nuttall David",mar: 0.84,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Bury South",mp:"Ivan Lewis",mprev:"Lewis Ivan",mar: 10.42,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Bury St Edmunds",mp:"Jo Churchill",mprev:"Churchill Jo",mar: 35.9,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Caerphilly",mp:"Wayne David",mprev:"David Wayne",mar: 25.01,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Caithness, Sutherland and Easter Ross",mp:"Paul Monaghan",mprev:"Monaghan Paul",mar: 11.24,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Calder Valley",mp:"Craig Whittaker",mprev:"Whittaker Craig",mar: 8.27,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Camberwell and Peckham",mp:"Harriet Harman",mprev:"Harman Harriet",mar: 50.08,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Camborne and Redruth",mp:"George Eustice",mprev:"Eustice George",mar: 15.27,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Cambridge",mp:"Daniel Zeichner",mprev:"Zeichner Daniel",mar: 1.16,reg:"East",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Cannock Chase",mp:"Amanda Milling",mprev:"Milling Amanda",mar: 10.45,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Canterbury",mp:"Julian Brazier",mprev:"Brazier Julian",mar: 18.33,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Cardiff Central",mp:"Jo Stevens",mprev:"Stevens Jo",mar: 12.89,reg:"Wales",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Cardiff North",mp:"Craig Williams",mprev:"Williams Craig",mar: 4.18,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Cardiff South and Penarth",mp:"Stephen Doughty",mprev:"Doughty Stephen",mar: 15.97,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Cardiff West",mp:"Kevin Brennan",mprev:"Brennan Kevin",mar: 15.5,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Carlisle",mp:"John Stevenson",mprev:"Stevenson John",mar: 6.51,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Carmarthen East and Dinefwr",mp:"Jonathan Edwards",mprev:"Edwards Jonathan",mar: 14.21,reg:"Wales",party:"Plaid Cymru",prev:"#008142",curr:"#008142",sec:"#DC241f",prevparty: "Plaid Cymru",secparty:"Labour"},
{year:"2015",con:"Carmarthen West and South Pembrokeshire",mp:"Simon Hart",mprev:"Hart Simon",mar: 15,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Carshalton and Wallington",mp:"Tom Brake",mprev:"Brake Tom",mar: 3.17,reg:"London",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2015",con:"Castle Point",mp:"Rebecca Harris",mprev:"Harris Rebecca",mar: 19.66,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Central Ayrshire",mp:"Philippa Whitford",mprev:"Whitford Philippa",mar: 26.76,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Central Devon",mp:"Mel Stride",mprev:"Stride Mel",mar: 39.06,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Central Suffolk and North Ipswich",mp:"Daniel Poulter",mprev:"Poulter Daniel",mar: 37.24,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Ceredigion",mp:"Mark Williams",mprev:"Williams Mark",mar: 8.2,reg:"Wales",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#008142",prevparty: "Liberal Democrats",secparty:"Plaid Cymru"},
{year:"2015",con:"Charnwood",mp:"Edward Argar",mprev:"Argar Edward",mar: 32.4,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Chatham and Aylesford",mp:"Tracey Crouch",mprev:"Crouch Tracey",mar: 26.59,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Cheadle",mp:"Mary Robinson",mprev:"Robinson Mary",mar: 12.15,reg:"North West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Chelmsford",mp:"Simon Burns",mprev:"Burns Simon",mar: 33.91,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Chelsea and Fulham",mp:"Greg Hands",mprev:"Hands Greg",mar: 39.83,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Cheltenham",mp:"Alex Chalk",mprev:"Chalk Alex",mar: 12.13,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Chesham and Amersham",mp:"Cheryl Gillan",mprev:"Gillan Cheryl",mar: 45.36,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Chesterfield",mp:"Toby Perkins",mprev:"Perkins Toby",mar: 29.84,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Chichester",mp:"Andrew Tyrie",mprev:"Tyrie Andrew",mar: 42.73,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Chingford and Woodford Green",mp:"Iain Duncan Smith",mprev:"Duncan Smith Iain",mar: 19.14,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Chippenham",mp:"Michelle Donelan",mprev:"Donelan Michelle",mar: 18.19,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Chipping Barnet",mp:"Theresa Villiers",mprev:"Villiers Theresa",mar: 14.44,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Chorley",mp:"Lindsay Hoyle",mprev:"Hoyle Lindsay",mar: 8.76,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Christchurch",mp:"Christopher Chope",mprev:"Chope Christopher",mar: 36.66,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Cities Of London and Westminster",mp:"Mark Field",mprev:"Field Mark",mar: 26.73,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"City Of Chester",mp:"Chris Matheson",mprev:"Matheson Chris",mar: 0.18,reg:"North West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"City Of Durham",mp:"Roberta Blackman-Woods",mprev:"Blackman-Woods Roberta",mar: 25.05,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Clacton",mp:"Douglas Carswell",mprev:"Carswell Douglas",mar: 7.77,reg:"East",party:"UK Independence Party",prev:"#0087DC",curr:"#70147A",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Cleethorpes",mp:"Martin Vickers",mprev:"Vickers Martin",mar: 17.51,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Clwyd South",mp:"Susan Elan Jones",mprev:"Jones Susan Elan",mar: 6.85,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Clwyd West",mp:"David Jones",mprev:"Jones David",mar: 17.7,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Coatbridge, Chryston and Bellshill",mp:"Phil Boswell",mprev:"Boswell Phil",mar: 22.69,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Colchester",mp:"Will Quince",mprev:"Quince Will",mar: 11.47,reg:"East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Colne Valley",mp:"Jason McCartney",mprev:"McCartney Jason",mar: 9.47,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Congleton",mp:"Fiona Bruce",mprev:"Bruce Fiona",mar: 32.9,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Copeland",mp:"Jamie Reed",mprev:"Reed Jamie",mar: 6.47,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Corby",mp:"Tom Pursglove",mprev:"Pursglove Tom",mar: 4.29,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Coventry North East",mp:"Colleen Fletcher",mprev:"Fletcher Colleen",mar: 29.06,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Coventry North West",mp:"Geoffrey Robinson",mprev:"Robinson Geoffrey",mar: 9.97,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Coventry South",mp:"Jim Cunningham",mprev:"Cunningham Jim",mar: 7.3,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Crawley",mp:"Henry Smith",mprev:"Smith Henry",mar: 13.44,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Crewe and Nantwich",mp:"Edward Timpson",mprev:"Timpson Edward",mar: 7.26,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Croydon Central",mp:"Gavin Barwell",mprev:"Barwell Gavin",mar: 0.31,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Croydon North",mp:"Steve Reed",mprev:"Reed Steve",mar: 39.92,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Croydon South",mp:"Chris Philp",mprev:"Philp Chris",mar: 29.7,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Cumbernauld, Kilsyth and Kirkintilloch East",mp:"Stuart McDonald",mprev:"McDonald Stuart",mar: 29.87,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Cynon Valley",mp:"Ann Clwyd",mprev:"Clwyd Ann",mar: 30.87,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2015",con:"Dagenham and Rainham",mp:"Jon Cruddas",mprev:"Cruddas Jon",mar: 11.57,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Darlington",mp:"Jenny Chapman",mprev:"Chapman Jenny",mar: 7.68,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Dartford",mp:"Gareth Johnson",mprev:"Johnson Gareth",mar: 23.55,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Daventry",mp:"Chris Heaton-Harris",mprev:"Heaton-Harris Chris",mar: 40.1,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Delyn",mp:"David Hanson",mprev:"Hanson David",mar: 7.82,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Denton and Reddish",mp:"Andrew Gwynne",mprev:"Gwynne Andrew",mar: 27.17,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Derby North",mp:"Amanda Solloway",mprev:"Solloway Amanda",mar: 0.09,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Derbyshire Dales",mp:"Patrick McLoughlin",mprev:"McLoughlin Patrick",mar: 29.65,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Derby South",mp:"Margaret Beckett",mprev:"Beckett Margaret",mar: 21.63,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Devizes",mp:"Claire Perry",mprev:"Perry Claire",mar: 42.34,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Dewsbury",mp:"Paula Sherriff",mprev:"Sherriff Paula",mar: 2.71,reg:"Yorkshire and The Humber",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Doncaster Central",mp:"Rosie Winterton",mprev:"Winterton Rosie",mar: 24.97,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Doncaster North",mp:"Edward Miliband",mprev:"Miliband Edward",mar: 29.82,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Don Valley",mp:"Caroline Flint",mprev:"Flint Caroline",mar: 20.91,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Dover",mp:"Charlie Elphicke",mprev:"Elphicke Charlie",mar: 12.53,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Dudley North",mp:"Ian Austin",mprev:"Austin Ian",mar: 11,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Dudley South",mp:"Mike Wood",mprev:"Wood Mike",mar: 11.18,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Dulwich and West Norwood",mp:"Helen Hayes",mprev:"Hayes Helen",mar: 31.39,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Dumfries and Galloway",mp:"Richard  Arkless",mprev:"Arkless Richard ",mar: 11.51,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Dumfriesshire, Clydesdale and Tweeddale",mp:"David Mundell",mprev:"Mundell David",mar: 1.53,reg:"Scotland",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FFFF00",prevparty: "Conservative",secparty:"Scottish National Party"},
{year:"2015",con:"Dundee East",mp:"Stewart Hosie",mprev:"Hosie Stewart",mar: 39.77,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2015",con:"Dundee West",mp:"Chris Law",mprev:"Law Chris",mar: 38.23,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Dunfermline and West Fife",mp:"Douglas Chapman",mprev:"Chapman Douglas",mar: 18.52,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Dwyfor Meirionnydd",mp:"Liz Saville-Roberts",mprev:"Saville-Roberts Liz",mar: 18.2,reg:"Wales",party:"Plaid Cymru",prev:"#008142",curr:"#008142",sec:"#0087DC",prevparty: "Plaid Cymru",secparty:"Conservative"},
{year:"2015",con:"Ealing Central and Acton",mp:"Rupa Huq",mprev:"Huq Rupa",mar: 0.54,reg:"London",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Ealing North",mp:"Stephen Pound",mprev:"Pound Stephen",mar: 25.41,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Ealing, Southall",mp:"Virendra Sharma",mprev:"Sharma Virendra",mar: 43.3,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Easington",mp:"Grahame Morris",mprev:"Morris Grahame",mar: 42.29,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"East Antrim",mp:"Sammy Wilson",mprev:"Wilson Sammy",mar: 17.3,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"Ulster Unionist Party"},
{year:"2015",con:"Eastbourne",mp:"Caroline Ansell",mprev:"Ansell Caroline",mar: 1.39,reg:"South East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"East Devon",mp:"Hugo Swire",mprev:"Swire Hugo",mar: 22.41,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DDDDDD",prevparty: "Conservative",secparty:"Independent"},
{year:"2015",con:"East Dunbartonshire",mp:"John  Nicolson",mprev:"Nicolson John ",mar: 3.95,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"East Ham",mp:"Stephen Timms",mprev:"Timms Stephen",mar: 65.5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"East Hampshire",mp:"Damian Hinds",mprev:"Hinds Damian",mar: 48.69,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"East Kilbride, Strathaven and Lesmahagow",mp:"Lisa Cameron",mprev:"Cameron Lisa",mar: 27.3,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Eastleigh",mp:"Mims Davies",mprev:"Davies Mims",mar: 16.48,reg:"South East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"East Londonderry",mp:"Gregory Campbell",mprev:"Campbell Gregory",mar: 22.48,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#008800",prevparty: "Democratic Unionist Party",secparty:"Sinn Fein"},
{year:"2015",con:"East Lothian",mp:"George Kerevan",mprev:"Kerevan George",mar: 11.53,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"East Renfrewshire",mp:"Kirsten  Oswald",mprev:"Oswald Kirsten ",mar: 6.55,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"East Surrey",mp:"Sam Gyimah",mprev:"Gyimah Sam",mar: 40.39,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"East Worthing and Shoreham",mp:"Tim Loughton",mprev:"Loughton Tim",mar: 29.96,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"East Yorkshire",mp:"Greg Knight",mprev:"Knight Greg",mar: 29.87,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Eddisbury",mp:"Antoinette Sandbach",mprev:"Sandbach Antoinette",mar: 27.4,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Edinburgh East",mp:"Tommy Sheppard",mprev:"Sheppard Tommy",mar: 19.34,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Edinburgh North and Leith",mp:"Deidre  Brock",mprev:"Brock Deidre ",mar: 9.65,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Edinburgh South",mp:"Ian Murray",mprev:"Murray Ian",mar: 5.35,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2015",con:"Edinburgh South West",mp:"Joanna  Cherry",mprev:"Cherry Joanna ",mar: 15.76,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Edinburgh West",mp:"Michelle  Thomson",mprev:"Thomson Michelle ",mar: 5.85,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Edmonton",mp:"Kate Osamor",mprev:"Osamor Kate",mar: 37.3,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Ellesmere Port and Neston",mp:"Justin Madders",mprev:"Madders Justin",mar: 13.43,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Elmet and Rothwell",mp:"Alec Shelbrooke",mprev:"Shelbrooke Alec",mar: 14.69,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Eltham",mp:"Clive Efford",mprev:"Efford Clive",mar: 6.24,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Enfield North",mp:"Joan Ryan",mprev:"Ryan Joan",mar: 2.35,reg:"London",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Enfield, Southgate",mp:"David Burrowes",mprev:"Burrowes David",mar: 10.38,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Epping Forest",mp:"Eleanor Laing",mprev:"Laing Eleanor",mar: 36.43,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Epsom and Ewell",mp:"Chris Grayling",mprev:"Grayling Chris",mar: 42.78,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Erewash",mp:"Maggie Throup",mprev:"Throup Maggie",mar: 7.42,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Erith and Thamesmead",mp:"Teresa Pearce",mprev:"Pearce Teresa",mar: 22.35,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Esher and Walton",mp:"Dominic Raab",mprev:"Raab Dominic",mar: 50.22,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Exeter",mp:"Ben Bradshaw",mprev:"Bradshaw Ben",mar: 13.3,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Falkirk",mp:"John McNally",mprev:"McNally John",mar: 32.65,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Fareham",mp:"Suella Fernandes",mprev:"Fernandes Suella",mar: 40.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Faversham and Mid Kent",mp:"Helen Whately",mprev:"Whately Helen",mar: 36.36,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Feltham and Heston",mp:"Seema Malhotra",mprev:"Malhotra Seema",mar: 23.2,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Fermanagh and South Tyrone",mp:"Tom Elliott",mprev:"Elliott Tom",mar: 1.04,reg:"Northern Ireland",party:"Ulster Unionist Party",prev:"#008800",curr:"#9999FF",sec:"#008800",prevparty: "Sinn Fein",secparty:"Sinn Fein"},
{year:"2015",con:"Filton and Bradley Stoke",mp:"Jack Lopresti",mprev:"Lopresti Jack",mar: 20.04,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Finchley and Golders Green",mp:"Mike Freer",mprev:"Freer Mike",mar: 11.15,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Folkestone and Hythe",mp:"Damian Collins",mprev:"Collins Damian",mar: 25.08,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Forest Of Dean",mp:"Mark Harper",mprev:"Harper Mark",mar: 22.19,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Foyle",mp:"Mark Durkan",mprev:"Durkan Mark",mar: 16.34,reg:"Northern Ireland",party:"Social Democratic and Labour Party",prev:"#99FF66",curr:"#99FF66",sec:"#008800",prevparty: "Social Democratic and Labour Party",secparty:"Sinn Fein"},
{year:"2015",con:"Fylde",mp:"Mark Menzies",mprev:"Menzies Mark",mar: 30.36,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Gainsborough",mp:"Edward Leigh",mprev:"Leigh Edward",mar: 31.36,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Garston and Halewood",mp:"Maria Eagle",mprev:"Eagle Maria",mar: 55.42,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Gateshead",mp:"Ian Mearns",mprev:"Mearns Ian",mar: 38.96,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Gedling",mp:"Vernon Coaker",mprev:"Coaker Vernon",mar: 6.22,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Gillingham and Rainham",mp:"Rehman Chishti",mprev:"Chishti Rehman",mar: 22.37,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Glasgow Central",mp:"Alison Thewliss",mprev:"Thewliss Alison",mar: 19.49,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Glasgow East",mp:"Natalie McGarry",mprev:"McGarry Natalie",mar: 24.49,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Glasgow North",mp:"Patrick Grady",mprev:"Grady Patrick",mar: 25.17,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Glasgow North East",mp:"Anne McLaughlin",mprev:"McLaughlin Anne",mar: 24.36,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Glasgow North West",mp:"Carol Monaghan",mprev:"Monaghan Carol",mar: 23.63,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Glasgow South",mp:"Stewart McDonald",mprev:"McDonald Stewart",mar: 25.15,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Glasgow South West",mp:"Christopher Stephens",mprev:"Stephens Christopher",mar: 24.32,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Glenrothes",mp:"Peter Grant",mprev:"Grant Peter",mar: 29.2,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Gloucester",mp:"Richard Graham",mprev:"Graham Richard",mar: 13.79,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Gordon",mp:"Alex  Salmond",mprev:"Salmond Alex ",mar: 14.94,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Gosport",mp:"Caroline Dinenage",mprev:"Dinenage Caroline",mar: 35.87,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Gower",mp:"Byron Davies",mprev:"Davies Byron",mar: 0.06,reg:"Wales",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Grantham and Stamford",mp:"Nick Boles",mprev:"Boles Nick",mar: 35.33,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Gravesham",mp:"Adam Holloway",mprev:"Holloway Adam",mar: 16.69,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Great Grimsby",mp:"Melanie Onn",mprev:"Onn Melanie",mar: 13.46,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Great Yarmouth",mp:"Brandon Lewis",mprev:"Lewis Brandon",mar: 13.84,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Greenwich and Woolwich",mp:"Matthew Pennycook",mprev:"Pennycook Matthew",mar: 25.57,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Guildford",mp:"Anne Milton",mprev:"Milton Anne",mar: 41.58,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Hackney North and Stoke Newington",mp:"Diane Abbott",mprev:"Abbott Diane",mar: 48.12,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Hackney South and Shoreditch",mp:"Meg Hillier",mprev:"Hillier Meg",mar: 50.89,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Halesowen and Rowley Regis",mp:"James Morris",mprev:"Morris James",mar: 7.03,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Halifax",mp:"Holly Lynch",mprev:"Lynch Holly",mar: 0.98,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Haltemprice and Howden",mp:"David Davis",mprev:"Davis David",mar: 33.22,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Halton",mp:"Derek Twigg",mprev:"Twigg Derek",mar: 45.05,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Hammersmith",mp:"Andy Slaughter",mprev:"Slaughter Andy",mar: 13.59,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Hampstead and Kilburn",mp:"Tulip Siddiq",mprev:"Siddiq Tulip",mar: 2.11,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Harborough",mp:"Edward Garnier",mprev:"Garnier Edward",mar: 37.41,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Harlow",mp:"Robert Halfon",mprev:"Halfon Robert",mar: 18.87,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Harrogate and Knaresborough",mp:"Andrew Jones",mprev:"Jones Andrew",mar: 30.67,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Harrow East",mp:"Bob Blackman",mprev:"Blackman Bob",mar: 9.71,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Harrow West",mp:"Gareth Thomas",mprev:"Thomas Gareth",mar: 4.74,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Hartlepool",mp:"Iain Wright",mprev:"Wright Iain",mar: 7.66,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Harwich and North Essex",mp:"Bernard Jenkin",mprev:"Jenkin Bernard",mar: 31.33,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Hastings and Rye",mp:"Amber Rudd",mprev:"Rudd Amber",mar: 9.42,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Havant",mp:"Alan Mak",mprev:"Mak Alan",mar: 31.05,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Hayes and Harlington",mp:"John McDonnell",mprev:"McDonnell John",mar: 34.85,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Hazel Grove",mp:"William Wragg",mprev:"Wragg William",mar: 15.16,reg:"North West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Hemel Hempstead",mp:"Mike Penning",mprev:"Penning Mike",mar: 29.05,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Hemsworth",mp:"Jon Trickett",mprev:"Trickett Jon",mar: 28.48,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Hendon",mp:"Matthew Offord",mprev:"Offord Matthew",mar: 7.5,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Henley",mp:"John Howell",mprev:"Howell John",mar: 45.94,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Hereford and South Herefordshire",mp:"Jesse Norman",mprev:"Norman Jesse",mar: 35.74,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Hertford and Stortford",mp:"Mark Prisk",mprev:"Prisk Mark",mar: 38.22,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Hertsmere",mp:"Oliver Dowden",mprev:"Dowden Oliver",mar: 36.85,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Hexham",mp:"Guy Opperman",mprev:"Opperman Guy",mar: 27.76,reg:"North East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Heywood and Middleton",mp:"Liz McInnes",mprev:"McInnes Liz",mar: 10.92,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"High Peak",mp:"Andrew Bingham",mprev:"Bingham Andrew",mar: 9.64,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Hitchin and Harpenden",mp:"Peter Lilley",mprev:"Lilley Peter",mar: 36.22,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Holborn and St Pancras",mp:"Keir Starmer",mprev:"Starmer Keir",mar: 31.04,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Hornchurch and Upminster",mp:"Angela Watkinson",mprev:"Watkinson Angela",mar: 23.67,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Hornsey and Wood Green",mp:"Catherine West",mprev:"West Catherine",mar: 19.14,reg:"London",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Horsham",mp:"Jeremy Quin",mprev:"Quin Jeremy",mar: 43.32,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Houghton and Sunderland South",mp:"Bridget Phillipson",mprev:"Phillipson Bridget",mar: 33.61,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Hove",mp:"Peter Kyle",mprev:"Kyle Peter",mar: 2.37,reg:"South East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Huddersfield",mp:"Barry Sheerman",mprev:"Sheerman Barry",mar: 18.15,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Huntingdon",mp:"Jonathan Djanogly",mprev:"Djanogly Jonathan",mar: 34.69,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Hyndburn",mp:"Graham Jones",mprev:"Jones Graham",mar: 10.26,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Ilford North",mp:"Wes Streeting",mprev:"Streeting Wes",mar: 1.2,reg:"London",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Ilford South",mp:"Mike Gapes",mprev:"Gapes Mike",mar: 38.1,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Inverclyde",mp:"Ronnie Cowan",mprev:"Cowan Ronnie",mar: 24.8,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Inverness, Nairn, Badenoch and Strathspey",mp:"Drew Hendry",mprev:"Hendry Drew",mar: 18.76,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Ipswich",mp:"Benedict Gummer",mprev:"Gummer Benedict",mar: 7.67,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Isle Of Wight",mp:"Andrew Turner",mprev:"Turner Andrew",mar: 19.49,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Islington North",mp:"Jeremy Corbyn",mprev:"Corbyn Jeremy",mar: 43.05,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Islington South and Finsbury",mp:"Emily Thornberry",mprev:"Thornberry Emily",mar: 28.71,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Islwyn",mp:"Chris Evans",mprev:"Evans Chris",mar: 29.39,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Jarrow",mp:"Stephen Hepburn",mprev:"Hepburn Stephen",mar: 35.99,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Keighley",mp:"Kris Hopkins",mprev:"Hopkins Kris",mar: 6.22,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Kenilworth and Southam",mp:"Jeremy Wright",mprev:"Wright Jeremy",mar: 43.04,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Kensington",mp:"Victoria Borwick",mprev:"Borwick Victoria",mar: 21.14,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Kettering",mp:"Philip Hollobone",mprev:"Hollobone Philip",mar: 26.66,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Kilmarnock and Loudoun",mp:"Alan Brown",mprev:"Brown Alan",mar: 25.3,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Kingston and Surbiton",mp:"James Berry",mprev:"Berry James",mar: 4.78,reg:"London",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Kingston upon Hull East",mp:"Karl Turner",mprev:"Turner Karl",mar: 29.36,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Kingston upon Hull North",mp:"Diana Johnson",mprev:"Johnson Diana",mar: 36.5,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Kingston upon Hull West and Hessle",mp:"Alan Johnson",mprev:"Johnson Alan",mar: 29.35,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Kingswood",mp:"Chris Skidmore",mprev:"Skidmore Chris",mar: 18.71,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Kirkcaldy and Cowdenbeath",mp:"Roger Mullin",mprev:"Mullin Roger",mar: 18.86,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Knowsley",mp:"George Howarth",mprev:"Howarth George",mar: 68.32,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Lagan Valley",mp:"Jeffrey Donaldson",mprev:"Donaldson Jeffrey",mar: 32.67,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"Ulster Unionist Party"},
{year:"2015",con:"Lanark and Hamilton East",mp:"Angela Crawley",mprev:"Crawley Angela",mar: 18.28,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Lancaster and Fleetwood",mp:"Catherine Smith",mprev:"Smith Catherine",mar: 3.03,reg:"North West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Leeds Central",mp:"Hilary Benn",mprev:"Benn Hilary",mar: 37.66,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Leeds East",mp:"Richard Burgon",mprev:"Burgon Richard",mar: 32.81,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Leeds North East",mp:"Fabian Hamilton",mprev:"Hamilton Fabian",mar: 15.01,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Leeds North West",mp:"Greg Mulholland",mprev:"Mulholland Greg",mar: 6.7,reg:"Yorkshire and The Humber",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2015",con:"Leeds West",mp:"Rachel Reeves",mprev:"Reeves Rachel",mar: 27.92,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Leicester East",mp:"Keith Vaz",mprev:"Vaz Keith",mar: 38.18,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Leicester South",mp:"Jon Ashworth",mprev:"Ashworth Jon",mar: 38.84,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Leicester West",mp:"Liz Kendall",mprev:"Kendall Liz",mar: 20.86,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Leigh",mp:"Andy Burnham",mprev:"Burnham Andy",mar: 31.24,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Lewes",mp:"Maria Caulfield",mprev:"Caulfield Maria",mar: 2.14,reg:"South East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Lewisham, Deptford",mp:"Vicky Foxcroft",mprev:"Foxcroft Vicky",mar: 45.37,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Lewisham East",mp:"Heidi Alexander",mprev:"Alexander Heidi",mar: 33.39,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Lewisham West and Penge",mp:"Jim Dowd",mprev:"Dowd Jim",mar: 26.42,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Leyton and Wanstead",mp:"John Cryer",mprev:"Cryer John",mar: 36.65,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Lichfield",mp:"Michael Fabricant",mprev:"Fabricant Michael",mar: 35.34,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Lincoln",mp:"Karl McCartney",mprev:"McCartney Karl",mar: 3.08,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Linlithgow and East Falkirk",mp:"Martyn Day",mprev:"Day Martyn",mar: 21,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Liverpool, Riverside",mp:"Louise Ellman",mprev:"Ellman Louise",mar: 55.27,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#6AB023",prevparty: "Labour",secparty:"Green"},
{year:"2015",con:"Liverpool, Walton",mp:"Steve Rotheram",mprev:"Rotheram Steve",mar: 72.33,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Liverpool, Wavertree",mp:"Luciana Berger",mprev:"Berger Luciana",mar: 59.31,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Liverpool, West Derby",mp:"Stephen Twigg",mprev:"Twigg Stephen",mar: 66.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Livingston",mp:"Hannah Bardell",mprev:"Bardell Hannah",mar: 29.27,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Llanelli",mp:"Nia Griffith",mprev:"Griffith Nia",mar: 18.39,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2015",con:"Loughborough",mp:"Nicky Morgan",mprev:"Morgan Nicky",mar: 17.65,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Louth and Horncastle",mp:"Victoria Atkins",mprev:"Atkins Victoria",mar: 29.75,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Ludlow",mp:"Philip Dunne",mprev:"Dunne Philip",mar: 39.38,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Luton North",mp:"Kelvin Hopkins",mprev:"Hopkins Kelvin",mar: 22.33,reg:"East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Luton South",mp:"Gavin Shuker",mprev:"Shuker Gavin",mar: 13.53,reg:"East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Macclesfield",mp:"David Rutley",mprev:"Rutley David",mar: 29.86,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Maidenhead",mp:"Theresa May",mprev:"May Theresa",mar: 53.96,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Maidstone and The Weald",mp:"Helen Grant",mprev:"Grant Helen",mar: 21.41,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Makerfield",mp:"Yvonne Fovargue",mprev:"Fovargue Yvonne",mar: 29.37,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Maldon",mp:"John Whittingdale",mprev:"Whittingdale John",mar: 45.94,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Manchester Central",mp:"Lucy Powell",mprev:"Powell Lucy",mar: 47.74,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Manchester, Gorton",mp:"Gerald Kaufman",mprev:"Kaufman Gerald",mar: 57.31,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#6AB023",prevparty: "Labour",secparty:"Green"},
{year:"2015",con:"Manchester, Withington",mp:"Jeff Smith",mprev:"Smith Jeff",mar: 29.77,reg:"North West",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Mansfield",mp:"Alan Meale",mprev:"Meale Alan",mar: 11.26,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Meon Valley",mp:"George Hollingbery",mprev:"Hollingbery George",mar: 46.24,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Meriden",mp:"Caroline Spelman",mprev:"Spelman Caroline",mar: 35.73,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Merthyr Tydfil and Rhymney",mp:"Gerald Jones",mprev:"Jones Gerald",mar: 35.19,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Mid Bedfordshire",mp:"Nadine Dorries",mprev:"Dorries Nadine",mar: 40.18,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Mid Derbyshire",mp:"Pauline Latham",mprev:"Latham Pauline",mar: 26.76,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Middlesbrough",mp:"Andy McDonald",mprev:"McDonald Andy",mar: 38.15,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Middlesbrough South and East Cleveland",mp:"Tom Blenkinsop",mprev:"Blenkinsop Tom",mar: 4.97,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Mid Dorset and North Poole",mp:"Michael Tomlinson",mprev:"Tomlinson Michael",mar: 22.65,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Midlothian",mp:"Owen Thompson",mprev:"Thompson Owen",mar: 20.4,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Mid Norfolk",mp:"George Freeman",mprev:"Freeman George",mar: 33.09,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Mid Sussex",mp:"Nicholas Soames",mprev:"Soames Nicholas",mar: 42.24,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Mid Ulster",mp:"Francie Molloy",mprev:"Molloy Francie",mar: 33.28,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#9999FF",prevparty: "Sinn Fein",secparty:"Ulster Unionist Party"},
{year:"2015",con:"Mid Worcestershire",mp:"Nigel Huddleston",mprev:"Huddleston Nigel",mar: 39.31,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Milton Keynes North",mp:"Mark Lancaster",mprev:"Lancaster Mark",mar: 16.91,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Milton Keynes South",mp:"Iain Stewart",mprev:"Stewart Iain",mar: 14.71,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Mitcham and Morden",mp:"Siobhain McDonagh",mprev:"McDonagh Siobhain",mar: 37.49,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Mole Valley",mp:"Paul Beresford",mprev:"Beresford Paul",mar: 46.16,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Monmouth",mp:"David Davies",mprev:"Davies David",mar: 23.14,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Montgomeryshire",mp:"Glyn Davies",mprev:"Davies Glyn",mar: 15.77,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Moray",mp:"Angus Robertson",mprev:"Robertson Angus",mar: 18.39,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2015",con:"Morecambe and Lunesdale",mp:"David Morris",mprev:"Morris David",mar: 10.61,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Morley and Outwood",mp:"Andrea Jenkyns",mprev:"Jenkyns Andrea",mar: 0.87,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Motherwell and Wishaw",mp:"Marion Fellows",mprev:"Fellows Marion",mar: 24.67,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Na h-Eileanan An Iar",mp:"Angus MacNeil",mprev:"MacNeil Angus",mar: 25.74,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2015",con:"Neath",mp:"Christina Rees",mprev:"Rees Christina",mar: 25.71,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2015",con:"Newark",mp:"Robert Jenrick",mprev:"Jenrick Robert",mar: 35.32,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Newbury",mp:"Richard Benyon",mprev:"Benyon Richard",mar: 46.02,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Newcastle-Under-Lyme",mp:"Paul Farrelly",mprev:"Farrelly Paul",mar: 1.51,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Newcastle Upon Tyne Central",mp:"Chi Onwurah",mprev:"Onwurah Chi",mar: 36.12,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Newcastle Upon Tyne East",mp:"Nicholas Brown",mprev:"Brown Nicholas",mar: 31.85,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Newcastle Upon Tyne North",mp:"Catherine McKinnell",mprev:"McKinnell Catherine",mar: 22.62,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"New Forest East",mp:"Julian Lewis",mprev:"Lewis Julian",mar: 38.75,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"New Forest West",mp:"Desmond Swayne",mprev:"Swayne Desmond",mar: 43.46,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Newport East",mp:"Jessica Morden",mprev:"Morden Jessica",mar: 13.4,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Newport West",mp:"Paul Flynn",mprev:"Flynn Paul",mar: 8.7,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Newry and Armagh",mp:"Mickey Brady",mprev:"Brady Mickey",mar: 8.37,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#9999FF",prevparty: "Sinn Fein",secparty:"Ulster Unionist Party"},
{year:"2015",con:"Newton Abbot",mp:"Anne Marie Morris",mprev:"Morris Anne Marie",mar: 23.28,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Normanton, Pontefract and Castleford",mp:"Yvette Cooper",mprev:"Cooper Yvette",mar: 33.61,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Northampton North",mp:"Michael Ellis",mprev:"Ellis Michael",mar: 8.23,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Northampton South",mp:"David Mackintosh",mprev:"Mackintosh David",mar: 9.75,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North Antrim",mp:"Ian Paisley",mprev:"Paisley Ian",mar: 27.55,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#0095B6",prevparty: "Democratic Unionist Party",secparty:"Traditional Unionist Voice"},
{year:"2015",con:"North Ayrshire and Arran",mp:"Patricia Gibson",mprev:"Gibson Patricia",mar: 25.2,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"North Cornwall",mp:"Scott Mann",mprev:"Mann Scott",mar: 13.72,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"North Devon",mp:"Peter Heaton-Jones",mprev:"Heaton-Jones Peter",mar: 13.26,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"North Dorset",mp:"Simon Hoare",mprev:"Hoare Simon",mar: 39.56,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"North Down",mp:"Sylvia Hermon",mprev:"Hermon Sylvia",mar: 25.6,reg:"Northern Ireland",party:"Independent",prev:"#DDDDDD",curr:"#DDDDDD",sec:"#D46A4C",prevparty: "Independent",secparty:"Democratic Unionist Party"},
{year:"2015",con:"North Durham",mp:"Kevan Jones",mprev:"Jones Kevan",mar: 33.99,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"North East Bedfordshire",mp:"Alistair Burt",mprev:"Burt Alistair",mar: 43.71,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North East Cambridgeshire",mp:"Stephen Barclay",mprev:"Barclay Stephen",mar: 32.59,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"North East Derbyshire",mp:"Natascha Engel",mprev:"Engel Natascha",mar: 3.93,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"North East Fife",mp:"Stephen Gethins",mprev:"Gethins Stephen",mar: 9.6,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"North East Hampshire",mp:"Ranil Jayawardena",mprev:"Jayawardena Ranil",mar: 55.4,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"North East Hertfordshire",mp:"Oliver Heald",mprev:"Heald Oliver",mar: 36.49,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North East Somerset",mp:"Jacob Rees-Mogg",mprev:"Rees-Mogg Jacob",mar: 24.94,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North Herefordshire",mp:"Bill Wiggin",mprev:"Wiggin Bill",mar: 41.64,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"North Norfolk",mp:"Norman Lamb",mprev:"Lamb Norman",mar: 8.18,reg:"East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2015",con:"North Shropshire",mp:"Owen Paterson",mprev:"Paterson Owen",mar: 31.37,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North Somerset",mp:"Liam Fox",mprev:"Fox Liam",mar: 39.19,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North Swindon",mp:"Justin Tomlinson",mprev:"Tomlinson Justin",mar: 22.56,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North Thanet",mp:"Roger Gale",mprev:"Gale Roger",mar: 23.27,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"North Tyneside",mp:"Mary Glindon",mprev:"Glindon Mary",mar: 36.73,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"North Warwickshire",mp:"Craig Tracey",mprev:"Tracey Craig",mar: 6.28,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North West Cambridgeshire",mp:"Shailesh Vara",mprev:"Vara Shailesh",mar: 32.4,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"North West Durham",mp:"Pat Glass",mprev:"Glass Pat",mar: 23.49,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"North West Hampshire",mp:"Kit Malthouse",mprev:"Malthouse Kit",mar: 43.38,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"North West Leicestershire",mp:"Andrew Bridgen",mprev:"Bridgen Andrew",mar: 22.06,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North West Norfolk",mp:"Henry Bellingham",mprev:"Bellingham Henry",mar: 29.44,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"North Wiltshire",mp:"James Gray",mprev:"Gray James",mar: 41.63,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Norwich North",mp:"Chloe Smith",mprev:"Smith Chloe",mar: 10.24,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Norwich South",mp:"Clive Lewis",mprev:"Lewis Clive",mar: 15.79,reg:"East",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2015",con:"Nottingham East",mp:"Christopher Leslie",mprev:"Leslie Christopher",mar: 33.78,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Nottingham North",mp:"Graham Allen",mprev:"Allen Graham",mar: 33.56,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Nottingham South",mp:"Lilian Greenwood",mprev:"Greenwood Lilian",mar: 15.96,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Nuneaton",mp:"Marcus Jones",mprev:"Jones Marcus",mar: 10.67,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Ochil and South Perthshire",mp:"Tasmina Ahmed-Sheikh",mprev:"Ahmed-Sheikh Tasmina",mar: 17.57,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Ogmore",mp:"Huw Irranca-Davies",mprev:"Irranca-Davies Huw",mar: 37,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Old Bexley and Sidcup",mp:"James Brokenshire",mprev:"Brokenshire James",mar: 33.8,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Oldham East and Saddleworth",mp:"Debbie Abrahams",mprev:"Abrahams Debbie",mar: 13.49,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Oldham West and Royton",mp:"Michael Meacher",mprev:"Meacher Michael",mar: 34.17,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Orkney and Shetland",mp:"Alistair Carmichael",mprev:"Carmichael Alistair",mar: 3.59,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#FFFF00",prevparty: "Liberal Democrats",secparty:"Scottish National Party"},
{year:"2015",con:"Orpington",mp:"Joseph Johnson",mprev:"Johnson Joseph",mar: 40.75,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Oxford East",mp:"Andrew Smith",mprev:"Smith Andrew",mar: 30.14,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Oxford West and Abingdon",mp:"Nicola Blackwood",mprev:"Blackwood Nicola",mar: 16.74,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Paisley and Renfrewshire North",mp:"Gavin Newlands",mprev:"Newlands Gavin",mar: 17.99,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Paisley and Renfrewshire South",mp:"Mhairi Black",mprev:"Black Mhairi",mar: 12.3,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Pendle",mp:"Andrew Stephenson",mprev:"Stephenson Andrew",mar: 12.27,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Penistone and Stocksbridge",mp:"Angela Smith",mprev:"Smith Angela",mar: 14.35,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Penrith and The Border",mp:"Rory Stewart",mprev:"Stewart Rory",mar: 45.29,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Perth and North Perthshire",mp:"Pete Wishart",mprev:"Wishart Pete",mar: 17.79,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2015",con:"Peterborough",mp:"Stewart Jackson",mprev:"Jackson Stewart",mar: 4.09,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Plymouth, Moor View",mp:"Johnny Mercer",mprev:"Mercer Johnny",mar: 2.41,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Plymouth, Sutton and Devonport",mp:"Oliver Colvile",mprev:"Colvile Oliver",mar: 1.09,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Pontypridd",mp:"Owen Smith",mprev:"Smith Owen",mar: 23.72,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Poole",mp:"Robert Syms",mprev:"Syms Robert",mar: 33.32,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Poplar and Limehouse",mp:"Jim Fitzpatrick",mprev:"Fitzpatrick Jim",mar: 33.16,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Portsmouth North",mp:"Penny Mordaunt",mprev:"Mordaunt Penny",mar: 23.21,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Portsmouth South",mp:"Flick Drummond",mprev:"Drummond Flick",mar: 12.51,reg:"South East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Preseli Pembrokeshire",mp:"Stephen Crabb",mprev:"Crabb Stephen",mar: 12.25,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Preston",mp:"Mark Hendrick",mprev:"Hendrick Mark",mar: 36.05,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Pudsey",mp:"Stuart Andrew",mprev:"Andrew Stuart",mar: 8.84,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Putney",mp:"Justine Greening",mprev:"Greening Justine",mar: 23.78,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Rayleigh and Wickford",mp:"Mark Francois",mprev:"Francois Mark",mar: 32.38,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Reading East",mp:"Rob Wilson",mprev:"Wilson Rob",mar: 12.91,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Reading West",mp:"Alok Sharma",mprev:"Sharma Alok",mar: 13.74,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Redcar",mp:"Anna Turley",mprev:"Turley Anna",mar: 25.39,reg:"North East",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Redditch",mp:"Karen Lumley",mprev:"Lumley Karen",mar: 16,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Reigate",mp:"Crispin Blunt",mprev:"Blunt Crispin",mar: 43.49,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Rhondda",mp:"Chris Bryant",mprev:"Bryant Chris",mar: 23.64,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2015",con:"Ribble Valley",mp:"Nigel Evans",mprev:"Evans Nigel",mar: 26.04,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Richmond Park",mp:"Zac Goldsmith",mprev:"Goldsmith Zac",mar: 38.94,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Richmond (Yorks)",mp:"Rishi Sunak",mprev:"Sunak Rishi",mar: 36.2,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Rochdale",mp:"Simon Danczuk",mprev:"Danczuk Simon",mar: 27.39,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Rochester and Strood",mp:"Kelly Tolhurst",mprev:"Tolhurst Kelly",mar: 13.58,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Rochford and Southend East",mp:"James Duddridge",mprev:"Duddridge James",mar: 21.73,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Romford",mp:"Andrew Rosindell",mprev:"Rosindell Andrew",mar: 28.18,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Romsey and Southampton North",mp:"Caroline Nokes",mprev:"Nokes Caroline",mar: 36.6,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Rossendale and Darwen",mp:"Jake Berry",mprev:"Berry Jake",mar: 11.53,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Ross, Skye and Lochaber",mp:"Ian Blackford",mprev:"Blackford Ian",mar: 12.26,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Rotherham",mp:"Sarah Champion",mprev:"Champion Sarah",mar: 22.33,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Rother Valley",mp:"Kevin Barron",mprev:"Barron Kevin",mar: 15.52,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Rugby",mp:"Mark Pawsey",mprev:"Pawsey Mark",mar: 21.11,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Ruislip, Northwood and Pinner",mp:"Nick Hurd",mprev:"Hurd Nick",mar: 39.48,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Runnymede and Weybridge",mp:"Philip Hammond",mprev:"Hammond Philip",mar: 44.22,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Rushcliffe",mp:"Kenneth Clarke",mprev:"Clarke Kenneth",mar: 25.07,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Rutherglen and Hamilton West",mp:"Margaret Ferrier",mprev:"Ferrier Margaret",mar: 17.31,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Rutland and Melton",mp:"Alan Duncan",mprev:"Duncan Alan",mar: 39.75,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Saffron Walden",mp:"Alan Haselhurst",mprev:"Haselhurst Alan",mar: 43.42,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Salford and Eccles",mp:"Rebecca Long Bailey",mprev:"Long Bailey Rebecca",mar: 28.99,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Salisbury",mp:"John Glen",mprev:"Glen John",mar: 40.27,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Scarborough and Whitby",mp:"Robert Goodwill",mprev:"Goodwill Robert",mar: 12.99,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Scunthorpe",mp:"Nic Dakin",mprev:"Dakin Nic",mar: 8.48,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Sedgefield",mp:"Phil Wilson",mprev:"Wilson Phil",mar: 17.67,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Sefton Central",mp:"Bill Esterson",mprev:"Esterson Bill",mar: 24.17,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Selby and Ainsty",mp:"Nigel Adams",mprev:"Adams Nigel",mar: 25.67,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Sevenoaks",mp:"Michael Fallon",mprev:"Fallon Michael",mar: 39.03,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Sheffield, Brightside and Hillsborough",mp:"Harry Harpham",mprev:"Harpham Harry",mar: 34.47,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Sheffield Central",mp:"Paul Blomfield",mprev:"Blomfield Paul",mar: 39.18,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#6AB023",prevparty: "Labour",secparty:"Green"},
{year:"2015",con:"Sheffield, Hallam",mp:"Nick Clegg",mprev:"Clegg Nick",mar: 4.24,reg:"Yorkshire and The Humber",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2015",con:"Sheffield, Heeley",mp:"Louise Haigh",mprev:"Haigh Louise",mar: 30.81,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Sheffield South East",mp:"Clive Betts",mprev:"Betts Clive",mar: 29.53,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Sherwood",mp:"Mark Spencer",mprev:"Spencer Mark",mar: 9.17,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Shipley",mp:"Philip Davies",mprev:"Davies Philip",mar: 19.04,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Shrewsbury and Atcham",mp:"Daniel Kawczynski",mprev:"Kawczynski Daniel",mar: 17.68,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Sittingbourne and Sheppey",mp:"Gordon Henderson",mprev:"Henderson Gordon",mar: 24.64,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Skipton and Ripon",mp:"Julian Smith",mprev:"Smith Julian",mar: 38.05,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Sleaford and North Hykeham",mp:"Stephen Phillips",mprev:"Phillips Stephen",mar: 38.93,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Slough",mp:"Fiona Mactaggart",mprev:"Mactaggart Fiona",mar: 15.2,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Solihull",mp:"Julian Knight",mprev:"Knight Julian",mar: 23.55,reg:"West Midlands",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Somerton and Frome",mp:"David Warburton",mprev:"Warburton David",mar: 33.61,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Southampton, Itchen",mp:"Royston Smith",mprev:"Smith Royston",mar: 5.18,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Southampton, Test",mp:"Alan Whitehead",mprev:"Whitehead Alan",mar: 8.73,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"South Antrim",mp:"Danny Kinahan",mprev:"Kinahan Danny",mar: 2.6,reg:"Northern Ireland",party:"Ulster Unionist Party",prev:"#D46A4C",curr:"#9999FF",sec:"#D46A4C",prevparty: "Democratic Unionist Party",secparty:"Democratic Unionist Party"},
{year:"2015",con:"South Basildon and East Thurrock",mp:"Stephen Metcalfe",mprev:"Metcalfe Stephen",mar: 16.87,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"South Cambridgeshire",mp:"Heidi Allen",mprev:"Allen Heidi",mar: 33.46,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Derbyshire",mp:"Heather Wheeler",mprev:"Wheeler Heather",mar: 22.6,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Dorset",mp:"Richard Drax",mprev:"Drax Richard",mar: 24.68,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Down",mp:"Margaret Ritchie",mprev:"Ritchie Margaret",mar: 13.8,reg:"Northern Ireland",party:"Social Democratic and Labour Party",prev:"#99FF66",curr:"#99FF66",sec:"#008800",prevparty: "Social Democratic and Labour Party",secparty:"Sinn Fein"},
{year:"2015",con:"South East Cambridgeshire",mp:"Lucy Frazer",mprev:"Frazer Lucy",mar: 28.29,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"South East Cornwall",mp:"Sheryll Murray",mprev:"Murray Sheryll",mar: 33.65,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Southend West",mp:"David Amess",mprev:"Amess David",mar: 31.5,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Holland and The Deepings",mp:"John Hayes",mprev:"Hayes John",mar: 37.73,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"South Leicestershire",mp:"Alberto Costa",mprev:"Costa Alberto",mar: 31.2,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Norfolk",mp:"Richard Bacon",mprev:"Bacon Richard",mar: 35.88,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Northamptonshire",mp:"Andrea Leadsom",mprev:"Leadsom Andrea",mar: 43.4,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Southport",mp:"John Pugh",mprev:"Pugh John",mar: 3,reg:"North West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2015",con:"South Ribble",mp:"Seema Kennedy",mprev:"Kennedy Seema",mar: 11.35,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Shields",mp:"Emma Lewell-Buck",mprev:"Lewell-Buck Emma",mar: 29.27,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"South Staffordshire",mp:"Gavin Williamson",mprev:"Williamson Gavin",mar: 41.07,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Suffolk",mp:"James Cartlidge",mprev:"Cartlidge James",mar: 33.8,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Swindon",mp:"Robert Buckland",mprev:"Buckland Robert",mar: 11.74,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South Thanet",mp:"Craig MacKinlay",mprev:"MacKinlay Craig",mar: 5.69,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"South West Bedfordshire",mp:"Andrew Selous",mprev:"Selous Andrew",mar: 34.72,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South West Devon",mp:"Gary Streeter",mprev:"Streeter Gary",mar: 39.92,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South West Hertfordshire",mp:"David Gauke",mprev:"Gauke David",mar: 40.62,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"South West Norfolk",mp:"Elizabeth Truss",mprev:"Truss Elizabeth",mar: 27.66,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"South West Surrey",mp:"Jeremy Hunt",mprev:"Hunt Jeremy",mar: 49.99,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"South West Wiltshire",mp:"Andrew Murrison",mprev:"Murrison Andrew",mar: 35.18,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Spelthorne",mp:"Kwasi Kwarteng",mprev:"Kwarteng Kwasi",mar: 28.84,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Stafford",mp:"Jeremy Lefroy",mprev:"Lefroy Jeremy",mar: 18.82,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Staffordshire Moorlands",mp:"Karen Bradley",mprev:"Bradley Karen",mar: 23.89,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"St Albans",mp:"Anne Main",mprev:"Main Anne",mar: 23.39,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Stalybridge and Hyde",mp:"Jonathan Reynolds",mprev:"Reynolds Jonathan",mar: 16.29,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"St Austell and Newquay",mp:"Steve Double",mprev:"Double Steve",mar: 16.23,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Stevenage",mp:"Stephen McPartland",mprev:"McPartland Stephen",mar: 10.37,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"St Helens North",mp:"Conor McGinn",mprev:"McGinn Conor",mar: 37.38,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"St Helens South and Whiston",mp:"Marie Rimmer",mprev:"Rimmer Marie",mar: 43.89,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Stirling",mp:"Steven Paterson",mprev:"Paterson Steven",mar: 20.1,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"St Ives",mp:"Derek Thomas",mprev:"Thomas Derek",mar: 5.11,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Stockport",mp:"Ann Coffey",mprev:"Coffey Ann",mar: 25.38,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Stockton North",mp:"Alex Cunningham",mprev:"Cunningham Alex",mar: 21.14,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Stockton South",mp:"James Wharton",mprev:"Wharton James",mar: 9.74,reg:"North East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Stoke-On-Trent Central",mp:"Tristram Hunt",mprev:"Hunt Tristram",mar: 16.66,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Stoke-On-Trent North",mp:"Ruth Smeeth",mprev:"Smeeth Ruth",mar: 12.51,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Stoke-On-Trent South",mp:"Robert Flello",mprev:"Flello Robert",mar: 6.49,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Stone",mp:"Bill Cash",mprev:"Cash Bill",mar: 34.55,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Stourbridge",mp:"Margot James",mprev:"James Margot",mar: 14.54,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Strangford",mp:"Jim Shannon",mprev:"Shannon Jim",mar: 30.02,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"Ulster Unionist Party"},
{year:"2015",con:"Stratford-On-Avon",mp:"Nadhim Zahawi",mprev:"Zahawi Nadhim",mar: 44.45,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Streatham",mp:"Chuka Umunna",mprev:"Umunna Chuka",mar: 27.91,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Stretford and Urmston",mp:"Kate Green",mprev:"Green Kate",mar: 25.19,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Stroud",mp:"Neil Carmichael",mprev:"Carmichael Neil",mar: 8,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Suffolk Coastal",mp:"Therese Coffey",mprev:"Coffey Therese",mar: 33.89,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Sunderland Central",mp:"Julie Elliott",mprev:"Elliott Julie",mar: 26.77,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Surrey Heath",mp:"Michael Gove",mprev:"Gove Michael",mar: 45.57,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Sutton and Cheam",mp:"Paul Scully",mprev:"Scully Paul",mar: 7.86,reg:"London",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Sutton Coldfield",mp:"Andrew Mitchell",mprev:"Mitchell Andrew",mar: 32.28,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Swansea East",mp:"Carolyn Harris",mprev:"Harris Carolyn",mar: 35.78,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Swansea West",mp:"Geraint Davies",mprev:"Davies Geraint",mar: 20.01,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Tamworth",mp:"Christopher Pincher",mprev:"Pincher Christopher",mar: 23.96,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Tatton",mp:"George Osborne",mprev:"Osborne George",mar: 40.27,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Taunton Deane",mp:"Rebecca Pow",mprev:"Pow Rebecca",mar: 26.76,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Telford",mp:"Lucy Allan",mprev:"Allan Lucy",mar: 1.8,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Tewkesbury",mp:"Laurence Robertson",mprev:"Robertson Laurence",mar: 39.7,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"The Cotswolds",mp:"Geoffrey Clifton-Brown",mprev:"Clifton-Brown Geoffrey",mar: 37.9,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"The Wrekin",mp:"Mark Pritchard",mprev:"Pritchard Mark",mar: 23.64,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Thirsk and Malton",mp:"Kevin Hollinrake",mprev:"Hollinrake Kevin",mar: 37.15,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Thornbury and Yate",mp:"Luke Hall",mprev:"Hall Luke",mar: 3.08,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Thurrock",mp:"Jackie Doyle-Price",mprev:"Doyle-Price Jackie",mar: 1.08,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Tiverton and Honiton",mp:"Neil Parish",mprev:"Parish Neil",mar: 37.52,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Tonbridge and Malling",mp:"Tom Tugendhat",mprev:"Tugendhat Tom",mar: 44.22,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Tooting",mp:"Sadiq Khan",mprev:"Khan Sadiq",mar: 5.31,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Torbay",mp:"Kevin Foster",mprev:"Foster Kevin",mar: 6.83,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Torfaen",mp:"Nick Thomas-Symonds",mprev:"Thomas-Symonds Nick",mar: 21.53,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Torridge and West Devon",mp:"Geoffrey Cox",mprev:"Cox Geoffrey",mar: 32.52,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Totnes",mp:"Sarah Wollaston",mprev:"Wollaston Sarah",mar: 38.82,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Tottenham",mp:"David Lammy",mprev:"Lammy David",mar: 55.37,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Truro and Falmouth",mp:"Sarah Newton",mprev:"Newton Sarah",mar: 27.16,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Tunbridge Wells",mp:"Greg Clark",mprev:"Clark Greg",mar: 44.48,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Twickenham",mp:"Tania Mathias",mprev:"Mathias Tania",mar: 3.25,reg:"London",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Tynemouth",mp:"Alan Campbell",mprev:"Campbell Alan",mar: 15.4,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Upper Bann",mp:"David Simpson",mprev:"Simpson David",mar: 4.79,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"Ulster Unionist Party"},
{year:"2015",con:"Uxbridge and South Ruislip",mp:"Boris Johnson",mprev:"Johnson Boris",mar: 23.87,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Vale Of Clwyd",mp:"James Davies",mprev:"Davies James",mar: 0.67,reg:"Wales",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"Vale Of Glamorgan",mp:"Alun Cairns",mprev:"Cairns Alun",mar: 13.41,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Vauxhall",mp:"Kate Hoey",mprev:"Hoey Kate",mar: 26.51,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wakefield",mp:"Mary Creagh",mprev:"Creagh Mary",mar: 6.08,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wallasey",mp:"Angela Eagle",mprev:"Eagle Angela",mar: 37.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Walsall North",mp:"David Winnick",mprev:"Winnick David",mar: 5.25,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Walsall South",mp:"Valerie Vaz",mprev:"Vaz Valerie",mar: 14.36,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Walthamstow",mp:"Stella Creasy",mprev:"Creasy Stella",mar: 55.5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wansbeck",mp:"Ian Lavery",mprev:"Lavery Ian",mar: 28.24,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wantage",mp:"Edward Vaizey",mprev:"Vaizey Edward",mar: 37.29,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Warley",mp:"John Spellar",mprev:"Spellar John",mar: 38.86,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Warrington North",mp:"Helen Jones",mprev:"Jones Helen",mar: 19.65,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Warrington South",mp:"David Mowat",mprev:"Mowat David",mar: 4.63,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Warwick and Leamington",mp:"Chris White",mprev:"White Chris",mar: 13.06,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Washington and Sunderland West",mp:"Sharon Hodgson",mprev:"Hodgson Sharon",mar: 35.31,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"Watford",mp:"Richard Harrington",mprev:"Harrington Richard",mar: 17.44,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Waveney",mp:"Peter Aldous",mprev:"Aldous Peter",mar: 4.61,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wealden",mp:"Nusrat Ghani",mprev:"Ghani Nusrat",mar: 40.28,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Weaver Vale",mp:"Graham Evans",mprev:"Evans Graham",mar: 1.72,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wellingborough",mp:"Peter Bone",mprev:"Bone Peter",mar: 32.51,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Wells",mp:"James Heappey",mprev:"Heappey James",mar: 13.33,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Welwyn Hatfield",mp:"Grant Shapps",mprev:"Shapps Grant",mar: 24.21,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wentworth and Dearne",mp:"John Healey",mprev:"Healey John",mar: 32.04,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"West Aberdeenshire and Kincardine",mp:"Stuart Donaldson",mprev:"Donaldson Stuart",mar: 12.74,reg:"Scotland",party:"Scottish National Party",prev:"#FDBB30",curr:"#FFFF00",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2015",con:"West Bromwich East",mp:"Tom Watson",mprev:"Watson Tom",mar: 25.26,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"West Bromwich West",mp:"Adrian Bailey",mprev:"Bailey Adrian",mar: 22.1,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015",con:"West Dorset",mp:"Oliver Letwin",mprev:"Letwin Oliver",mar: 28.57,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"West Dunbartonshire",mp:"Martin Docherty",mprev:"Docherty Martin",mar: 27.71,reg:"Scotland",party:"Scottish National Party",prev:"#DC241f",curr:"#FFFF00",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015",con:"West Ham",mp:"Lyn Brown",mprev:"Brown Lyn",mar: 53.01,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"West Lancashire",mp:"Rosie Cooper",mprev:"Cooper Rosie",mar: 16.83,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Westminster North",mp:"Karen Buck",mprev:"Buck Karen",mar: 5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Westmorland and Lonsdale",mp:"Tim Farron",mprev:"Farron Tim",mar: 18.29,reg:"North West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2015",con:"Weston-Super-Mare",mp:"John Penrose",mprev:"Penrose John",mar: 29.7,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"West Suffolk",mp:"Matthew Hancock",mprev:"Hancock Matthew",mar: 30.44,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"West Tyrone",mp:"Pat Doherty",mprev:"Doherty Pat",mar: 26.03,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#D46A4C",prevparty: "Sinn Fein",secparty:"Democratic Unionist Party"},
{year:"2015",con:"West Worcestershire",mp:"Harriett Baldwin",mprev:"Baldwin Harriett",mar: 41.73,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Wigan",mp:"Lisa Nandy",mprev:"Nandy Lisa",mar: 31.43,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wimbledon",mp:"Stephen Hammond",mprev:"Hammond Stephen",mar: 26.06,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Winchester",mp:"Steve Brine",mprev:"Brine Steve",mar: 30.58,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015",con:"Windsor",mp:"Adam Afriyie",mprev:"Afriyie Adam",mar: 50.01,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wirral South",mp:"Alison McGovern",mprev:"McGovern Alison",mar: 10.99,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wirral West",mp:"Margaret Greenwood",mprev:"Greenwood Margaret",mar: 1,reg:"North West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Witham",mp:"Priti Patel",mprev:"Patel Priti",mar: 41.46,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Witney",mp:"David Cameron",mprev:"Cameron David",mar: 43.01,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Woking",mp:"Jonathan Lord",mprev:"Lord Jonathan",mar: 40.05,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wokingham",mp:"John Redwood",mprev:"Redwood John",mar: 43.21,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wolverhampton North East",mp:"Emma Reynolds",mprev:"Reynolds Emma",mar: 16.16,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wolverhampton South East",mp:"Pat McFadden",mprev:"McFadden Pat",mar: 31,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wolverhampton South West",mp:"Rob Marris",mprev:"Marris Rob",mar: 1.99,reg:"West Midlands",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2015",con:"Worcester",mp:"Robin Walker",mprev:"Walker Robin",mar: 11.35,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Workington",mp:"Sue Hayman",mprev:"Hayman Sue",mar: 12.18,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Worsley and Eccles South",mp:"Barbara Keeley",mprev:"Keeley Barbara",mar: 14.14,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Worthing West",mp:"Peter Bottomley",mprev:"Bottomley Peter",mar: 33.2,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2015",con:"Wrexham",mp:"Ian Lucas",mprev:"Lucas Ian",mar: 5.6,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Wycombe",mp:"Steve Baker",mprev:"Baker Steve",mar: 28.88,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wyre and Preston North",mp:"Ben Wallace",mprev:"Wallace Ben",mar: 28.36,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wyre Forest",mp:"Mark Garnier",mprev:"Garnier Mark",mar: 26.03,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2015",con:"Wythenshawe and Sale East",mp:"Mike Kane",mprev:"Kane Mike",mar: 24.43,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"Yeovil",mp:"Marcus Fysh",mprev:"Fysh Marcus",mar: 9.33,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2015",con:"Ynys Mon",mp:"Albert Owen",mprev:"Owen Albert",mar: 0.66,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2015",con:"York Central",mp:"Rachael Maskell",mprev:"Maskell Rachael",mar: 14.09,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015",con:"York Outer",mp:"Julian Sturdy",mprev:"Sturdy Julian",mar: 24.36,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Aberavon",mp:"Hywel Francis",mprev:"Francis Hywel",mar: 35.7,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Aberconwy",mp:"Guto Bebb",mprev:"Bebb Guto",mar: 11.3,reg:"Wales",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Aberdeen North",mp:"Frank Doran",mprev:"Doran Frank",mar: 22.2,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Aberdeen South",mp:"Anne Begg",mprev:"Begg Anne",mar: 8.1,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"West Aberdeenshire and Kincardine",mp:"Robert Smith",mprev:"Smith Robert",mar: 8.2,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Airdrie and Shotts",mp:"Pamela Nash",mprev:"Nash Pamela",mar: 34.6,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Aldershot",mp:"Gerald Howarth",mprev:"Howarth Gerald",mar: 12.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Aldridge-Brownhills",mp:"Richard Shepherd",mprev:"Shepherd Richard",mar: 39.5,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Altrincham and Sale West",mp:"Graham Brady",mprev:"Brady Graham",mar: 23.5,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Alyn and Deeside",mp:"Mark Tami",mprev:"Tami Mark",mar: 7.3,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Amber Valley",mp:"Nigel Mills",mprev:"Mills Nigel",mar: 1.2,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Angus",mp:"Mike Weir",mprev:"Weir Mike",mar: 8.6,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2010",con:"East Antrim",mp:"Sammy Wilson",mprev:"Wilson Sammy",mar: 22.2,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"UCUNF UUP and CON joint party"},
{year:"2010",con:"North Antrim",mp:"Ian Paisley Junior",mprev:"Paisley Junior Ian",mar: 29.6,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#0095B6",prevparty: "Democratic Unionist Party",secparty:"Traditional Unionist Voice"},
{year:"2010",con:"South Antrim",mp:"William McCrea",mprev:"McCrea William",mar: 3.5,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"UCUNF UUP and CON joint party"},
{year:"2010",con:"Arfon",mp:"Hywel Williams",mprev:"Williams Hywel",mar: 5.6,reg:"Wales",party:"Plaid Cymru",prev:"#DC241f",curr:"#008142",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Argyll and Bute",mp:"Alan Reid",mprev:"Reid Alan",mar: 7.6,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Arundel and South Downs",mp:"Nick Herbert",mprev:"Herbert Nick",mar: 29.8,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Ashfield",mp:"Gloria de Piero",mprev:"de Piero Gloria",mar: 0.4,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Ashford",mp:"Damian Green",mprev:"Green Damian",mar: 31.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Ashton-Under-Lyne",mp:"David Heyes",mprev:"Heyes David",mar: 23.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Aylesbury",mp:"David Lidington",mprev:"Lidington David",mar: 23.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Ayr, Carrick and Cumnock",mp:"Sandra Osborne",mprev:"Osborne Sandra",mar: 21.6,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Central Ayrshire",mp:"Brian Donohoe",mprev:"Donohoe Brian",mar: 27.3,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"North Ayrshire and Arran",mp:"Katy Clark",mprev:"Clark Katy",mar: 21.5,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Banbury",mp:"Tony Baldry",mprev:"Baldry Tony",mar: 32.4,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Banff and Buchan",mp:"Eilidh Whiteford",mprev:"Whiteford Eilidh",mar: 10.5,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2010",con:"Barking",mp:"Margaret Hodge",mprev:"Hodge Margaret",mar: 36.5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Barnsley Central",mp:"Eric Illsley",mprev:"Illsley Eric",mar: 30,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Barnsley East",mp:"Michael Dugher",mprev:"Dugher Michael",mar: 28.9,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Barrow and Furness",mp:"John Woodcock",mprev:"Woodcock John",mar: 11.8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Basildon and Billericay",mp:"John Baron",mprev:"Baron John",mar: 29.7,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"South Basildon and East Thurrock",mp:"Stephen Metcalfe",mprev:"Metcalfe Stephen",mar: 12.9,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Basingstoke",mp:"Maria Miller",mprev:"Miller Maria",mar: 26,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bassetlaw",mp:"John Mann",mprev:"Mann John",mar: 16.6,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bath",mp:"Don Foster",mprev:"Foster Don",mar: 25.2,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Batley and Spen",mp:"Mike Wood",mprev:"Wood Mike",mar: 8.6,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Battersea",mp:"Jane Ellison",mprev:"Ellison Jane",mar: 12.2,reg:"London",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Beaconsfield",mp:"Dominic Grieve",mprev:"Grieve Dominic",mar: 41.5,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Beckenham",mp:"Bob Stewart",mprev:"Stewart Bob",mar: 37.3,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bedford",mp:"Richard Fuller",mprev:"Fuller Richard",mar: 3,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Mid Bedfordshire",mp:"Nadine Dorries",mprev:"Dorries Nadine",mar: 27.6,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North East Bedfordshire",mp:"Alistair Burt",mprev:"Burt Alistair",mar: 34.1,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South West Bedfordshire",mp:"Andrew Selous",mprev:"Selous Andrew",mar: 32.8,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Belfast East",mp:"Naomi Long",mprev:"Long Naomi",mar: 4.4,reg:"Northern Ireland",party:"Alliance",prev:"#D46A4C",curr:"#F6CB2F",sec:"#D46A4C",prevparty: "Democratic Unionist Party",secparty:"Democratic Unionist Party"},
{year:"2010",con:"Belfast North",mp:"Nigel Dodds",mprev:"Dodds Nigel",mar: 6,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#008800",prevparty: "Democratic Unionist Party",secparty:"Sinn Fein"},
{year:"2010",con:"Belfast South",mp:"Alasdair McDonnell",mprev:"McDonnell Alasdair",mar: 17.3,reg:"Northern Ireland",party:"Social Democratic and Labour Party",prev:"#99FF66",curr:"#99FF66",sec:"#D46A4C",prevparty: "Social Democratic and Labour Party",secparty:"Democratic Unionist Party"},
{year:"2010",con:"Belfast West",mp:"Gerry Adams",mprev:"Adams Gerry",mar: 54.7,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#99FF66",prevparty: "Sinn Fein",secparty:"Social Democratic and Labour Party"},
{year:"2010",con:"Bermondsey and Old Southwark",mp:"Simon Hughes",mprev:"Hughes Simon",mar: 19.1,reg:"London",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Berwick-Upon-Tweed",mp:"Alan Beith",mprev:"Beith Alan",mar: 7,reg:"North East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Berwickshire, Roxburgh and Selkirk",mp:"Michael Moore",mprev:"Moore Michael",mar: 11.6,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Bethnal Green and Bow",mp:"Rushanara Ali",mprev:"Ali Rushanara",mar: 22.8,reg:"London",party:"Labour",prev:"#46801c",curr:"#DC241f",sec:"#FDBB30",prevparty: "Respect",secparty:"Liberal Democrats"},
{year:"2010",con:"Beverley and Holderness",mp:"Graham Stuart",mprev:"Stuart Graham",mar: 24.4,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bexhill and Battle",mp:"Greg Barker",mprev:"Barker Greg",mar: 23.6,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bexleyheath and Crayford",mp:"David Evennett",mprev:"Evennett David",mar: 24,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Birkenhead",mp:"Frank Field",mprev:"Field Frank",mar: 43.6,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Birmingham, Edgbaston",mp:"Gisela Stuart",mprev:"Stuart Gisela",mar: 3.1,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Birmingham, Erdington",mp:"Jack Dromey",mprev:"Dromey Jack",mar: 9.2,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Birmingham, Hall Green",mp:"Roger Godsiff",mprev:"Godsiff Roger",mar: 7.8,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#46801c",prevparty: "Labour",secparty:"Respect"},
{year:"2010",con:"Birmingham, Hodge Hill",mp:"Liam Byrne",mprev:"Byrne Liam",mar: 24.3,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Birmingham, Ladywood",mp:"Shabana Mahmood",mprev:"Mahmood Shabana",mar: 28.2,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Birmingham, Northfield",mp:"Richard Burden",mprev:"Burden Richard",mar: 6.7,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Birmingham, Perry Barr",mp:"Khalid Mahmood",mprev:"Mahmood Khalid",mar: 28.3,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Birmingham, Selly Oak",mp:"Steve McCabe",mprev:"McCabe Steve",mar: 7.5,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Birmingham, Yardley",mp:"John Hemming",mprev:"Hemming John",mar: 7.3,reg:"West Midlands",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Bishop Auckland",mp:"Helen Goodman",mprev:"Goodman Helen",mar: 12.7,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Blackburn",mp:"Jack Straw",mprev:"Straw Jack",mar: 21.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Blackley and Broughton",mp:"Graham Stringer",mprev:"Stringer Graham",mar: 36,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Blackpool North and Cleveleys",mp:"Paul Maynard",mprev:"Maynard Paul",mar: 5.3,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Blackpool South",mp:"Gordon Marsden",mprev:"Marsden Gordon",mar: 5.3,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Blaenau Gwent",mp:"Nick Smith",mprev:"Smith Nick",mar: 32.5,reg:"Wales",party:"Labour",prev:"#DDDDDD",curr:"#DC241f",sec:"#177245",prevparty: "Ind Law",secparty:"Blaenau Gwent People's Voice"},
{year:"2010",con:"Blaydon",mp:"Dave Anderson",mprev:"Anderson Dave",mar: 20.3,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Blyth Valley",mp:"Ronnie Campbell",mprev:"Campbell Ronnie",mar: 17.3,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Bognor Regis and Littlehampton",mp:"Nick Gibb",mprev:"Gibb Nick",mar: 27.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bolsover",mp:"Dennis Skinner",mprev:"Skinner Dennis",mar: 25.4,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bolton North East",mp:"David Crausby",mprev:"Crausby David",mar: 9.4,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bolton South East",mp:"Yasmin Qureshi",mprev:"Qureshi Yasmin",mar: 21.8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bolton West",mp:"Julie Hilling",mprev:"Hilling Julie",mar: 0.2,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bootle",mp:"Joe Benton",mprev:"Benton Joe",mar: 51.3,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Boston and Skegness",mp:"Mark Simmonds",mprev:"Simmonds Mark",mar: 28.8,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Bosworth",mp:"David Tredinnick",mprev:"Tredinnick David",mar: 9.3,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bournemouth East",mp:"Tobias Ellwood",mprev:"Ellwood Tobias",mar: 17.6,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bournemouth West",mp:"Conor Burns",mprev:"Burns Conor",mar: 13.4,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bracknell",mp:"Phillip Lee",mprev:"Lee Phillip",mar: 30.1,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bradford East",mp:"David Ward",mprev:"Ward David",mar: 0.9,reg:"Yorkshire and The Humber",party:"Liberal Democrats",prev:"#DC241f",curr:"#FDBB30",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Bradford South",mp:"Gerry Sutcliffe",mprev:"Sutcliffe Gerry",mar: 12.2,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bradford West",mp:"Marsha Singh",mprev:"Singh Marsha",mar: 14.2,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Braintree",mp:"Brooks Newmark",mprev:"Newmark Brooks",mar: 32.8,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Brecon and Radnorshire",mp:"Roger Williams",mprev:"Williams Roger",mar: 9.6,reg:"Wales",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Brent Central",mp:"Sarah Teather",mprev:"Teather Sarah",mar: 3,reg:"London",party:"Liberal Democrats",prev:"#DC241f",curr:"#FDBB30",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Brent North",mp:"Barry Gardiner",mprev:"Gardiner Barry",mar: 15.4,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Brentford and Isleworth",mp:"Mary Macleod",mprev:"Macleod Mary",mar: 3.6,reg:"London",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Brentwood and Ongar",mp:"Eric Pickles",mprev:"Pickles Eric",mar: 33.4,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bridgend",mp:"Madeleine Moon",mprev:"Moon Madeleine",mar: 5.9,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bridgwater and West Somerset",mp:"Ian Liddell-Grainger",mprev:"Liddell-Grainger Ian",mar: 17,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Brigg and Goole",mp:"Andrew Percy",mprev:"Percy Andrew",mar: 11.7,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Brighton, Kemptown",mp:"Simon Kirby",mprev:"Kirby Simon",mar: 3.1,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Brighton, Pavilion",mp:"Caroline Lucas",mprev:"Lucas Caroline",mar: 2.4,reg:"South East",party:"Green",prev:"#DC241f",curr:"#6AB023",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Bristol East",mp:"Kerry McCarthy",mprev:"McCarthy Kerry",mar: 8.3,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bristol North West",mp:"Charlotte Leslie",mprev:"Leslie Charlotte",mar: 6.5,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Bristol South",mp:"Dawn Primarolo",mprev:"Primarolo Dawn",mar: 9.8,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Bristol West",mp:"Stephen Williams",mprev:"Williams Stephen",mar: 20.5,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Broadland",mp:"Keith Simpson",mprev:"Simpson Keith",mar: 13.8,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bromley and Chislehurst",mp:"Bob Neill",mprev:"Neill Bob",mar: 31.6,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Bromsgrove",mp:"Sajid Javid",mprev:"Javid Sajid",mar: 21.9,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Broxbourne",mp:"Charles Walker",mprev:"Walker Charles",mar: 41.2,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Broxtowe",mp:"Anna Soubry",mprev:"Soubry Anna",mar: 0.7,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Buckingham",mp:"John Bercow",mprev:"Bercow John",mar: 25.9,reg:"South East",party:"Speaker",prev:"#0087DC",curr:"#000000",sec:"#DDDDDD",prevparty: "Conservative",secparty:"Independent"},
{year:"2010",con:"Burnley",mp:"Gordon Birtwistle",mprev:"Birtwistle Gordon",mar: 4.3,reg:"North West",party:"Liberal Democrats",prev:"#DC241f",curr:"#FDBB30",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Burton",mp:"Andrew Griffiths",mprev:"Griffiths Andrew",mar: 12.7,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Bury North",mp:"David Nuttall",mprev:"Nuttall David",mar: 5,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Bury South",mp:"Ivan Lewis",mprev:"Lewis Ivan",mar: 6.8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Bury St Edmunds",mp:"David Ruffley",mprev:"Ruffley David",mar: 21.1,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Caerphilly",mp:"Wayne David",mprev:"David Wayne",mar: 27.8,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Caithness, Sutherland and Easter Ross",mp:"John Thurso",mprev:"Thurso John",mar: 16.8,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Calder Valley",mp:"Craig Whittaker",mprev:"Whittaker Craig",mar: 12.4,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Camberwell and Peckham",mp:"Harriet Harman",mprev:"Harman Harriet",mar: 36.8,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Camborne and Redruth",mp:"George Eustice",mprev:"Eustice George",mar: 0.2,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Cambridge",mp:"Julian Huppert",mprev:"Huppert Julian",mar: 13.5,reg:"East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"North East Cambridgeshire",mp:"Stephen Barclay",mprev:"Barclay Stephen",mar: 31.5,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North West Cambridgeshire",mp:"Shailesh Vara",mprev:"Vara Shailesh",mar: 28.6,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South Cambridgeshire",mp:"Andrew Lansley",mprev:"Lansley Andrew",mar: 13.3,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South East Cambridgeshire",mp:"Jim Paice",mprev:"Paice Jim",mar: 10.3,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Cannock Chase",mp:"Aidan Burley",mprev:"Burley Aidan",mar: 7,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Canterbury",mp:"Julian Brazier",mprev:"Brazier Julian",mar: 12.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Cardiff Central",mp:"Jenny Willott",mprev:"Willott Jenny",mar: 12.7,reg:"Wales",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Cardiff North",mp:"Jonathan Evans",mprev:"Evans Jonathan",mar: 0.4,reg:"Wales",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Cardiff South and Penarth",mp:"Alun Michael",mprev:"Michael Alun",mar: 10.6,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Cardiff West",mp:"Kevin Brennan",mprev:"Brennan Kevin",mar: 11.6,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Carlisle",mp:"John Stevenson",mprev:"Stevenson John",mar: 2,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Carmarthen East and Dinefwr",mp:"Jonathan Edwards",mprev:"Edwards Jonathan",mar: 9.2,reg:"Wales",party:"Plaid Cymru",prev:"#008142",curr:"#008142",sec:"#DC241f",prevparty: "Plaid Cymru",secparty:"Labour"},
{year:"2010",con:"Carmarthen West and South Pembrokeshire",mp:"Simon Hart",mprev:"Hart Simon",mar: 8.5,reg:"Wales",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Carshalton and Wallington",mp:"Tom Brake",mprev:"Brake Tom",mar: 11.5,reg:"London",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Castle Point",mp:"Rebecca Harris",mprev:"Harris Rebecca",mar: 17,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DDDDDD",prevparty: "Conservative",secparty:"Independent Save Green Belt"},
{year:"2010",con:"Ceredigion",mp:"Mark Williams",mprev:"Williams Mark",mar: 21.8,reg:"Wales",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#008142",prevparty: "Liberal Democrats",secparty:"Plaid Cymru"},
{year:"2010",con:"Charnwood",mp:"Stephen Dorrell",mprev:"Dorrell Stephen",mar: 28.1,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Chatham and Aylesford",mp:"Tracey Crouch",mprev:"Crouch Tracey",mar: 13.9,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Cheadle",mp:"Mark Hunter",mprev:"Hunter Mark",mar: 6.2,reg:"North West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Chelmsford",mp:"Simon Burns",mprev:"Burns Simon",mar: 9.4,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Chelsea and Fulham",mp:"Greg Hands",mprev:"Hands Greg",mar: 42,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Cheltenham",mp:"Martin Horwood",mprev:"Horwood Martin",mar: 9.3,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Chesham and Amersham",mp:"Cheryl Gillan",mprev:"Gillan Cheryl",mar: 31.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"City Of Chester",mp:"Stephen Mosley",mprev:"Mosley Stephen",mar: 5.5,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Chesterfield",mp:"Toby Perkins",mprev:"Perkins Toby",mar: 1.2,reg:"East Midlands",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Chichester",mp:"Andrew Tyrie",mprev:"Tyrie Andrew",mar: 28,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Chingford and Woodford Green",mp:"Iain Duncan Smith",mprev:"Duncan Smith Iain",mar: 30.1,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Chippenham",mp:"Duncan Hames",mprev:"Hames Duncan",mar: 4.7,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Chipping Barnet",mp:"Theresa Villiers",mprev:"Villiers Theresa",mar: 23.6,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Chorley",mp:"Lindsay Hoyle",mprev:"Hoyle Lindsay",mar: 5.2,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Christchurch",mp:"Christopher Chope",mprev:"Chope Christopher",mar: 31.2,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Cities Of London and Westminster",mp:"Mark Field",mprev:"Field Mark",mar: 30,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Clacton",mp:"Douglas Carswell",mprev:"Carswell Douglas",mar: 28,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Cleethorpes",mp:"Martin Vickers",mprev:"Vickers Martin",mar: 9.6,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Clwyd South",mp:"Susan Elan Jones",mprev:"Jones Susan Elan",mar: 8.2,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Clwyd West",mp:"David Jones",mprev:"Jones David",mar: 16.8,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Coatbridge, Chryston and Bellshill",mp:"Tom Clarke",mprev:"Clarke Tom",mar: 49.8,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Colchester",mp:"Bob Russell",mprev:"Russell Bob",mar: 15.1,reg:"East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Colne Valley",mp:"Jason McCartney",mprev:"McCartney Jason",mar: 8.7,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Congleton",mp:"Fiona Bruce",mprev:"Bruce Fiona",mar: 13.9,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Copeland",mp:"Jamie Reed",mprev:"Reed Jamie",mar: 9,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Corby",mp:"Louise Bagshawe",mprev:"Bagshawe Louise",mar: 3.5,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"North Cornwall",mp:"Dan Rogerson",mprev:"Rogerson Dan",mar: 6.4,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"South East Cornwall",mp:"Sheryll Murray",mprev:"Murray Sheryll",mar: 6.5,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"The Cotswolds",mp:"Geoffrey Clifton-Brown",mprev:"Clifton-Brown Geoffrey",mar: 23.5,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Coventry North East",mp:"Bob Ainsworth",mprev:"Ainsworth Bob",mar: 27.1,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Coventry North West",mp:"Geoffrey Robinson",mprev:"Robinson Geoffrey",mar: 13.5,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Coventry South",mp:"Jim Cunningham",mprev:"Cunningham Jim",mar: 8.4,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Crawley",mp:"Henry Smith",mprev:"Smith Henry",mar: 12.5,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Crewe and Nantwich",mp:"Edward Timpson",mprev:"Timpson Edward",mar: 11.8,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Croydon Central",mp:"Gavin Barwell",mprev:"Barwell Gavin",mar: 5.8,reg:"London",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Croydon North",mp:"Malcolm Wicks",mprev:"Wicks Malcolm",mar: 31.9,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Croydon South",mp:"Richard Ottaway",mprev:"Ottaway Richard",mar: 28.1,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Cumbernauld, Kilsyth and Kirkintilloch East",mp:"Gregg McClymont",mprev:"McClymont Gregg",mar: 33.4,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Cynon Valley",mp:"Ann Clwyd",mprev:"Clwyd Ann",mar: 32.2,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2010",con:"Dagenham and Rainham",mp:"Jon Cruddas",mprev:"Cruddas Jon",mar: 5.9,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Darlington",mp:"Jenny Chapman",mprev:"Chapman Jenny",mar: 7.9,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Dartford",mp:"Gareth Johnson",mprev:"Johnson Gareth",mar: 21.2,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Daventry",mp:"Chris Heaton-Harris",mprev:"Heaton-Harris Chris",mar: 37.1,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Delyn",mp:"David Hanson",mprev:"Hanson David",mar: 6.1,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Denton and Reddish",mp:"Andrew Gwynne",mprev:"Gwynne Andrew",mar: 26.1,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Derby North",mp:"Chris Williamson",mprev:"Williamson Chris",mar: 1.4,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Derby South",mp:"Margaret Beckett",mprev:"Beckett Margaret",mar: 14.9,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Derbyshire Dales",mp:"Patrick McLoughlin",mprev:"McLoughlin Patrick",mar: 29.6,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Mid Derbyshire",mp:"Pauline Latham",mprev:"Latham Pauline",mar: 23.9,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"North East Derbyshire",mp:"Natascha Engel",mprev:"Engel Natascha",mar: 5.2,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"South Derbyshire",mp:"Heather Wheeler",mprev:"Wheeler Heather",mar: 14.1,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Devizes",mp:"Claire Perry",mprev:"Perry Claire",mar: 28.1,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Central Devon",mp:"Mel Stride",mprev:"Stride Mel",mar: 17.1,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"East Devon",mp:"Hugo Swire",mprev:"Swire Hugo",mar: 17.2,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North Devon",mp:"Nick Harvey",mprev:"Harvey Nick",mar: 11.3,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"South West Devon",mp:"Gary Streeter",mprev:"Streeter Gary",mar: 31.8,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Torridge and West Devon",mp:"Geoffrey Cox",mprev:"Cox Geoffrey",mar: 5.4,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Dewsbury",mp:"Simon Reevell",mprev:"Reevell Simon",mar: 2.8,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Don Valley",mp:"Caroline Flint",mprev:"Flint Caroline",mar: 8.3,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Doncaster Central",mp:"Rosie Winterton",mprev:"Winterton Rosie",mar: 14.9,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Doncaster North",mp:"Ed Miliband",mprev:"Miliband Ed",mar: 26.3,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Mid Dorset and North Poole",mp:"Annette Brooke",mprev:"Brooke Annette",mar: 0.6,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"North Dorset",mp:"Bob Walter",mprev:"Walter Bob",mar: 14.1,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South Dorset",mp:"Richard Drax",mprev:"Drax Richard",mar: 14.8,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"West Dorset",mp:"Oliver Letwin",mprev:"Letwin Oliver",mar: 6.8,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Dover",mp:"Charlie Elphicke",mprev:"Elphicke Charlie",mar: 10.5,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"North Down",mp:"Sylvia Hermon",mprev:"Hermon Sylvia",mar: 42.9,reg:"Northern Ireland",party:"Independent",prev:"#9999FF",curr:"#DDDDDD",sec:"#9999FF",prevparty: "Ulster Unionist Party",secparty:"UCUNF UUP and CON joint party"},
{year:"2010",con:"South Down",mp:"Margaret Ritchie",mprev:"Ritchie Margaret",mar: 19.8,reg:"Northern Ireland",party:"Social Democratic and Labour Party",prev:"#99FF66",curr:"#99FF66",sec:"#008800",prevparty: "Social Democratic and Labour Party",secparty:"Sinn Fein"},
{year:"2010",con:"Dudley North",mp:"Ian Austin",mprev:"Austin Ian",mar: 1.7,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Dudley South",mp:"Chris Kelly",mprev:"Kelly Chris",mar: 10.1,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Dulwich and West Norwood",mp:"Tessa Jowell",mprev:"Jowell Tessa",mar: 19.4,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Dumfries and Galloway",mp:"Russell Brown",mprev:"Brown Russell",mar: 14.3,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Dumfriesshire, Clydesdale and Tweeddale",mp:"David Mundell",mprev:"Mundell David",mar: 9.1,reg:"Scotland",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"East Dunbartonshire",mp:"Jo Swinson",mprev:"Swinson Jo",mar: 4.6,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"West Dunbartonshire",mp:"Gemma Doyle",mprev:"Doyle Gemma",mar: 41.2,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Dundee East",mp:"Stewart Hosie",mprev:"Hosie Stewart",mar: 4.5,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2010",con:"Dundee West",mp:"Jim McGovern",mprev:"McGovern Jim",mar: 19.6,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Dunfermline and West Fife",mp:"Thomas Docherty",mprev:"Docherty Thomas",mar: 11.2,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"North Durham",mp:"Kevan Jones",mprev:"Jones Kevan",mar: 29.5,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"North West Durham",mp:"Pat Glass",mprev:"Glass Pat",mar: 17.4,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"City Of Durham",mp:"Roberta Blackman-Woods",mprev:"Blackman-Woods Roberta",mar: 6.6,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Dwyfor Meirionnydd",mp:"Elfyn Llwyd",mprev:"Llwyd Elfyn",mar: 22,reg:"Wales",party:"Plaid Cymru",prev:"#008142",curr:"#008142",sec:"#0087DC",prevparty: "Plaid Cymru",secparty:"Conservative"},
{year:"2010",con:"Ealing Central and Acton",mp:"Angie Bray",mprev:"Bray Angie",mar: 7.9,reg:"London",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Ealing North",mp:"Stephen Pound",mprev:"Pound Stephen",mar: 19.5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Ealing, Southall",mp:"Virendra Sharma",mprev:"Sharma Virendra",mar: 21.7,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Easington",mp:"Grahame Morris",mprev:"Morris Grahame",mar: 42.9,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"East Ham",mp:"Stephen Timms",mprev:"Timms Stephen",mar: 55.2,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"East Kilbride, Strathaven and Lesmahagow",mp:"Michael McCann",mprev:"McCann Michael",mar: 28.5,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"East Lothian",mp:"Fiona O'Donnell",mprev:"O'Donnell Fiona",mar: 24.9,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Eastbourne",mp:"Stephen Lloyd",mprev:"Lloyd Stephen",mar: 6.6,reg:"South East",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2010",con:"Eastleigh",mp:"Chris Huhne",mprev:"Huhne Chris",mar: 7.2,reg:"South East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Eddisbury",mp:"Stephen O'Brien",mprev:"O'Brien Stephen",mar: 29.2,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Edinburgh East",mp:"Sheila Gilmore",mprev:"Gilmore Sheila",mar: 23,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Edinburgh North and Leith",mp:"Mark Lazarowicz",mprev:"Lazarowicz Mark",mar: 3.6,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Edinburgh South",mp:"Ian Murray",mprev:"Murray Ian",mar: 0.7,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Edinburgh South West",mp:"Alistair Darling",mprev:"Darling Alistair",mar: 18.6,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Edinburgh West",mp:"Michael Crockart",mprev:"Crockart Michael",mar: 8.2,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Edmonton",mp:"Andy Love",mprev:"Love Andy",mar: 23.8,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Ellesmere Port and Neston",mp:"Andrew Miller",mprev:"Miller Andrew",mar: 9.8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Elmet and Rothwell",mp:"Alec Shelbrooke",mprev:"Shelbrooke Alec",mar: 8.1,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Eltham",mp:"Clive Efford",mprev:"Efford Clive",mar: 4,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Enfield North",mp:"Nick de Bois",mprev:"de Bois Nick",mar: 3.8,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Enfield, Southgate",mp:"David Burrowes",mprev:"Burrowes David",mar: 17.2,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Epping Forest",mp:"Eleanor Laing",mprev:"Laing Eleanor",mar: 32.5,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Epsom and Ewell",mp:"Chris Grayling",mprev:"Grayling Chris",mar: 29.4,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Erewash",mp:"Jessica Lee",mprev:"Lee Jessica",mar: 5.2,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Erith and Thamesmead",mp:"Teresa Pearce",mprev:"Pearce Teresa",mar: 13.4,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Esher and Walton",mp:"Dominic Raab",mprev:"Raab Dominic",mar: 34.1,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Exeter",mp:"Ben Bradshaw",mprev:"Bradshaw Ben",mar: 5.2,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Falkirk",mp:"Eric Joyce",mprev:"Joyce Eric",mar: 15.4,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#2e3b74",prevparty: "Labour",secparty:"British National Party"},
{year:"2010",con:"Fareham",mp:"Mark Hoban",mprev:"Hoban Mark",mar: 31.5,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Faversham and Mid Kent",mp:"Hugh Robertson",mprev:"Robertson Hugh",mar: 36.6,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Feltham and Heston",mp:"Alan Keen",mprev:"Keen Alan",mar: 9.6,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Fermanagh and South Tyrone",mp:"Michelle Gildernew",mprev:"Gildernew Michelle",mar: 0,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#DDDDDD",prevparty: "Sinn Fein",secparty:"Independent"},
{year:"2010",con:"North East Fife",mp:"Menzies Campbell",mprev:"Campbell Menzies",mar: 22.6,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Filton and Bradley Stoke",mp:"Jack Lopresti",mprev:"Lopresti Jack",mar: 14.3,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Finchley and Golders Green",mp:"Mike Freer",mprev:"Freer Mike",mar: 12.3,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Folkestone and Hythe",mp:"Damian Collins",mprev:"Collins Damian",mar: 19.2,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Forest Of Dean",mp:"Mark Harper",mprev:"Harper Mark",mar: 22.7,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Foyle",mp:"Mark Durkan",mprev:"Durkan Mark",mar: 12.7,reg:"Northern Ireland",party:"Social Democratic and Labour Party",prev:"#99FF66",curr:"#99FF66",sec:"#008800",prevparty: "Social Democratic and Labour Party",secparty:"Sinn Fein"},
{year:"2010",con:"Fylde",mp:"Mark Menzies",mprev:"Menzies Mark",mar: 30.2,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Gainsborough",mp:"Edward Leigh",mprev:"Leigh Edward",mar: 21.4,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Garston and Halewood",mp:"Maria Eagle",mprev:"Eagle Maria",mar: 39.4,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Gateshead",mp:"Ian Mearns",mprev:"Mearns Ian",mar: 32.8,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Gedling",mp:"Vernon Coaker",mprev:"Coaker Vernon",mar: 3.9,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Gillingham and Rainham",mp:"Rehman Chishti",mprev:"Chishti Rehman",mar: 18.6,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Glasgow Central",mp:"Anas Sarwar",mprev:"Sarwar Anas",mar: 34.5,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Glasgow East",mp:"Margaret Curran",mprev:"Curran Margaret",mar: 36.8,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Glasgow North",mp:"Ann McKechin",mprev:"McKechin Ann",mar: 13.2,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Glasgow North East",mp:"Willie Bain",mprev:"Bain Willie",mar: 54.2,reg:"Scotland",party:"Labour",prev:"#000000",curr:"#DC241f",sec:"#FFFF00",prevparty: "Speaker",secparty:"Scottish National Party"},
{year:"2010",con:"Glasgow North West",mp:"John Robertson",mprev:"Robertson John",mar: 38.3,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Glasgow South",mp:"Tom Harris",mprev:"Harris Tom",mar: 31.6,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Glasgow South West",mp:"Ian Davidson",mprev:"Davidson Ian",mar: 46.2,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Glenrothes",mp:"Lindsay Roy",mprev:"Roy Lindsay",mar: 40.6,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Gloucester",mp:"Richard Graham",mprev:"Graham Richard",mar: 4.8,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Gordon",mp:"Malcolm Bruce",mprev:"Bruce Malcolm",mar: 13.8,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#FFFF00",prevparty: "Liberal Democrats",secparty:"Scottish National Party"},
{year:"2010",con:"Gosport",mp:"Caroline Dinenage",mprev:"Dinenage Caroline",mar: 30.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Gower",mp:"Martin Caton",mprev:"Caton Martin",mar: 6.4,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Grantham and Stamford",mp:"Nicholas Boles",mprev:"Boles Nicholas",mar: 28.1,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Gravesham",mp:"Adam Holloway",mprev:"Holloway Adam",mar: 19.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Great Grimsby",mp:"Austin Mitchell",mprev:"Mitchell Austin",mar: 2.2,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Great Yarmouth",mp:"Brandon Lewis",mprev:"Lewis Brandon",mar: 9.9,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Greenwich and Woolwich",mp:"Nick Raynsford",mprev:"Raynsford Nick",mar: 24.7,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Guildford",mp:"Anne Milton",mprev:"Milton Anne",mar: 14,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hackney North and Stoke Newington",mp:"Diane Abbott",mprev:"Abbott Diane",mar: 31.1,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Hackney South and Shoreditch",mp:"Meg Hillier",mprev:"Hillier Meg",mar: 33.3,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Halesowen and Rowley Regis",mp:"James Morris",mprev:"Morris James",mar: 4.6,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Halifax",mp:"Linda Riordan",mprev:"Riordan Linda",mar: 3.4,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Haltemprice and Howden",mp:"David Davis",mprev:"Davis David",mar: 23.8,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Halton",mp:"Derek Twigg",mprev:"Twigg Derek",mar: 37.5,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Hammersmith",mp:"Andy Slaughter",mprev:"Slaughter Andy",mar: 7.5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"East Hampshire",mp:"Damian Hinds",mprev:"Hinds Damian",mar: 26.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North East Hampshire",mp:"James Arbuthnot",mprev:"Arbuthnot James",mar: 35.1,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North West Hampshire",mp:"George Young",mprev:"Young George",mar: 34.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hampstead and Kilburn",mp:"Glenda Jackson",mprev:"Jackson Glenda",mar: 0.1,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Harborough",mp:"Edward Garnier",mprev:"Garnier Edward",mar: 17.8,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Harlow",mp:"Robert Halfon",mprev:"Halfon Robert",mar: 11.2,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Harrogate and Knaresborough",mp:"Andrew Jones",mprev:"Jones Andrew",mar: 2,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Harrow East",mp:"Bob Blackman",mprev:"Blackman Bob",mar: 7.1,reg:"London",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Harrow West",mp:"Gareth Thomas",mprev:"Thomas Gareth",mar: 6.8,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Hartlepool",mp:"Iain Wright",mprev:"Wright Iain",mar: 14.4,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Harwich and North Essex",mp:"Bernard Jenkin",mprev:"Jenkin Bernard",mar: 23.4,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hastings and Rye",mp:"Amber Rudd",mprev:"Rudd Amber",mar: 4,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Havant",mp:"David Willetts",mprev:"Willetts David",mar: 27.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hayes and Harlington",mp:"John McDonnell",mprev:"McDonnell John",mar: 25.4,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Hazel Grove",mp:"Andrew Stunell",mprev:"Stunell Andrew",mar: 15.2,reg:"North West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Hemel Hempstead",mp:"Mike Penning",mprev:"Penning Mike",mar: 27.1,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hemsworth",mp:"Jon Trickett",mprev:"Trickett Jon",mar: 22.5,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Hendon",mp:"Matthew Offord",mprev:"Offord Matthew",mar: 0.2,reg:"London",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Henley",mp:"John Howell",mprev:"Howell John",mar: 31,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hereford and South Herefordshire",mp:"Jesse Norman",mprev:"Norman Jesse",mar: 5.1,reg:"West Midlands",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"North Herefordshire",mp:"Bill Wiggin",mprev:"Wiggin Bill",mar: 20.8,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hertford and Stortford",mp:"Mark Prisk",mprev:"Prisk Mark",mar: 27.9,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North East Hertfordshire",mp:"Oliver Heald",mprev:"Heald Oliver",mar: 30.1,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South West Hertfordshire",mp:"David Gauke",mprev:"Gauke David",mar: 26.3,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hertsmere",mp:"James Clappison",mprev:"Clappison James",mar: 37.2,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Hexham",mp:"Guy Opperman",mprev:"Opperman Guy",mar: 13.3,reg:"North East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Heywood and Middleton",mp:"Jim Dobbin",mprev:"Dobbin Jim",mar: 12.9,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"High Peak",mp:"Andrew Bingham",mprev:"Bingham Andrew",mar: 9.3,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Hitchin and Harpenden",mp:"Peter Lilley",mprev:"Lilley Peter",mar: 27.9,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Holborn and St Pancras",mp:"Frank Dobson",mprev:"Dobson Frank",mar: 18.2,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Hornchurch and Upminster",mp:"Angela Watkinson",mprev:"Watkinson Angela",mar: 30.7,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Hornsey and Wood Green",mp:"Lynne Featherstone",mprev:"Featherstone Lynne",mar: 12.5,reg:"London",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Horsham",mp:"Francis Maude",mprev:"Maude Francis",mar: 20.5,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Houghton and Sunderland South",mp:"Bridget Phillipson",mprev:"Phillipson Bridget",mar: 28.9,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Hove",mp:"Mike Weatherley",mprev:"Weatherley Mike",mar: 3.7,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Huddersfield",mp:"Barry Sheerman",mprev:"Sheerman Barry",mar: 11,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Kingston upon Hull East",mp:"Karl Turner",mprev:"Turner Karl",mar: 25.1,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Kingston upon Hull North",mp:"Diana Johnson",mprev:"Johnson Diana",mar: 1.9,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Kingston upon Hull West and Hessle",mp:"Alan Johnson",mprev:"Johnson Alan",mar: 18.2,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Huntingdon",mp:"Jonathan Djanogly",mprev:"Djanogly Jonathan",mar: 19.9,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Hyndburn",mp:"Graham Jones",mprev:"Jones Graham",mar: 7.2,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Ilford North",mp:"Lee Scott",mprev:"Scott Lee",mar: 11.5,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Ilford South",mp:"Mike Gapes",mprev:"Gapes Mike",mar: 22,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Inverclyde",mp:"David Cairns",mprev:"Cairns David",mar: 38.4,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Inverness, Nairn, Badenoch and Strathspey",mp:"Danny Alexander",mprev:"Alexander Danny",mar: 18.6,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Ipswich",mp:"Ben Gummer",mprev:"Gummer Ben",mar: 4.4,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Isle Of Wight",mp:"Andrew Turner",mprev:"Turner Andrew",mar: 15,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Islington North",mp:"Jeremy Corbyn",mprev:"Corbyn Jeremy",mar: 27.8,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Islington South and Finsbury",mp:"Emily Thornberry",mprev:"Thornberry Emily",mar: 8.2,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Islwyn",mp:"Christopher Evans",mprev:"Evans Christopher",mar: 35.2,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Jarrow",mp:"Stephen Hepburn",mprev:"Hepburn Stephen",mar: 33.3,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Keighley",mp:"Kris Hopkins",mprev:"Hopkins Kris",mar: 6.2,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Kenilworth and Southam",mp:"Jeremy Wright",mprev:"Wright Jeremy",mar: 25.9,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Kensington",mp:"Malcolm Rifkind",mprev:"Rifkind Malcolm",mar: 24.5,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Kettering",mp:"Philip Hollobone",mprev:"Hollobone Philip",mar: 19.2,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Kilmarnock and Loudoun",mp:"Cathy Jamieson",mprev:"Jamieson Cathy",mar: 26.6,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Kingston and Surbiton",mp:"Edward Davey",mprev:"Davey Edward",mar: 13.2,reg:"London",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Kingswood",mp:"Chris Skidmore",mprev:"Skidmore Chris",mar: 5.1,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Kirkcaldy and Cowdenbeath",mp:"Gordon Brown",mprev:"Brown Gordon",mar: 50.2,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Knowsley",mp:"George Howarth",mprev:"Howarth George",mar: 57.5,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Lagan Valley",mp:"Jeffrey Donaldson",mprev:"Donaldson Jeffrey",mar: 28.7,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"UCUNF UUP and CON joint party"},
{year:"2010",con:"Lanark and Hamilton East",mp:"Jim Hood",mprev:"Hood Jim",mar: 29,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"West Lancashire",mp:"Rosie Cooper",mprev:"Cooper Rosie",mar: 9,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Lancaster and Fleetwood",mp:"Eric Ollerenshaw",mprev:"Ollerenshaw Eric",mar: 0.8,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Leeds Central",mp:"Hilary Benn",mprev:"Benn Hilary",mar: 28.5,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Leeds East",mp:"George Mudie",mprev:"Mudie George",mar: 27.2,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Leeds North East",mp:"Fabian Hamilton",mprev:"Hamilton Fabian",mar: 9.6,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Leeds North West",mp:"Greg Mulholland",mprev:"Mulholland Greg",mar: 20.9,reg:"Yorkshire and The Humber",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Leeds West",mp:"Rachel Reeves",mprev:"Reeves Rachel",mar: 18.1,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Leicester East",mp:"Keith Vaz",mprev:"Vaz Keith",mar: 29.3,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Leicester South",mp:"Peter Soulsby",mprev:"Soulsby Peter",mar: 18.7,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Leicester West",mp:"Elizabeth Kendall",mprev:"Kendall Elizabeth",mar: 11.2,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"North West Leicestershire",mp:"Andrew Bridgen",mprev:"Bridgen Andrew",mar: 14.5,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"South Leicestershire",mp:"Andrew Robathan",mprev:"Robathan Andrew",mar: 28.4,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Leigh",mp:"Andy Burnham",mprev:"Burnham Andy",mar: 27.1,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Lewes",mp:"Norman Baker",mprev:"Baker Norman",mar: 15.3,reg:"South East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Lewisham, Deptford",mp:"Joan Ruddock",mprev:"Ruddock Joan",mar: 30.3,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Lewisham East",mp:"Heidi Alexander",mprev:"Alexander Heidi",mar: 14.9,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Lewisham West and Penge",mp:"Jim Dowd",mprev:"Dowd Jim",mar: 12.9,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Leyton and Wanstead",mp:"John Cryer",mprev:"Cryer John",mar: 16,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Lichfield",mp:"Michael Fabricant",mprev:"Fabricant Michael",mar: 34.3,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Lincoln",mp:"Karl McCartney",mprev:"McCartney Karl",mar: 2.3,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Linlithgow and East Falkirk",mp:"Michael Connarty",mprev:"Connarty Michael",mar: 24.4,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Liverpool, Riverside",mp:"Louise Ellman",mprev:"Ellman Louise",mar: 36.5,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Liverpool, Walton",mp:"Steve Rotheram",mprev:"Rotheram Steve",mar: 57.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Liverpool, Wavertree",mp:"Luciana Berger",mprev:"Berger Luciana",mar: 18.9,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Liverpool, West Derby",mp:"Stephen Twigg",mprev:"Twigg Stephen",mar: 51.6,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Livingston",mp:"Graeme Morrice",mprev:"Morrice Graeme",mar: 22.5,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Llanelli",mp:"Nia Griffith",mprev:"Griffith Nia",mar: 12.5,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2010",con:"East Londonderry",mp:"Gregory Campbell",mprev:"Campbell Gregory",mar: 15.3,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#008800",prevparty: "Democratic Unionist Party",secparty:"Sinn Fein"},
{year:"2010",con:"Loughborough",mp:"Nicky Morgan",mprev:"Morgan Nicky",mar: 7.1,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Louth and Horncastle",mp:"Peter Tapsell",mprev:"Tapsell Peter",mar: 27.5,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Ludlow",mp:"Philip Dunne",mprev:"Dunne Philip",mar: 20,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Luton North",mp:"Kelvin Hopkins",mprev:"Hopkins Kelvin",mar: 17.5,reg:"East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Luton South",mp:"Gavin Shuker",mprev:"Shuker Gavin",mar: 5.5,reg:"East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Macclesfield",mp:"David Rutley",mprev:"Rutley David",mar: 23.9,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Maidenhead",mp:"Theresa May",mprev:"May Theresa",mar: 31.2,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Maidstone and The Weald",mp:"Helen Grant",mprev:"Grant Helen",mar: 12,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Makerfield",mp:"Yvonne Fovargue",mprev:"Fovargue Yvonne",mar: 28.5,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Maldon",mp:"John Whittingdale",mprev:"Whittingdale John",mar: 40.5,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Manchester Central",mp:"Tony Lloyd",mprev:"Lloyd Tony",mar: 26.1,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Manchester, Gorton",mp:"Gerald Kaufman",mprev:"Kaufman Gerald",mar: 17.5,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Manchester, Withington",mp:"John Leech",mprev:"Leech John",mar: 4.2,reg:"North West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Mansfield",mp:"Joseph Meale",mprev:"Meale Joseph",mar: 12.4,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Meon Valley",mp:"George Hollingbery",mprev:"Hollingbery George",mar: 23.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Meriden",mp:"Caroline Spelman",mprev:"Spelman Caroline",mar: 31.2,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Merthyr Tydfil and Rhymney",mp:"Dai Havard",mprev:"Havard Dai",mar: 12.6,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Middlesbrough",mp:"Stuart Bell",mprev:"Bell Stuart",mar: 26,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Middlesbrough South and East Cleveland",mp:"Tom Blenkinsop",mprev:"Blenkinsop Tom",mar: 3.6,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Midlothian",mp:"David Hamilton",mprev:"Hamilton David",mar: 26.4,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Milton Keynes North",mp:"Mark Lancaster",mprev:"Lancaster Mark",mar: 16.6,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Milton Keynes South",mp:"Iain Stewart",mprev:"Stewart Iain",mar: 9.4,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Mitcham and Morden",mp:"Siobhain McDonagh",mprev:"McDonagh Siobhain",mar: 31.2,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Mole Valley",mp:"Paul Beresford",mprev:"Beresford Paul",mar: 28.8,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Monmouth",mp:"David Davies",mprev:"Davies David",mar: 22.4,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Montgomeryshire",mp:"Glyn Davies",mprev:"Davies Glyn",mar: 3.5,reg:"Wales",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Moray",mp:"Angus Robertson",mprev:"Robertson Angus",mar: 13.6,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2010",con:"Morecambe and Lunesdale",mp:"David Morris",mprev:"Morris David",mar: 2,reg:"North West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Morley and Outwood",mp:"Ed Balls",mprev:"Balls Ed",mar: 2.3,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Motherwell and Wishaw",mp:"Frank Roy",mprev:"Roy Frank",mar: 43,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Na h-Eileanan An Iar",mp:"Angus MacNeil",mprev:"MacNeil Angus",mar: 12.8,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2010",con:"Neath",mp:"Peter Hain",mprev:"Hain Peter",mar: 26.3,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2010",con:"New Forest East",mp:"Julian Lewis",mprev:"Lewis Julian",mar: 22.6,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"New Forest West",mp:"Desmond Swayne",mprev:"Swayne Desmond",mar: 35.5,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Newark",mp:"Patrick Mercer",mprev:"Mercer Patrick",mar: 31.5,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Newbury",mp:"Richard Benyon",mprev:"Benyon Richard",mar: 20.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Newcastle Upon Tyne Central",mp:"Chi Onwurah",mprev:"Onwurah Chi",mar: 21.9,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Newcastle Upon Tyne East",mp:"Nicholas Brown",mprev:"Brown Nicholas",mar: 11.8,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Newcastle Upon Tyne North",mp:"Catherine McKinnell",mprev:"McKinnell Catherine",mar: 7.8,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Newcastle-Under-Lyme",mp:"Paul Farrelly",mprev:"Farrelly Paul",mar: 3.6,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Newport East",mp:"Jessica Morden",mprev:"Morden Jessica",mar: 4.8,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Newport West",mp:"Paul Flynn",mprev:"Flynn Paul",mar: 8.9,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Newry and Armagh",mp:"Conor Murphy",mprev:"Murphy Conor",mar: 18.6,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#99FF66",prevparty: "Sinn Fein",secparty:"Social Democratic and Labour Party"},
{year:"2010",con:"Newton Abbot",mp:"Anne-Marie Morris",mprev:"Morris Anne-Marie",mar: 1.1,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Mid Norfolk",mp:"George Freeman",mprev:"Freeman George",mar: 27.3,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North Norfolk",mp:"Norman Lamb",mprev:"Lamb Norman",mar: 23.4,reg:"East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"North West Norfolk",mp:"Henry Bellingham",mprev:"Bellingham Henry",mar: 31,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South Norfolk",mp:"Richard Bacon",mprev:"Bacon Richard",mar: 19.9,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South West Norfolk",mp:"Elizabeth Truss",mprev:"Truss Elizabeth",mar: 26.7,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Normanton, Pontefract and Castleford",mp:"Yvette Cooper",mprev:"Cooper Yvette",mar: 23.7,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Northampton North",mp:"Michael Ellis",mprev:"Ellis Michael",mar: 4.8,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Northampton South",mp:"Brian Binley",mprev:"Binley Brian",mar: 15.4,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"South Northamptonshire",mp:"Andrea Leadsom",mprev:"Leadsom Andrea",mar: 34.2,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Norwich North",mp:"Chloe Smith",mprev:"Smith Chloe",mar: 9.2,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Norwich South",mp:"Simon Wright",mprev:"Wright Simon",mar: 0.7,reg:"East",party:"Liberal Democrats",prev:"#DC241f",curr:"#FDBB30",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Nottingham East",mp:"Christopher Leslie",mprev:"Leslie Christopher",mar: 21,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Nottingham North",mp:"Graham Allen",mprev:"Allen Graham",mar: 23.7,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Nottingham South",mp:"Lilian Greenwood",mprev:"Greenwood Lilian",mar: 4.3,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Nuneaton",mp:"Marcus Jones",mprev:"Jones Marcus",mar: 4.6,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Ochil and South Perthshire",mp:"Gordon Banks",mprev:"Banks Gordon",mar: 10.3,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Ogmore",mp:"Huw Irranca-Davies",mprev:"Irranca-Davies Huw",mar: 38.2,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Old Bexley and Sidcup",mp:"James Brokenshire",mprev:"Brokenshire James",mar: 34.9,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Oldham East and Saddleworth",mp:"Phil Woolas",mprev:"Woolas Phil",mar: 0.2,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Oldham West and Royton",mp:"Michael Meacher",mprev:"Meacher Michael",mar: 21.8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Orkney and Shetland",mp:"Alistair Carmichael",mprev:"Carmichael Alistair",mar: 51.3,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Orpington",mp:"Joseph Johnson",mprev:"Johnson Joseph",mar: 35.2,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Oxford East",mp:"Andrew Smith",mprev:"Smith Andrew",mar: 8.9,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Oxford West and Abingdon",mp:"Nicola Blackwood",mprev:"Blackwood Nicola",mar: 0.3,reg:"South East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Paisley and Renfrewshire North",mp:"Jim Sheridan",mprev:"Sheridan Jim",mar: 35,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Paisley and Renfrewshire South",mp:"Douglas Alexander",mprev:"Alexander Douglas",mar: 41.5,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Pendle",mp:"Andrew Stephenson",mprev:"Stephenson Andrew",mar: 8,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Penistone and Stocksbridge",mp:"Angela Smith",mprev:"Smith Angela",mar: 6.6,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Penrith and The Border",mp:"Rory Stewart",mprev:"Stewart Rory",mar: 24.9,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Perth and North Perthshire",mp:"Pete Wishart",mprev:"Wishart Pete",mar: 9.1,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2010",con:"Peterborough",mp:"Stewart Jackson",mprev:"Jackson Stewart",mar: 10.8,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Plymouth, Moor View",mp:"Alison Seabeck",mprev:"Seabeck Alison",mar: 3.8,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Plymouth, Sutton and Devonport",mp:"Oliver Colville",mprev:"Colville Oliver",mar: 2.6,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Pontypridd",mp:"Owen Smith",mprev:"Smith Owen",mar: 7.6,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Poole",mp:"Robert Syms",mprev:"Syms Robert",mar: 15.9,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Poplar and Limehouse",mp:"Jim Fitzpatrick",mprev:"Fitzpatrick Jim",mar: 12.9,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Portsmouth North",mp:"Penny Mordaunt",mprev:"Mordaunt Penny",mar: 16.5,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Portsmouth South",mp:"Mike Hancock",mprev:"Hancock Mike",mar: 12.6,reg:"South East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Preseli Pembrokeshire",mp:"Stephen Crabb",mprev:"Crabb Stephen",mar: 11.6,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Preston",mp:"Mark Hendrick",mprev:"Hendrick Mark",mar: 23.8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Pudsey",mp:"Stuart Andrew",mprev:"Andrew Stuart",mar: 3.4,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Putney",mp:"Justine Greening",mprev:"Greening Justine",mar: 24.6,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Rayleigh and Wickford",mp:"Mark Francois",mprev:"Francois Mark",mar: 42.7,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Reading East",mp:"Rob Wilson",mprev:"Wilson Rob",mar: 15.2,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Reading West",mp:"Alok Sharma",mprev:"Sharma Alok",mar: 12.6,reg:"South East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Redcar",mp:"Ian Swales",mprev:"Swales Ian",mar: 12.4,reg:"North East",party:"Liberal Democrats",prev:"#DC241f",curr:"#FDBB30",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Redditch",mp:"Karen Lumley",mprev:"Lumley Karen",mar: 13.2,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Reigate",mp:"Crispin Blunt",mprev:"Blunt Crispin",mar: 27.2,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"East Renfrewshire",mp:"Jim Murphy",mprev:"Murphy Jim",mar: 20.4,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Rhondda",mp:"Chris Bryant",mprev:"Bryant Chris",mar: 37.2,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2010",con:"Ribble Valley",mp:"Nigel Evans",mprev:"Evans Nigel",mar: 28.2,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Richmond (Yorks)",mp:"William Hague",mprev:"Hague William",mar: 43.7,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Richmond Park",mp:"Zac Goldsmith",mprev:"Goldsmith Zac",mar: 6.9,reg:"London",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Rochdale",mp:"Simon Danczuk",mprev:"Danczuk Simon",mar: 1.9,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Rochester and Strood",mp:"Mark Reckless",mprev:"Reckless Mark",mar: 20.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Rochford and Southend East",mp:"James Duddridge",mprev:"Duddridge James",mar: 26.5,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Romford",mp:"Andrew Rosindell",mprev:"Rosindell Andrew",mar: 36.5,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Romsey and Southampton North",mp:"Caroline Nokes",mprev:"Nokes Caroline",mar: 8.5,reg:"South East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Ross, Skye and Lochaber",mp:"Charles Kennedy",mprev:"Kennedy Charles",mar: 37.5,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2010",con:"Rossendale and Darwen",mp:"Jake Berry",mprev:"Berry Jake",mar: 9.5,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Rother Valley",mp:"Kevin Barron",mprev:"Barron Kevin",mar: 12.5,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Rotherham",mp:"Denis MacShane",mprev:"MacShane Denis",mar: 27.9,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Rugby",mp:"Mark Pawsey",mprev:"Pawsey Mark",mar: 12.6,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Ruislip, Northwood and Pinner",mp:"Nick Hurd",mprev:"Hurd Nick",mar: 38,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Runnymede and Weybridge",mp:"Philip Hammond",mprev:"Hammond Philip",mar: 34.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Rushcliffe",mp:"Kenneth Clarke",mprev:"Clarke Kenneth",mar: 29.5,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Rutherglen and Hamilton West",mp:"Tom Greatrex",mprev:"Greatrex Tom",mar: 44.7,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010",con:"Rutland and Melton",mp:"Alan Duncan",mprev:"Duncan Alan",mar: 25.4,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Saffron Walden",mp:"Alan Haselhurst",mprev:"Haselhurst Alan",mar: 28,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Salford and Eccles",mp:"Hazel Blears",mprev:"Blears Hazel",mar: 13.8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Salisbury",mp:"John Glen",mprev:"Glen John",mar: 12.3,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Scarborough and Whitby",mp:"Robert Goodwill",mprev:"Goodwill Robert",mar: 16.5,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Scunthorpe",mp:"Nic Dakin",mprev:"Dakin Nic",mar: 6.9,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Sedgefield",mp:"Phil Wilson",mprev:"Wilson Phil",mar: 21.6,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Sefton Central",mp:"Bill Esterson",mprev:"Esterson Bill",mar: 8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Selby and Ainsty",mp:"Nigel Adams",mprev:"Adams Nigel",mar: 23.7,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Sevenoaks",mp:"Michael Fallon",mprev:"Fallon Michael",mar: 35.4,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Sheffield, Brightside and Hillsborough",mp:"David Blunkett",mprev:"Blunkett David",mar: 35,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Sheffield Central",mp:"Paul Blomfield",mprev:"Blomfield Paul",mar: 0.4,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Sheffield, Hallam",mp:"Nick Clegg",mprev:"Clegg Nick",mar: 29.9,reg:"Yorkshire and The Humber",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Sheffield, Heeley",mp:"Meg Munn",mprev:"Munn Meg",mar: 14.2,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Sheffield South East",mp:"Clive Betts",mprev:"Betts Clive",mar: 25.4,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Sherwood",mp:"Mark Spencer",mprev:"Spencer Mark",mar: 0.4,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Shipley",mp:"Philip Davies",mprev:"Davies Philip",mar: 20.1,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Shrewsbury and Atcham",mp:"Daniel Kawczynski",mprev:"Kawczynski Daniel",mar: 15,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North Shropshire",mp:"Owen Paterson",mprev:"Paterson Owen",mar: 30.5,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Sittingbourne and Sheppey",mp:"Gordon Henderson",mprev:"Henderson Gordon",mar: 25.5,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Skipton and Ripon",mp:"Julian Smith",mprev:"Smith Julian",mar: 18.2,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Sleaford and North Hykeham",mp:"Stephen Phillips",mprev:"Phillips Stephen",mar: 33.4,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Slough",mp:"Fiona Mactaggart",mprev:"Mactaggart Fiona",mar: 11.6,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Solihull",mp:"Lorely Burt",mprev:"Burt Lorely",mar: 0.3,reg:"West Midlands",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2010",con:"North Somerset",mp:"Liam Fox",mprev:"Fox Liam",mar: 13.6,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North East Somerset",mp:"Jacob Rees-Mogg",mprev:"Rees-Mogg Jacob",mar: 9.6,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Somerton and Frome",mp:"David Heath",mprev:"Heath David",mar: 3,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"South Holland and The Deepings",mp:"John Hayes",mprev:"Hayes John",mar: 43.6,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South Ribble",mp:"Lorraine Fullbrook",mprev:"Fullbrook Lorraine",mar: 10.8,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"South Shields",mp:"David Miliband",mprev:"Miliband David",mar: 30.4,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Southampton, Itchen",mp:"John Denham",mprev:"Denham John",mar: 0.4,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Southampton, Test",mp:"Alan Whitehead",mprev:"Whitehead Alan",mar: 5.5,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Southend West",mp:"David Amess",mprev:"Amess David",mar: 16.7,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Southport",mp:"John Pugh",mprev:"Pugh John",mar: 13.8,reg:"North West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Spelthorne",mp:"Kwasi Kwarteng",mprev:"Kwarteng Kwasi",mar: 21.2,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"St Albans",mp:"Anne Main",mprev:"Main Anne",mar: 4.4,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"St Austell and Newquay",mp:"Stephen Gilbert",mprev:"Gilbert Stephen",mar: 2.8,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"St Helens North",mp:"Dave Watts",mprev:"Watts Dave",mar: 29.4,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"St Helens South and Whiston",mp:"Shaun Woodward",mprev:"Woodward Shaun",mar: 30.6,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"St Ives",mp:"Andrew George",mprev:"George Andrew",mar: 3.7,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Stafford",mp:"Jeremy Lefroy",mprev:"Lefroy Jeremy",mar: 10.9,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Staffordshire Moorlands",mp:"Karen Bradley",mprev:"Bradley Karen",mar: 15.3,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"South Staffordshire",mp:"Gavin Williamson",mprev:"Williamson Gavin",mar: 32.9,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Stalybridge and Hyde",mp:"Jonathan Reynolds",mprev:"Reynolds Jonathan",mar: 6.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Stevenage",mp:"Stephen McPartland",mprev:"McPartland Stephen",mar: 8,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Stirling",mp:"Anne McGuire",mprev:"McGuire Anne",mar: 17.7,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Stockport",mp:"Ann Coffey",mprev:"Coffey Ann",mar: 17.3,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Stockton North",mp:"Alex Cunningham",mprev:"Cunningham Alex",mar: 16.9,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Stockton South",mp:"James Wharton",mprev:"Wharton James",mar: 0.7,reg:"North East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Stoke-On-Trent Central",mp:"Tristram Hunt",mprev:"Hunt Tristram",mar: 17.1,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Stoke-On-Trent North",mp:"Joan Walley",mprev:"Walley Joan",mar: 20.5,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Stoke-On-Trent South",mp:"Rob Flello",mprev:"Flello Rob",mar: 10.4,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Stone",mp:"Bill Cash",mprev:"Cash Bill",mar: 28.1,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Stourbridge",mp:"Margot James",mprev:"James Margot",mar: 10.9,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Strangford",mp:"Jim Shannon",mprev:"Shannon Jim",mar: 18.1,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"UCUNF UUP and CON joint party"},
{year:"2010",con:"Stratford-On-Avon",mp:"Nadhim Zahawi",mprev:"Zahawi Nadhim",mar: 22.4,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Streatham",mp:"Chuka Umunna",mprev:"Umunna Chuka",mar: 7,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Stretford and Urmston",mp:"Kate Green",mprev:"Green Kate",mar: 19.9,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Stroud",mp:"Neil Carmichael",mprev:"Carmichael Neil",mar: 2.2,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Central Suffolk and North Ipswich",mp:"Daniel Poulter",mprev:"Poulter Daniel",mar: 25.8,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Suffolk Coastal",mp:"Therese Coffey",mprev:"Coffey Therese",mar: 16.6,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South Suffolk",mp:"Tim Yeo",mprev:"Yeo Tim",mar: 16.9,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"West Suffolk",mp:"Matthew Hancock",mprev:"Hancock Matthew",mar: 27.1,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Sunderland Central",mp:"Julie Elliott",mprev:"Elliott Julie",mar: 15.8,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"East Surrey",mp:"Sam Gyimah",mprev:"Gyimah Sam",mar: 30.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Surrey Heath",mp:"Michael Gove",mprev:"Gove Michael",mar: 31.8,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South West Surrey",mp:"Jeremy Hunt",mprev:"Hunt Jeremy",mar: 28.5,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Mid Sussex",mp:"Nicholas Soames",mprev:"Soames Nicholas",mar: 13.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Sutton and Cheam",mp:"Paul Burstow",mprev:"Burstow Paul",mar: 3.3,reg:"London",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Sutton Coldfield",mp:"Andrew Mitchell",mprev:"Mitchell Andrew",mar: 33.6,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Swansea East",mp:"Sian James",mprev:"James Sian",mar: 33.2,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Swansea West",mp:"Geraint Davies",mprev:"Davies Geraint",mar: 1.4,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"North Swindon",mp:"Justin Tomlinson",mprev:"Tomlinson Justin",mar: 14,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"South Swindon",mp:"Robert Buckland",mprev:"Buckland Robert",mar: 7.5,reg:"South West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Tamworth",mp:"Christopher Pincher",mprev:"Pincher Christopher",mar: 13.1,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Tatton",mp:"George Osborne",mprev:"Osborne George",mar: 32,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Taunton Deane",mp:"Jeremy Browne",mprev:"Browne Jeremy",mar: 6.9,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Telford",mp:"David Wright",mprev:"Wright David",mar: 2.4,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Tewkesbury",mp:"Laurence Robertson",mprev:"Robertson Laurence",mar: 11.7,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"North Thanet",mp:"Roger Gale",mprev:"Gale Roger",mar: 31.2,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"South Thanet",mp:"Laura Sandys",mprev:"Sandys Laura",mar: 16.6,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Thirsk and Malton",mp:"Anne  McIntosh",mprev:"McIntosh Anne ",mar: 29.6,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Thornbury and Yate",mp:"Steve Webb",mprev:"Webb Steve",mar: 14.8,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Thurrock",mp:"Jackie Doyle-Price",mprev:"Doyle-Price Jackie",mar: 0.2,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Tiverton and Honiton",mp:"Neil Parish",mprev:"Parish Neil",mar: 17,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Tonbridge and Malling",mp:"John Stanley",mprev:"Stanley John",mar: 35.4,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Tooting",mp:"Sadiq Khan",mprev:"Khan Sadiq",mar: 5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Torbay",mp:"Adrian Sanders",mprev:"Sanders Adrian",mar: 8.3,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Torfaen",mp:"Paul Murphy",mprev:"Murphy Paul",mar: 24.7,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Totnes",mp:"Sarah Wollaston",mprev:"Wollaston Sarah",mar: 10.3,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Tottenham",mp:"David Lammy",mprev:"Lammy David",mar: 41.6,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Truro and Falmouth",mp:"Sarah Newton",mprev:"Newton Sarah",mar: 0.9,reg:"South West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Tunbridge Wells",mp:"Greg Clark",mprev:"Clark Greg",mar: 31,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Twickenham",mp:"Vince Cable",mprev:"Cable Vince",mar: 20.3,reg:"London",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Tynemouth",mp:"Alan Campbell",mprev:"Campbell Alan",mar: 10.9,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"North Tyneside",mp:"Mary Glindon",mprev:"Glindon Mary",mar: 27.8,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"West Tyrone",mp:"Pat Doherty",mprev:"Doherty Pat",mar: 28.7,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#D46A4C",prevparty: "Sinn Fein",secparty:"Democratic Unionist Party"},
{year:"2010",con:"Mid Ulster",mp:"Martin McGuinness",mprev:"McGuinness Martin",mar: 37.6,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#D46A4C",prevparty: "Sinn Fein",secparty:"Democratic Unionist Party"},
{year:"2010",con:"Upper Bann",mp:"Thomas Simpson",mprev:"Simpson Thomas",mar: 8.1,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"UCUNF UUP and CON joint party"},
{year:"2010",con:"Uxbridge and South Ruislip",mp:"John Randall",mprev:"Randall John",mar: 24.9,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Vale Of Clwyd",mp:"Chris Ruane",mprev:"Ruane Chris",mar: 7.1,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Vale Of Glamorgan",mp:"Alun Cairns",mprev:"Cairns Alun",mar: 8.8,reg:"Wales",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Vauxhall",mp:"Kate Hoey",mprev:"Hoey Kate",mar: 24.7,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Wakefield",mp:"Mary Creagh",mprev:"Creagh Mary",mar: 3.6,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Wallasey",mp:"Angela Eagle",mprev:"Eagle Angela",mar: 20.4,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Walsall North",mp:"David Winnick",mprev:"Winnick David",mar: 2.7,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Walsall South",mp:"Valerie Vaz",mprev:"Vaz Valerie",mar: 4.3,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Walthamstow",mp:"Stella Creasy",mprev:"Creasy Stella",mar: 23.1,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Wansbeck",mp:"Ian Lavery",mprev:"Lavery Ian",mar: 18.4,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Wantage",mp:"Ed Vaizey",mprev:"Vaizey Ed",mar: 24,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Warley",mp:"John Spellar",mprev:"Spellar John",mar: 28.1,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Warrington North",mp:"Helen Jones",mprev:"Jones Helen",mar: 15.3,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Warrington South",mp:"David Mowat",mprev:"Mowat David",mar: 2.8,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Warwick and Leamington",mp:"Chris White",mprev:"White Chris",mar: 7.2,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"North Warwickshire",mp:"Dan Byles",mprev:"Byles Dan",mar: 0.1,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Washington and Sunderland West",mp:"Sharon Hodgson",mprev:"Hodgson Sharon",mar: 30.7,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Watford",mp:"Richard Harrington",mprev:"Harrington Richard",mar: 2.6,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Waveney",mp:"Peter Aldous",mprev:"Aldous Peter",mar: 1.5,reg:"East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Wealden",mp:"Charles Hendry",mprev:"Hendry Charles",mar: 31.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Weaver Vale",mp:"Graham Evans",mprev:"Evans Graham",mar: 2.3,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Wellingborough",mp:"Peter Bone",mprev:"Bone Peter",mar: 22.8,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Wells",mp:"Tessa Munt",mprev:"Munt Tessa",mar: 1.4,reg:"South West",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2010",con:"Welwyn Hatfield",mp:"Grant Shapps",mprev:"Shapps Grant",mar: 35.6,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Wentworth and Dearne",mp:"John Healey",mprev:"Healey John",mar: 33.1,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"West Bromwich East",mp:"Tom Watson",mprev:"Watson Tom",mar: 17.6,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"West Bromwich West",mp:"Adrian Bailey",mprev:"Bailey Adrian",mar: 15.6,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"West Ham",mp:"Lyn Brown",mprev:"Brown Lyn",mar: 48,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Westminster North",mp:"Karen Buck",mprev:"Buck Karen",mar: 5.4,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Westmorland and Lonsdale",mp:"Tim Farron",mprev:"Farron Tim",mar: 23.8,reg:"North West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Weston-Super-Mare",mp:"John Penrose",mprev:"Penrose John",mar: 5.1,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Wigan",mp:"Lisa Nandy",mprev:"Nandy Lisa",mar: 23.8,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"North Wiltshire",mp:"James Gray",mprev:"Gray James",mar: 15.4,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"South West Wiltshire",mp:"Andrew Murrison",mprev:"Murrison Andrew",mar: 21.1,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Wimbledon",mp:"Stephen Hammond",mprev:"Hammond Stephen",mar: 24.1,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Winchester",mp:"Steve Brine",mprev:"Brine Steve",mar: 5.4,reg:"South East",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"Windsor",mp:"Adam Afriyie",mprev:"Afriyie Adam",mar: 38.4,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Wirral South",mp:"Alison McGovern",mprev:"McGovern Alison",mar: 1.3,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Wirral West",mp:"Esther McVey",mprev:"McVey Esther",mar: 6.2,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Witham",mp:"Priti Patel",mprev:"Patel Priti",mar: 32.4,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Witney",mp:"David Cameron",mprev:"Cameron David",mar: 39.4,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Woking",mp:"Jonathan Lord",mprev:"Lord Jonathan",mar: 12.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Wokingham",mp:"John Redwood",mprev:"Redwood John",mar: 24.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Wolverhampton North East",mp:"Emma Reynolds",mprev:"Reynolds Emma",mar: 7.1,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Wolverhampton South East",mp:"Pat McFadden",mprev:"McFadden Pat",mar: 19,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Wolverhampton South West",mp:"Paul Uppal",mprev:"Uppal Paul",mar: 1.7,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Worcester",mp:"Robin Walker",mprev:"Walker Robin",mar: 6.1,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010",con:"Mid Worcestershire",mp:"Peter Luff",mprev:"Luff Peter",mar: 31.1,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"West Worcestershire",mp:"Harriett Baldwin",mprev:"Baldwin Harriett",mar: 12.5,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Workington",mp:"Tony Cunningham",mprev:"Cunningham Tony",mar: 11.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Worsley and Eccles South",mp:"Barbara Keeley",mprev:"Keeley Barbara",mar: 10.4,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"East Worthing and Shoreham",mp:"Tim Loughton",mprev:"Loughton Tim",mar: 22.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Worthing West",mp:"Peter Bottomley",mprev:"Bottomley Peter",mar: 23.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"The Wrekin",mp:"Mark Pritchard",mprev:"Pritchard Mark",mar: 20.6,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2010",con:"Wrexham",mp:"Ian Lucas",mprev:"Lucas Ian",mar: 11.1,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010",con:"Wycombe",mp:"Steven Baker",mprev:"Baker Steven",mar: 19.9,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Wyre and Preston North",mp:"Ben Wallace",mprev:"Wallace Ben",mar: 30.9,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2010",con:"Wyre Forest",mp:"Mark Garnier",mprev:"Garnier Mark",mar: 5.2,reg:"West Midlands",party:"Conservative",prev:"#DDDDDD",curr:"#0087DC",sec:"#FF69B4",prevparty: "KHHC",secparty:"Independent Community and Health Concern"},
{year:"2010",con:"Wythenshawe and Sale East",mp:"Paul Goggins",mprev:"Goggins Paul",mar: 18.6,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"Yeovil",mp:"David Laws",mprev:"Laws David",mar: 22.8,reg:"South West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2010",con:"Ynys Mon",mp:"Albert Owen",mprev:"Owen Albert",mar: 7.1,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2010",con:"York Central",mp:"Hugh Bayley",mprev:"Bayley Hugh",mar: 13.9,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010",con:"York Outer",mp:"Julian Sturdy",mprev:"Sturdy Julian",mar: 6.9,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2010",con:"East Yorkshire",mp:"Greg Knight",mprev:"Knight Greg",mar: 26.3,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015+",con:"Oldham West and Royton",mp:"Jim McMahon",mprev:"McMahon Jim",mar: 38.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015+",con:"Sheffield, Brightside and Hillsborough",mp:"Gill Furniss",mprev:"Furniss Gill",mar: 42.47,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015+",con:"Ogmore",mp:"Chris Elmore",mprev:"Elmore Chris",mar: 36.44,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2015+",con:"Tooting",mp:"Rosena Allin-Khan",mprev:"Allin-Khan Rosena",mar: 19.87,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2015+",con:"Batley and Spen",mp:"Tracy Brabin",mprev:"Brabin Tracy",mar: 81.09,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#915F6D",prevparty: "Labour",secparty:"English Democrats"},
{year:"2015+",con:"Witney",mp:"Robert Courts",mprev:"Courts Robert",mar: 14.83,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2015+",con:"Richmond Park",mp:"Sarah Olney",mprev:"Olney Sarah",mar: 4.53,reg:"London",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#DDDDDD",prevparty: "Conservative",secparty:"Independent"},
{year:"2015+",con:"Sleaford and North Hykeham",mp:"Caroline Johnson",mprev:"Johnson Caroline",mar: 40.03,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#70147A",prevparty: "Conservative",secparty:"UK Independence Party"},
{year:"2010+",con:"Rochester and Strood",mp:"Mark Reckless",mprev:"Reckless Mark",mar: 7.29,reg:"South East",party:"UK Independence Party",prev:"#0087DC",curr:"#70147A",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2010+",con:"Clacton",mp:"Douglas Carswell",mprev:"Carswell Douglas",mar: 35.1,reg:"East",party:"UK Independence Party",prev:"#0087DC",curr:"#70147A",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2010+",con:"Heywood and Middleton",mp:"Liz McInnes",mprev:"McInnes Liz",mar: 2.17,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2010+",con:"Newark",mp:"Robert Jenrick",mprev:"Jenrick Robert",mar: 19.13,reg:"East Midlands",party:"Conservative",prev:"#DDDDDD",curr:"#0087DC",sec:"#70147A",prevparty: "Independent",secparty:"UK Independence Party"},
{year:"2010+",con:"Wythenshawe and Sale East",mp:"Mike Kane",mprev:"Kane Mike",mar: 37.39,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2010+",con:"South Shields",mp:"Emma Lewell-Buck",mprev:"Lewell-Buck Emma",mar: 26.3,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2010+",con:"Mid Ulster",mp:"Francie Molloy",mprev:"Molloy Francie",mar: 12.58,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#DDDDDD",prevparty: "Sinn Fein",secparty:"Independent"},
{year:"2010+",con:"Eastleigh",mp:"Mike Thornton",mprev:"Thornton Mike",mar: 4.26,reg:"South East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#70147A",prevparty: "Liberal Democrats",secparty:"UK Independence Party"},
{year:"2010+",con:"Croydon North",mp:"Steve Reed",mprev:"Reed Steve",mar: 47.87,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010+",con:"Middlesbrough",mp:"Andy McDonald",mprev:"McDonald Andy",mar: 48.68,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2010+",con:"Rotherham",mp:"Sarah Champion",mprev:"Champion Sarah",mar: 24.82,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2010+",con:"Corby",mp:"Andy Sawford",mprev:"Sawford Andy",mar: 21.84,reg:"East Midlands",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2010+",con:"Cardiff South and Penarth",mp:"Stephen Doughty",mprev:"Doughty Stephen",mar: 27.44,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010+",con:"Manchester Central",mp:"Lucy Powell",mprev:"Powell Lucy",mar: 59.68,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010+",con:"Bradford West",mp:"George Galloway",mprev:"Galloway George",mar: 30.9,reg:"Yorkshire and The Humber",party:"Respect",prev:"#DC241f",curr:"#46801c",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2010+",con:"Feltham and Heston",mp:"Seema Malhotra",mprev:"Malhotra Seema",mar: 26.71,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2010+",con:"Inverclyde",mp:"Iain McKenzie",mprev:"McKenzie Iain",mar: 20.78,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2010+",con:"Belfast West",mp:"Paul Maskey",mprev:"Maskey Paul",mar: 57.18,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#99FF66",prevparty: "Sinn Fein",secparty:"Social Democratic and Labour Party"},
{year:"2010+",con:"Leicester South",mp:"Jonathon Ashworth",mprev:"Ashworth Jonathon",mar: 35.34,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2010+",con:"Barnsley Central",mp:"Dan Jarvis",mprev:"Jarvis Dan",mar: 48.6,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2010+",con:"Oldham East and Saddleworth",mp:"Debbie Abrahams",mprev:"Abrahams Debbie",mar: 10.19,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2015+",con:"Copeland",mp:"Trudy Harrison",mprev:"Harrison Trudy",mar: 6.9,reg:"North West",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2015+",con:"Stoke-On-Trent Central",mp:"Gareth Snell",mprev:"Snell Gareth",mar: 12.36,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#70147A",prevparty: "Labour",secparty:"UK Independence Party"},
{year:"2017",con:"Aldershot",mp:"Leo Docherty",mprev:"Docherty Leo",mar: 23.44,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Aldridge-Brownhills",mp:"Wendy Morton",mprev:"Morton Wendy",mar: 35.56,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Altrincham and Sale West",mp:"Graham Brady",mprev:"Brady Graham",mar: 12.17,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Amber Valley",mp:"Nigel Mills",mprev:"Mills Nigel",mar: 18.12,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Arundel and South Downs",mp:"Nick Herbert",mprev:"Herbert Nick",mar: 39.64,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Ashfield",mp:"Gloria De Piero",mprev:"De Piero Gloria",mar: 0.88,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ashford",mp:"Damian Green",mprev:"Green Damian",mar: 29.19,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Ashton-Under-Lyne",mp:"Angela Rayner",mprev:"Rayner Angela",mar: 28.4,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Aylesbury",mp:"David Lidington",mprev:"Lidington David",mar: 24.93,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Banbury",mp:"Victoria Prentis",mprev:"Prentis Victoria",mar: 20.14,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Barking",mp:"Margaret Hodge",mprev:"Hodge Margaret",mar: 45.32,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Barnsley Central",mp:"Dan Jarvis",mprev:"Jarvis Dan",mar: 39.77,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Barnsley East",mp:"Stephanie Peacock",mprev:"Peacock Stephanie",mar: 32.58,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Barrow and Furness",mp:"John Woodcock",mprev:"Woodcock John",mar: 0.44,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Basildon and Billericay",mp:"John Baron",mprev:"Baron John",mar: 29.83,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Basingstoke",mp:"Maria Miller",mprev:"Miller Maria",mar: 16.92,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bassetlaw",mp:"John Mann",mprev:"Mann John",mar: 9.29,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bath",mp:"Wera Hobhouse",mprev:"Hobhouse Wera",mar: 11.48,reg:"South West",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Batley and Spen",mp:"Tracy Brabin",mprev:"Brabin Tracy",mar: 16.66,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Battersea",mp:"Marsha De Cordova",mprev:"De Cordova Marsha",mar: 4.39,reg:"London",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Beaconsfield",mp:"Dominic Grieve",mprev:"Grieve Dominic",mar: 43.8,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Beckenham",mp:"Bob Stewart",mprev:"Stewart Bob",mar: 29.22,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bedford",mp:"Mohammad Yasin",mprev:"Yasin Mohammad",mar: 1.63,reg:"East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Bermondsey and Old Southwark",mp:"Neil Coyle",mprev:"Coyle Neil",mar: 22.17,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2017",con:"Berwick-Upon-Tweed",mp:"Anne-Marie Trevelyan",mprev:"Trevelyan Anne-Marie",mar: 27.91,reg:"North East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bethnal Green and Bow",mp:"Rushanara Ali",mprev:"Ali Rushanara",mar: 59.16,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Beverley and Holderness",mp:"Graham Stuart",mprev:"Stuart Graham",mar: 25.24,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bexhill and Battle",mp:"Huw Merriman",mprev:"Merriman Huw",mar: 37.27,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bexleyheath and Crayford",mp:"David Evennett",mprev:"Evennett David",mar: 20.08,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Birkenhead",mp:"Frank Field",mprev:"Field Frank",mar: 58.43,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Edgbaston",mp:"Preet Gill",mprev:"Gill Preet",mar: 15.86,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Erdington",mp:"Jack Dromey",mprev:"Dromey Jack",mar: 19.57,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Hall Green",mp:"Roger Godsiff",mprev:"Godsiff Roger",mar: 62.5,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Hodge Hill",mp:"Liam Byrne",mprev:"Byrne Liam",mar: 66.88,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Ladywood",mp:"Shabana Mahmood",mprev:"Mahmood Shabana",mar: 69.51,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Northfield",mp:"Richard Burden",mprev:"Burden Richard",mar: 10.52,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Perry Barr",mp:"Khalid Mahmood",mprev:"Mahmood Khalid",mar: 41.59,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Selly Oak",mp:"Steve McCabe",mprev:"McCabe Steve",mar: 31.04,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Birmingham, Yardley",mp:"Jess Phillips",mprev:"Phillips Jess",mar: 37.24,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bishop Auckland",mp:"Helen Goodman",mprev:"Goodman Helen",mar: 1.16,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Blackburn",mp:"Kate Hollern",mprev:"Hollern Kate",mar: 42.87,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Blackley and Broughton",mp:"Graham Stringer",mprev:"Stringer Graham",mar: 48.86,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Blackpool North and Cleveleys",mp:"Paul Maynard",mprev:"Maynard Paul",mar: 4.93,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Blackpool South",mp:"Gordon Marsden",mprev:"Marsden Gordon",mar: 7.22,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Blaydon",mp:"Liz Twist",mprev:"Twist Liz",mar: 28.03,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Blyth Valley",mp:"Ronnie Campbell",mprev:"Campbell Ronnie",mar: 18.63,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bognor Regis and Littlehampton",mp:"Nick Gibb",mprev:"Gibb Nick",mar: 34.07,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bolsover",mp:"Dennis Skinner",mprev:"Skinner Dennis",mar: 11.37,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bolton North East",mp:"David Crausby",mprev:"Crausby David",mar: 8.4,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bolton South East",mp:"Yasmin Qureshi",mprev:"Qureshi Yasmin",mar: 31.01,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bolton West",mp:"Chris Green",mprev:"Green Chris",mar: 1.83,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bootle",mp:"Peter Dowd",mprev:"Dowd Peter",mar: 71.99,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Boston and Skegness",mp:"Matt Warman",mprev:"Warman Matt",mar: 38.65,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bosworth",mp:"David Tredinnick",mprev:"Tredinnick David",mar: 32.67,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bournemouth East",mp:"Tobias Ellwood",mprev:"Ellwood Tobias",mar: 16.33,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bournemouth West",mp:"Conor Burns",mprev:"Burns Conor",mar: 17.33,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bracknell",mp:"Phillip Lee",mprev:"Lee Phillip",mar: 28.66,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bradford East",mp:"Imran Hussain",mprev:"Hussain Imran",mar: 45.02,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bradford South",mp:"Judith Cummins",mprev:"Cummins Judith",mar: 16.32,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bradford West",mp:"Naz Shah",mprev:"Shah Naz",mar: 48.11,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Braintree",mp:"James Cleverly",mprev:"Cleverly James",mar: 35.21,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Brent Central",mp:"Dawn Butler",mprev:"Butler Dawn",mar: 53.54,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Brent North",mp:"Barry Gardiner",mprev:"Gardiner Barry",mar: 30.23,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Brentford and Isleworth",mp:"Ruth Cadbury",mprev:"Cadbury Ruth",mar: 19.77,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Brentwood and Ongar",mp:"Alex Burghart",mprev:"Burghart Alex",mar: 45.36,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bridgwater and West Somerset",mp:"Ian Liddell-Grainger",mprev:"Liddell-Grainger Ian",mar: 26.51,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Brigg and Goole",mp:"Andrew Percy",mprev:"Percy Andrew",mar: 27.44,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Brighton, Kemptown",mp:"Lloyd Russell-Moyle",mprev:"Russell-Moyle Lloyd",mar: 20.05,reg:"South East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Brighton, Pavilion",mp:"Caroline Lucas",mprev:"Lucas Caroline",mar: 25.48,reg:"South East",party:"Green",prev:"#6AB023",curr:"#6AB023",sec:"#DC241f",prevparty: "Green",secparty:"Labour"},
{year:"2017",con:"Bristol East",mp:"Kerry McCarthy",mprev:"McCarthy Kerry",mar: 26.37,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bristol North West",mp:"Darren Jones",mprev:"Jones Darren",mar: 8.8,reg:"South West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Bristol South",mp:"Karin Smyth",mprev:"Smyth Karin",mar: 29.4,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bristol West",mp:"Thangam Debbonaire",mprev:"Debbonaire Thangam",mar: 52.14,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Broadland",mp:"Keith Simpson",mprev:"Simpson Keith",mar: 28.26,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bromley and Chislehurst",mp:"Bob Neill",mprev:"Neill Bob",mar: 20.55,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bromsgrove",mp:"Sajid Javid",mprev:"Javid Sajid",mar: 30.67,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Broxbourne",mp:"Charles Walker",mprev:"Walker Charles",mar: 33.26,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Broxtowe",mp:"Anna Soubry",mprev:"Soubry Anna",mar: 1.55,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Buckingham",mp:"John Bercow",mprev:"Bercow John",mar: 48.83,reg:"South East",party:"Speaker",prev:"#000000",curr:"#000000",sec:"#6AB023",prevparty: "Speaker",secparty:"Green"},
{year:"2017",con:"Burnley",mp:"Julie Cooper",mprev:"Cooper Julie",mar: 15.77,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Burton",mp:"Andrew Griffiths",mprev:"Griffiths Andrew",mar: 20.13,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Bury North",mp:"James Frith",mprev:"Frith James",mar: 9.13,reg:"North West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Bury South",mp:"Ivan Lewis",mprev:"Lewis Ivan",mar: 11.7,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Bury St Edmunds",mp:"Jo Churchill",mprev:"Churchill Jo",mar: 29.67,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Calder Valley",mp:"Craig Whittaker",mprev:"Whittaker Craig",mar: 1.05,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Camberwell and Peckham",mp:"Harriet Harman",mprev:"Harman Harriet",mar: 65,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Camborne and Redruth",mp:"George Eustice",mprev:"Eustice George",mar: 3.25,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Cambridge",mp:"Daniel Zeichner",mprev:"Zeichner Daniel",mar: 22.64,reg:"East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2017",con:"Cannock Chase",mp:"Amanda Milling",mprev:"Milling Amanda",mar: 17.53,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Canterbury",mp:"Rosie Duffield",mprev:"Duffield Rosie",mar: 0.33,reg:"South East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Carlisle",mp:"John Stevenson",mprev:"Stevenson John",mar: 6.04,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Carshalton and Wallington",mp:"Tom Brake",mprev:"Brake Tom",mar: 2.7,reg:"London",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2017",con:"Castle Point",mp:"Rebecca Harris",mprev:"Harris Rebecca",mar: 42.21,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Central Devon",mp:"Mel Stride",mprev:"Stride Mel",mar: 27.11,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Central Suffolk and North Ipswich",mp:"Dan Poulter",mprev:"Poulter Dan",mar: 30.4,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Charnwood",mp:"Edward Argar",mprev:"Argar Edward",mar: 29.62,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Chatham and Aylesford",mp:"Tracey Crouch",mprev:"Crouch Tracey",mar: 23.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Cheadle",mp:"Mary Robinson",mprev:"Robinson Mary",mar: 8.26,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Chelmsford",mp:"Vicky Ford",mprev:"Ford Vicky",mar: 23.87,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Chelsea and Fulham",mp:"Greg Hands",mprev:"Hands Greg",mar: 19.44,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Cheltenham",mp:"Alex Chalk",mprev:"Chalk Alex",mar: 4.51,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Chesham and Amersham",mp:"Cheryl Gillan",mprev:"Gillan Cheryl",mar: 40.07,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Chesterfield",mp:"Toby Perkins",mprev:"Perkins Toby",mar: 20.04,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Chichester",mp:"Gillian Keegan",mprev:"Keegan Gillian",mar: 37.75,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Chingford and Woodford Green",mp:"Iain Duncan Smith",mprev:"Duncan Smith Iain",mar: 5.19,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Chippenham",mp:"Michelle Donelan",mprev:"Donelan Michelle",mar: 29.1,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Chipping Barnet",mp:"Theresa Villiers",mprev:"Villiers Theresa",mar: 0.64,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Chorley",mp:"Lindsay Hoyle",mprev:"Hoyle Lindsay",mar: 13.5,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Christchurch",mp:"Christopher Chope",mprev:"Chope Christopher",mar: 49.71,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Cities Of London and Westminster",mp:"Mark Field",mprev:"Field Mark",mar: 8.14,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"City Of Chester",mp:"Chris Matheson",mprev:"Matheson Chris",mar: 16.26,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"City Of Durham",mp:"Roberta Blackman-Woods",mprev:"Blackman-Woods Roberta",mar: 25.59,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Clacton",mp:"Giles Watling",mprev:"Watling Giles",mar: 35.85,reg:"East",party:"Conservative",prev:"#70147A",curr:"#0087DC",sec:"#DC241f",prevparty: "UK Independence Party",secparty:"Labour"},
{year:"2017",con:"Cleethorpes",mp:"Martin Vickers",mprev:"Vickers Martin",mar: 21.74,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Colchester",mp:"Will Quince",mprev:"Quince Will",mar: 10.6,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Colne Valley",mp:"Thelma Walker",mprev:"Walker Thelma",mar: 1.51,reg:"Yorkshire and The Humber",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Congleton",mp:"Fiona Bruce",mprev:"Bruce Fiona",mar: 22.44,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Copeland",mp:"Trudy Harrison",mprev:"Harrison Trudy",mar: 3.95,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Corby",mp:"Tom Pursglove",mprev:"Pursglove Tom",mar: 4.48,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Coventry North East",mp:"Colleen Fletcher",mprev:"Fletcher Colleen",mar: 33.5,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Coventry North West",mp:"Geoffrey Robinson",mprev:"Robinson Geoffrey",mar: 17.21,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Coventry South",mp:"James Cunningham",mprev:"Cunningham James",mar: 16.91,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Crawley",mp:"Henry Smith",mprev:"Smith Henry",mar: 4.89,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Crewe and Nantwich",mp:"Laura Smith",mprev:"Smith Laura",mar: 0.09,reg:"North West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Croydon Central",mp:"Sarah Jones",mprev:"Jones Sarah",mar: 9.9,reg:"London",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Croydon North",mp:"Steve Reed",mprev:"Reed Steve",mar: 54.28,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Croydon South",mp:"Chris Philp",mprev:"Philp Chris",mar: 18.62,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Dagenham and Rainham",mp:"Jon Cruddas",mprev:"Cruddas Jon",mar: 10.15,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Darlington",mp:"Jenny Chapman",mprev:"Chapman Jenny",mar: 7.32,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Dartford",mp:"Gareth Johnson",mprev:"Johnson Gareth",mar: 24.32,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Daventry",mp:"Chris Heaton-Harris",mprev:"Heaton-Harris Chris",mar: 39.05,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Denton and Reddish",mp:"Andrew Gwynne",mprev:"Gwynne Andrew",mar: 35.55,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Derby North",mp:"Chris Williamson",mprev:"Williamson Chris",mar: 4.14,reg:"East Midlands",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Derby South",mp:"Margaret Beckett",mprev:"Beckett Margaret",mar: 24.83,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Derbyshire Dales",mp:"Patrick McLoughlin",mprev:"McLoughlin Patrick",mar: 28.9,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Devizes",mp:"Claire Perry",mprev:"Perry Claire",mar: 41.78,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Dewsbury",mp:"Paula Sherriff",mprev:"Sherriff Paula",mar: 5.87,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Don Valley",mp:"Caroline Flint",mprev:"Flint Caroline",mar: 11.24,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Doncaster Central",mp:"Rosie Winterton",mprev:"Winterton Rosie",mar: 23.55,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Doncaster North",mp:"Ed Miliband",mprev:"Miliband Ed",mar: 33.14,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Dover",mp:"Charlie Elphicke",mprev:"Elphicke Charlie",mar: 12.39,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Dudley North",mp:"Ian Austin",mprev:"Austin Ian",mar: 0.06,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Dudley South",mp:"Mike Wood",mprev:"Wood Mike",mar: 20.21,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Dulwich and West Norwood",mp:"Helen Hayes",mprev:"Hayes Helen",mar: 50.15,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ealing Central and Acton",mp:"Rupa Huq",mprev:"Huq Rupa",mar: 24.95,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ealing North",mp:"Steve Pound",mprev:"Pound Steve",mar: 37.5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ealing, Southall",mp:"Virendra Sharma",mprev:"Sharma Virendra",mar: 48.93,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Easington",mp:"Grahame Morris",mprev:"Morris Grahame",mar: 40.95,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"East Devon",mp:"Hugo Swire",mprev:"Swire Hugo",mar: 13.31,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DDDDDD",prevparty: "Conservative",secparty:"Independent"},
{year:"2017",con:"East Ham",mp:"Stephen Timms",mprev:"Timms Stephen",mar: 70.42,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"East Hampshire",mp:"Damian Hinds",mprev:"Hinds Damian",mar: 46.66,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"East Surrey",mp:"Sam Gyimah",mprev:"Gyimah Sam",mar: 40.39,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"East Worthing and Shoreham",mp:"Tim Loughton",mprev:"Loughton Tim",mar: 9.61,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"East Yorkshire",mp:"Greg Knight",mprev:"Knight Greg",mar: 27.81,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Eastbourne",mp:"Stephen Lloyd",mprev:"Lloyd Stephen",mar: 2.8,reg:"South East",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Eastleigh",mp:"Mims Davies",mprev:"Davies Mims",mar: 24.75,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Eddisbury",mp:"Antoinette Sandbach",mprev:"Sandbach Antoinette",mar: 23.27,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Edmonton",mp:"Kate Osamor",mprev:"Osamor Kate",mar: 48.34,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ellesmere Port and Neston",mp:"Justin Madders",mprev:"Madders Justin",mar: 22.36,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Elmet and Rothwell",mp:"Alec Shelbrooke",mprev:"Shelbrooke Alec",mar: 16.47,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Eltham",mp:"Clive Efford",mprev:"Efford Clive",mar: 13.64,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Enfield North",mp:"Joan Ryan",mprev:"Ryan Joan",mar: 21.1,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Enfield, Southgate",mp:"Bambos Charalambous",mprev:"Charalambous Bambos",mar: 9.01,reg:"London",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Epping Forest",mp:"Eleanor Laing",mprev:"Laing Eleanor",mar: 35.93,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Epsom and Ewell",mp:"Chris Grayling",mprev:"Grayling Chris",mar: 34.55,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Erewash",mp:"Maggie Throup",mprev:"Throup Maggie",mar: 9.11,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Erith and Thamesmead",mp:"Teresa Pearce",mprev:"Pearce Teresa",mar: 22.52,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Esher and Walton",mp:"Dominic Raab",mprev:"Raab Dominic",mar: 38.93,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Exeter",mp:"Ben Bradshaw",mprev:"Bradshaw Ben",mar: 29.08,reg:"South West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Fareham",mp:"Suella Fernandes",mprev:"Fernandes Suella",mar: 37.81,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Faversham and Mid Kent",mp:"Helen Whately",mprev:"Whately Helen",mar: 35,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Feltham and Heston",mp:"Seema Malhotra",mprev:"Malhotra Seema",mar: 29.42,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Filton and Bradley Stoke",mp:"Jack Lopresti",mprev:"Lopresti Jack",mar: 8.26,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Finchley and Golders Green",mp:"Mike Freer",mprev:"Freer Mike",mar: 3.16,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Folkestone and Hythe",mp:"Damian Collins",mprev:"Collins Damian",mar: 26.18,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Forest Of Dean",mp:"Mark Harper",mprev:"Harper Mark",mar: 18.36,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Fylde",mp:"Mark Menzies",mprev:"Menzies Mark",mar: 25.41,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Gainsborough",mp:"Edward Leigh",mprev:"Leigh Edward",mar: 33.1,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Garston and Halewood",mp:"Maria Eagle",mprev:"Eagle Maria",mar: 60.07,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Gateshead",mp:"Ian Mearns",mprev:"Mearns Ian",mar: 41.21,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Gedling",mp:"Vernon Coaker",mprev:"Coaker Vernon",mar: 9.08,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Gillingham and Rainham",mp:"Rehman Chishti",mprev:"Chishti Rehman",mar: 19.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Gloucester",mp:"Richard Graham",mprev:"Graham Richard",mar: 10.21,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Gosport",mp:"Caroline Dinenage",mprev:"Dinenage Caroline",mar: 34.78,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Grantham and Stamford",mp:"Nick Boles",mprev:"Boles Nick",mar: 35.51,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Gravesham",mp:"Adam Holloway",mprev:"Holloway Adam",mar: 19.08,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Great Grimsby",mp:"Melanie Onn",mprev:"Onn Melanie",mar: 7.22,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Great Yarmouth",mp:"Brandon Lewis",mprev:"Lewis Brandon",mar: 18.06,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Greenwich and Woolwich",mp:"Matthew Pennycook",mprev:"Pennycook Matthew",mar: 39.01,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Guildford",mp:"Anne Milton",mprev:"Milton Anne",mar: 30.7,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Hackney North and Stoke Newington",mp:"Diane Abbott",mprev:"Abbott Diane",mar: 62.42,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Hackney South and Shoreditch",mp:"Meg Hillier",mprev:"Hillier Meg",mar: 68.52,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Halesowen and Rowley Regis",mp:"James Morris",mprev:"Morris James",mar: 11.84,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Halifax",mp:"Holly Lynch",mprev:"Lynch Holly",mar: 11.14,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Haltemprice and Howden",mp:"David Davis",mprev:"Davis David",mar: 29.95,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Halton",mp:"Derek Twigg",mprev:"Twigg Derek",mar: 51.3,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Hammersmith",mp:"Andy Slaughter",mprev:"Slaughter Andy",mar: 35.69,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Hampstead and Kilburn",mp:"Tulip Siddiq",mprev:"Siddiq Tulip",mar: 26.64,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Harborough",mp:"Neil O'Brien",mprev:"O'Brien Neil",mar: 21.58,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Harlow",mp:"Robert Halfon",mprev:"Halfon Robert",mar: 15.68,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Harrogate and Knaresborough",mp:"Andrew Jones",mprev:"Jones Andrew",mar: 32.02,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Harrow East",mp:"Bob Blackman",mprev:"Blackman Bob",mar: 3.46,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Harrow West",mp:"Gareth Thomas",mprev:"Thomas Gareth",mar: 26.44,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Hartlepool",mp:"Mike Hill",mprev:"Hill Mike",mar: 18.29,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Harwich and North Essex",mp:"Bernard Jenkin",mprev:"Jenkin Bernard",mar: 28.07,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hastings and Rye",mp:"Amber Rudd",mprev:"Rudd Amber",mar: 0.63,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Havant",mp:"Alan Mak",mprev:"Mak Alan",mar: 34.45,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hayes and Harlington",mp:"John McDonnell",mprev:"McDonnell John",mar: 37.9,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Hazel Grove",mp:"William Wragg",mprev:"Wragg William",mar: 12.49,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Hemel Hempstead",mp:"Mike Penning",mprev:"Penning Mike",mar: 18.07,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hemsworth",mp:"Jon Trickett",mprev:"Trickett Jon",mar: 22.14,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Hendon",mp:"Matthew Offord",mprev:"Offord Matthew",mar: 2.05,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Henley",mp:"John Howell",mprev:"Howell John",mar: 39.04,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hereford and South Herefordshire",mp:"Jesse Norman",mprev:"Norman Jesse",mar: 29.74,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hertford and Stortford",mp:"Mark Prisk",mprev:"Prisk Mark",mar: 31.73,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hertsmere",mp:"Oliver Dowden",mprev:"Dowden Oliver",mar: 32.44,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hexham",mp:"Guy Opperman",mprev:"Opperman Guy",mar: 19.98,reg:"North East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Heywood and Middleton",mp:"Liz McInnes",mprev:"McInnes Liz",mar: 15.28,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"High Peak",mp:"Ruth George",mprev:"George Ruth",mar: 4.31,reg:"East Midlands",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Hitchin and Harpenden",mp:"Bim Afolami",mprev:"Afolami Bim",mar: 20.47,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Holborn and St Pancras",mp:"Keir Starmer",mprev:"Starmer Keir",mar: 51.71,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Hornchurch and Upminster",mp:"Julia Dockerill",mprev:"Dockerill Julia",mar: 31.62,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hornsey and Wood Green",mp:"Catherine West",mprev:"West Catherine",mar: 49.34,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2017",con:"Horsham",mp:"Jeremy Quin",mprev:"Quin Jeremy",mar: 37.89,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Houghton and Sunderland South",mp:"Bridget Phillipson",mprev:"Phillipson Bridget",mar: 29.75,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Hove",mp:"Peter Kyle",mprev:"Kyle Peter",mar: 32.57,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Huddersfield",mp:"Barry Sheerman",mprev:"Sheerman Barry",mar: 27.39,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Huntingdon",mp:"Jonathan Djanogly",mprev:"Djanogly Jonathan",mar: 24.24,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Hyndburn",mp:"Graham Jones",mprev:"Jones Graham",mar: 12.86,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ilford North",mp:"Wes Streeting",mprev:"Streeting Wes",mar: 18.21,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ilford South",mp:"Mike Gapes",mprev:"Gapes Mike",mar: 54.89,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ipswich",mp:"Sandy Martin",mprev:"Martin Sandy",mar: 1.63,reg:"East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Isle Of Wight",mp:"Bob Seely",mprev:"Seely Bob",mar: 28.29,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Islington North",mp:"Jeremy Corbyn",mprev:"Corbyn Jeremy",mar: 60.47,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Islington South and Finsbury",mp:"Emily Thornberry",mprev:"Thornberry Emily",mar: 42.17,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Jarrow",mp:"Stephen Hepburn",mprev:"Hepburn Stephen",mar: 40.13,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Keighley",mp:"John Grogan",mprev:"Grogan John",mar: 0.46,reg:"Yorkshire and The Humber",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Kenilworth and Southam",mp:"Jeremy Wright",mprev:"Wright Jeremy",mar: 35.22,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Kensington",mp:"Emma Dent Coad",mprev:"Dent Coad Emma",mar: 0.05,reg:"London",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Kettering",mp:"Philip Hollobone",mprev:"Hollobone Philip",mar: 21.38,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Kingston and Surbiton",mp:"Ed Davey",mprev:"Davey Ed",mar: 6.63,reg:"London",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Kingston upon Hull East",mp:"Karl Turner",mprev:"Turner Karl",mar: 28.37,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Kingston upon Hull North",mp:"Diana Johnson",mprev:"Johnson Diana",mar: 38.54,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Kingston upon Hull West and Hessle",mp:"Emma Hardy",mprev:"Hardy Emma",mar: 23.22,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Kingswood",mp:"Chris Skidmore",mprev:"Skidmore Chris",mar: 15.39,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Knowsley",mp:"George Howarth",mprev:"Howarth George",mar: 76.08,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Lancaster and Fleetwood",mp:"Cat Smith",mprev:"Smith Cat",mar: 14.48,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leeds Central",mp:"Hilary Benn",mprev:"Benn Hilary",mar: 49.71,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leeds East",mp:"Richard Burgon",mprev:"Burgon Richard",mar: 30.77,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leeds North East",mp:"Fabian Hamilton",mprev:"Hamilton Fabian",mar: 32.06,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leeds North West",mp:"Alex Sobel",mprev:"Sobel Alex",mar: 9.13,reg:"Yorkshire and The Humber",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2017",con:"Leeds West",mp:"Rachel Reeves",mprev:"Reeves Rachel",mar: 37.81,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leicester East",mp:"Keith Vaz",mprev:"Vaz Keith",mar: 42.78,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leicester South",mp:"Jon Ashworth",mprev:"Ashworth Jon",mar: 51.98,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leicester West",mp:"Liz Kendall",mprev:"Kendall Liz",mar: 29.48,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leigh",mp:"Joanne Platt",mprev:"Platt Joanne",mar: 20.38,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Lewes",mp:"Maria Caulfield",mprev:"Caulfield Maria",mar: 10.16,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Lewisham East",mp:"Heidi Alexander",mprev:"Alexander Heidi",mar: 44.94,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Lewisham West and Penge",mp:"Ellie Reeves",mprev:"Reeves Ellie",mar: 43.54,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Lewisham, Deptford",mp:"Vicky Foxcroft",mprev:"Foxcroft Vicky",mar: 63.32,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Leyton and Wanstead",mp:"John Cryer",mprev:"Cryer John",mar: 48.96,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Lichfield",mp:"Michael Fabricant",mprev:"Fabricant Michael",mar: 34.72,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Lincoln",mp:"Karen Lee",mprev:"Lee Karen",mar: 3.16,reg:"East Midlands",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Liverpool, Riverside",mp:"Louise Ellman",mprev:"Ellman Louise",mar: 74.86,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Liverpool, Walton",mp:"Dan Carden",mprev:"Carden Dan",mar: 77.14,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Liverpool, Wavertree",mp:"Luciana Berger",mprev:"Berger Luciana",mar: 67.52,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Liverpool, West Derby",mp:"Stephen Twigg",mprev:"Twigg Stephen",mar: 72.86,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Loughborough",mp:"Nicky Morgan",mprev:"Morgan Nicky",mar: 7.88,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Louth and Horncastle",mp:"Victoria Atkins",mprev:"Atkins Victoria",mar: 37.22,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Ludlow",mp:"Philip Dunne",mprev:"Dunne Philip",mar: 38.6,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Luton North",mp:"Kelvin Hopkins",mprev:"Hopkins Kelvin",mar: 30.81,reg:"East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Luton South",mp:"Gavin Shuker",mprev:"Shuker Gavin",mar: 30.18,reg:"East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Macclesfield",mp:"David Rutley",mprev:"Rutley David",mar: 15.85,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Maidenhead",mp:"Theresa May",mprev:"May Theresa",mar: 45.43,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Maidstone and The Weald",mp:"Helen Grant",mprev:"Grant Helen",mar: 34.27,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Makerfield",mp:"Yvonne Fovargue",mprev:"Fovargue Yvonne",mar: 28.85,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Maldon",mp:"John Whittingdale",mprev:"Whittingdale John",mar: 46.67,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Manchester Central",mp:"Lucy Powell",mprev:"Powell Lucy",mar: 63.24,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Manchester, Gorton",mp:"Mohammed Khan",mprev:"Khan Mohammed",mar: 69.05,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Manchester, Withington",mp:"Jeff Smith",mprev:"Smith Jeff",mar: 55.73,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2017",con:"Mansfield",mp:"Ben Bradley",mprev:"Bradley Ben",mar: 2.11,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2017",con:"Meon Valley",mp:"George Hollingbery",mprev:"Hollingbery George",mar: 47.41,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Meriden",mp:"Caroline Spelman",mprev:"Spelman Caroline",mar: 35.13,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Mid Bedfordshire",mp:"Nadine Dorries",mprev:"Dorries Nadine",mar: 33.23,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Mid Derbyshire",mp:"Pauline Latham",mprev:"Latham Pauline",mar: 23.06,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Mid Dorset and North Poole",mp:"Michael Tomlinson",mprev:"Tomlinson Michael",mar: 31.79,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Mid Norfolk",mp:"George Freeman",mprev:"Freeman George",mar: 28.9,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Mid Sussex",mp:"Nicholas Soames",mprev:"Soames Nicholas",mar: 31.92,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Mid Worcestershire",mp:"Nigel Huddleston",mprev:"Huddleston Nigel",mar: 42.34,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Middlesbrough",mp:"Andy McDonald",mprev:"McDonald Andy",mar: 38.93,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Middlesbrough South and East Cleveland",mp:"Simon Clarke",mprev:"Clarke Simon",mar: 2.14,reg:"North East",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2017",con:"Milton Keynes North",mp:"Mark Lancaster",mprev:"Lancaster Mark",mar: 3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Milton Keynes South",mp:"Iain Stewart",mprev:"Stewart Iain",mar: 2.67,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Mitcham and Morden",mp:"Siobhain McDonagh",mprev:"McDonagh Siobhain",mar: 44.42,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Mole Valley",mp:"Paul Beresford",mprev:"Beresford Paul",mar: 42.55,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Morecambe and Lunesdale",mp:"David Morris",mprev:"Morris David",mar: 3.06,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Morley and Outwood",mp:"Andrea Jenkyns",mprev:"Jenkyns Andrea",mar: 4.02,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"New Forest East",mp:"Julian Lewis",mprev:"Lewis Julian",mar: 42.82,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"New Forest West",mp:"Desmond Swayne",mprev:"Swayne Desmond",mar: 47.21,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Newark",mp:"Robert Jenrick",mprev:"Jenrick Robert",mar: 32.97,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Newbury",mp:"Richard Benyon",mprev:"Benyon Richard",mar: 40.07,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Newcastle Upon Tyne Central",mp:"Chi Onwurah",mprev:"Onwurah Chi",mar: 40.27,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Newcastle Upon Tyne East",mp:"Nick Brown",mprev:"Brown Nick",mar: 46.26,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Newcastle Upon Tyne North",mp:"Catherine McKinnell",mprev:"McKinnell Catherine",mar: 21.43,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Newcastle-Under-Lyme",mp:"Paul Farrelly",mprev:"Farrelly Paul",mar: 0.07,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Newton Abbot",mp:"Anne Marie Morris",mprev:"Morris Anne Marie",mar: 33.23,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Normanton, Pontefract and Castleford",mp:"Yvette Cooper",mprev:"Cooper Yvette",mar: 29.47,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"North Cornwall",mp:"Scott Mann",mprev:"Mann Scott",mar: 14.13,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"North Devon",mp:"Peter Heaton-Jones",mprev:"Heaton-Jones Peter",mar: 7.78,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"North Dorset",mp:"Simon Hoare",mprev:"Hoare Simon",mar: 46.26,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North Durham",mp:"Kevan Jones",mprev:"Jones Kevan",mar: 29.89,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"North East Bedfordshire",mp:"Alistair Burt",mprev:"Burt Alistair",mar: 32.49,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North East Cambridgeshire",mp:"Stephen Barclay",mprev:"Barclay Stephen",mar: 39.92,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North East Derbyshire",mp:"Lee Rowley",mprev:"Rowley Lee",mar: 5.68,reg:"East Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2017",con:"North East Hampshire",mp:"Ranil Jayawardena",mprev:"Jayawardena Ranil",mar: 48.19,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North East Hertfordshire",mp:"Oliver Heald",mprev:"Heald Oliver",mar: 30.29,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North East Somerset",mp:"Jacob Rees-Mogg",mprev:"Rees-Mogg Jacob",mar: 18.94,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North Herefordshire",mp:"Bill Wiggin",mprev:"Wiggin Bill",mar: 43.05,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North Norfolk",mp:"Norman Lamb",mprev:"Lamb Norman",mar: 6.73,reg:"East",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2017",con:"North Shropshire",mp:"Owen Paterson",mprev:"Paterson Owen",mar: 29.42,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North Somerset",mp:"Liam Fox",mprev:"Fox Liam",mar: 27.59,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North Swindon",mp:"Justin Tomlinson",mprev:"Tomlinson Justin",mar: 15.18,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North Thanet",mp:"Roger Gale",mprev:"Gale Roger",mar: 22.22,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North Tyneside",mp:"Mary Glindon",mprev:"Glindon Mary",mar: 37.16,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"North Warwickshire",mp:"Craig Tracey",mprev:"Tracey Craig",mar: 18.04,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North West Cambridgeshire",mp:"Shailesh Vara",mprev:"Vara Shailesh",mar: 28.14,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North West Durham",mp:"Laura Pidcock",mprev:"Pidcock Laura",mar: 18.35,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"North West Hampshire",mp:"Kit Malthouse",mprev:"Malthouse Kit",mar: 38.59,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North West Leicestershire",mp:"Andrew Bridgen",mprev:"Bridgen Andrew",mar: 24.81,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North West Norfolk",mp:"Henry Bellingham",mprev:"Bellingham Henry",mar: 28.25,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"North Wiltshire",mp:"James Gray",mprev:"Gray James",mar: 42.6,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Northampton North",mp:"Michael Ellis",mprev:"Ellis Michael",mar: 2,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Northampton South",mp:"Andrew Lewer",mprev:"Lewer Andrew",mar: 2.82,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Norwich North",mp:"Chloe Smith",mprev:"Smith Chloe",mar: 1.1,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Norwich South",mp:"Clive Lewis",mprev:"Lewis Clive",mar: 30.37,reg:"East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Nottingham East",mp:"Chris Leslie",mprev:"Leslie Chris",mar: 49.81,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Nottingham North",mp:"Alex Norris",mprev:"Norris Alex",mar: 29.12,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Nottingham South",mp:"Lilian Greenwood",mprev:"Greenwood Lilian",mar: 31.5,reg:"East Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Nuneaton",mp:"Marcus Jones",mprev:"Jones Marcus",mar: 10.29,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Old Bexley and Sidcup",mp:"James Brokenshire",mprev:"Brokenshire James",mar: 32.19,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Oldham East and Saddleworth",mp:"Debbie Abrahams",mprev:"Abrahams Debbie",mar: 17.39,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Oldham West and Royton",mp:"Jim McMahon",mprev:"McMahon Jim",mar: 37.56,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Orpington",mp:"Jo Johnson",mprev:"Johnson Jo",mar: 38.57,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Oxford East",mp:"Anneliese Dodds",mprev:"Dodds Anneliese",mar: 43.2,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Oxford West and Abingdon",mp:"Layla Moran",mprev:"Moran Layla",mar: 1.36,reg:"South East",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Pendle",mp:"Andrew Stephenson",mprev:"Stephenson Andrew",mar: 2.85,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Penistone and Stocksbridge",mp:"Angela Smith",mprev:"Smith Angela",mar: 2.66,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Penrith and The Border",mp:"Rory Stewart",mprev:"Stewart Rory",mar: 34.24,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Peterborough",mp:"Fiona Onasanya",mprev:"Onasanya Fiona",mar: 1.27,reg:"East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Plymouth, Moor View",mp:"Johnny Mercer",mprev:"Mercer Johnny",mar: 11.05,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Plymouth, Sutton and Devonport",mp:"Luke Pollard",mprev:"Pollard Luke",mar: 13.29,reg:"South West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Poole",mp:"Robert Syms",mprev:"Syms Robert",mar: 28.5,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Poplar and Limehouse",mp:"Jim Fitzpatrick",mprev:"Fitzpatrick Jim",mar: 47.12,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Portsmouth North",mp:"Penny Mordaunt",mprev:"Mordaunt Penny",mar: 21.11,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Portsmouth South",mp:"Stephen Morgan",mprev:"Morgan Stephen",mar: 3.49,reg:"South East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Preston",mp:"Mark Hendrick",mprev:"Hendrick Mark",mar: 44.17,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Pudsey",mp:"Stuart Andrew",mprev:"Andrew Stuart",mar: 0.61,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Putney",mp:"Justine Greening",mprev:"Greening Justine",mar: 3.31,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Rayleigh and Wickford",mp:"Mark Francois",mprev:"Francois Mark",mar: 42.39,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Reading East",mp:"Matt Rodda",mprev:"Rodda Matt",mar: 6.79,reg:"South East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Reading West",mp:"Alok Sharma",mprev:"Sharma Alok",mar: 5.56,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Redcar",mp:"Anna Turley",mprev:"Turley Anna",mar: 22.29,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Redditch",mp:"Rachel Maclean",mprev:"Maclean Rachel",mar: 16.29,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Reigate",mp:"Crispin Blunt",mprev:"Blunt Crispin",mar: 32.73,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Ribble Valley",mp:"Nigel Evans",mprev:"Evans Nigel",mar: 23.91,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Richmond (Yorks)",mp:"Rishi Sunak",mprev:"Sunak Rishi",mar: 40.53,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Richmond Park",mp:"Zac Goldsmith",mprev:"Goldsmith Zac",mar: 0.07,reg:"London",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2017",con:"Rochdale",mp:"Tony Lloyd",mprev:"Lloyd Tony",mar: 29.61,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Rochester and Strood",mp:"Kelly Tolhurst",mprev:"Tolhurst Kelly",mar: 18.32,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Rochford and Southend East",mp:"James Duddridge",mprev:"Duddridge James",mar: 11.74,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Romford",mp:"Andrew Rosindell",mprev:"Rosindell Andrew",mar: 27.59,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Romsey and Southampton North",mp:"Caroline Nokes",mprev:"Nokes Caroline",mar: 36,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Rossendale and Darwen",mp:"Jake Berry",mprev:"Berry Jake",mar: 6.41,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Rother Valley",mp:"Kevin Barron",mprev:"Barron Kevin",mar: 7.84,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Rotherham",mp:"Sarah Champion",mprev:"Champion Sarah",mar: 30.03,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Rugby",mp:"Mark Pawsey",mprev:"Pawsey Mark",mar: 16,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Ruislip, Northwood and Pinner",mp:"Nick Hurd",mprev:"Hurd Nick",mar: 26.19,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Runnymede and Weybridge",mp:"Philip Hammond",mprev:"Hammond Philip",mar: 34.97,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Rushcliffe",mp:"Kenneth Clarke",mprev:"Clarke Kenneth",mar: 13.74,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Rutland and Melton",mp:"Alan Duncan",mprev:"Duncan Alan",mar: 40.13,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Saffron Walden",mp:"Kemi Badenoch",mprev:"Badenoch Kemi",mar: 40.99,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Salford and Eccles",mp:"Rebecca Long-Bailey",mprev:"Long-Bailey Rebecca",mar: 40.18,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Salisbury",mp:"John Glen",mprev:"Glen John",mar: 32.51,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Scarborough and Whitby",mp:"Robert Goodwill",mprev:"Goodwill Robert",mar: 6.81,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Scunthorpe",mp:"Nic Dakin",mprev:"Dakin Nic",mar: 8.53,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Sedgefield",mp:"Phil Wilson",mprev:"Wilson Phil",mar: 14.57,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Sefton Central",mp:"Bill Esterson",mprev:"Esterson Bill",mar: 29.99,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Selby and Ainsty",mp:"Nigel Adams",mprev:"Adams Nigel",mar: 24.56,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Sevenoaks",mp:"Michael Fallon",mprev:"Fallon Michael",mar: 42.79,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Sheffield Central",mp:"Paul Blomfield",mprev:"Blomfield Paul",mar: 57.96,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Sheffield South East",mp:"Clive Betts",mprev:"Betts Clive",mar: 27.06,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Sheffield, Brightside and Hillsborough",mp:"Gill Furniss",mprev:"Furniss Gill",mar: 45.72,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Sheffield, Hallam",mp:"Jared O Mara",mprev:"O Mara Jared",mar: 3.73,reg:"Yorkshire and The Humber",party:"Labour",prev:"#FDBB30",curr:"#DC241f",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2017",con:"Sheffield, Heeley",mp:"Louise Haigh",mprev:"Haigh Louise",mar: 31.27,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Sherwood",mp:"Mark Spencer",mprev:"Spencer Mark",mar: 9.74,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Shipley",mp:"Philip Davies",mprev:"Davies Philip",mar: 8.77,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Shrewsbury and Atcham",mp:"Daniel Kawczynski",mprev:"Kawczynski Daniel",mar: 11.39,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Sittingbourne and Sheppey",mp:"Gordon Henderson",mprev:"Henderson Gordon",mar: 29.6,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Skipton and Ripon",mp:"Julian Smith",mprev:"Smith Julian",mar: 34.38,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Sleaford and North Hykeham",mp:"Caroline Johnson",mprev:"Johnson Caroline",mar: 38.36,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Slough",mp:"Tan Dhesi",mprev:"Dhesi Tan",mar: 31.31,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Solihull",mp:"Julian Knight",mprev:"Knight Julian",mar: 36.25,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Somerton and Frome",mp:"David Warburton",mprev:"Warburton David",mar: 35.85,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"South Basildon and East Thurrock",mp:"Stephen Metcalfe",mprev:"Metcalfe Stephen",mar: 24.38,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Cambridgeshire",mp:"Heidi Allen",mprev:"Allen Heidi",mar: 24.57,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Derbyshire",mp:"Heather Wheeler",mprev:"Wheeler Heather",mar: 22.74,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Dorset",mp:"Richard Drax",mprev:"Drax Richard",mar: 22.53,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South East Cambridgeshire",mp:"Lucy Frazer",mprev:"Frazer Lucy",mar: 25.65,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South East Cornwall",mp:"Sheryll Murray",mprev:"Murray Sheryll",mar: 32.77,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Holland and The Deepings",mp:"John Hayes",mprev:"Hayes John",mar: 49.48,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Leicestershire",mp:"Alberto Costa",mprev:"Costa Alberto",mar: 32.87,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Norfolk",mp:"Richard Bacon",mprev:"Bacon Richard",mar: 27.29,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Northamptonshire",mp:"Andrea Leadsom",mprev:"Leadsom Andrea",mar: 35.14,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Ribble",mp:"Seema Kennedy",mprev:"Kennedy Seema",mar: 13.53,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Shields",mp:"Emma Lewell-Buck",mprev:"Lewell-Buck Emma",mar: 35.58,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"South Staffordshire",mp:"Gavin Williamson",mprev:"Williamson Gavin",mar: 44.48,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Suffolk",mp:"James Cartlidge",mprev:"Cartlidge James",mar: 32.73,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Swindon",mp:"Robert Buckland",mprev:"Buckland Robert",mar: 4.81,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South Thanet",mp:"Craig Mackinlay",mprev:"Mackinlay Craig",mar: 12.84,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South West Bedfordshire",mp:"Andrew Selous",mprev:"Selous Andrew",mar: 25.47,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South West Devon",mp:"Gary Streeter",mprev:"Streeter Gary",mar: 29.92,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South West Hertfordshire",mp:"David Gauke",mprev:"Gauke David",mar: 32.23,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South West Norfolk",mp:"Elizabeth Truss",mprev:"Truss Elizabeth",mar: 34.94,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"South West Surrey",mp:"Jeremy Hunt",mprev:"Hunt Jeremy",mar: 35.73,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DDDDDD",prevparty: "Conservative",secparty:"National Health Action"},
{year:"2017",con:"South West Wiltshire",mp:"Andrew Murrison",mprev:"Murrison Andrew",mar: 33.47,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Southampton, Itchen",mp:"Royston Smith",mprev:"Smith Royston",mar: 0.07,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Southampton, Test",mp:"Alan Whitehead",mprev:"Whitehead Alan",mar: 24.53,reg:"South East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Southend West",mp:"David Amess",mprev:"Amess David",mar: 21.19,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Southport",mp:"Damien Moore",mprev:"Moore Damien",mar: 6.08,reg:"North West",party:"Conservative",prev:"#FDBB30",curr:"#0087DC",sec:"#DC241f",prevparty: "Liberal Democrats",secparty:"Labour"},
{year:"2017",con:"Spelthorne",mp:"Kwasi Kwarteng",mprev:"Kwarteng Kwasi",mar: 26.79,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"St Albans",mp:"Anne Main",mprev:"Main Anne",mar: 10.72,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"St Austell and Newquay",mp:"Steve Double",mprev:"Double Steve",mar: 20.55,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"St Helens North",mp:"Conor McGinn",mprev:"McGinn Conor",mar: 36.65,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"St Helens South and Whiston",mp:"Marie Rimmer",mprev:"Rimmer Marie",mar: 46.03,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"St Ives",mp:"Derek Thomas",mprev:"Thomas Derek",mar: 0.61,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Stafford",mp:"Jeremy Lefroy",mprev:"Lefroy Jeremy",mar: 14.89,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Staffordshire Moorlands",mp:"Karen Bradley",mprev:"Bradley Karen",mar: 24.25,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Stalybridge and Hyde",mp:"Jonathan Reynolds",mprev:"Reynolds Jonathan",mar: 19.04,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Stevenage",mp:"Stephen McPartland",mprev:"McPartland Stephen",mar: 6.86,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Stockport",mp:"Ann Coffey",mprev:"Coffey Ann",mar: 34.85,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Stockton North",mp:"Alex Cunningham",mprev:"Cunningham Alex",mar: 20.4,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Stockton South",mp:"Paul Williams",mprev:"Williams Paul",mar: 1.65,reg:"North East",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Stoke-On-Trent Central",mp:"Gareth Snell",mprev:"Snell Gareth",mar: 11.76,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Stoke-On-Trent North",mp:"Ruth Smeeth",mprev:"Smeeth Ruth",mar: 5.65,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Stoke-On-Trent South",mp:"Jack Brereton",mprev:"Brereton Jack",mar: 1.59,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2017",con:"Stone",mp:"Bill Cash",mprev:"Cash Bill",mar: 34.97,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Stourbridge",mp:"Margot James",mprev:"James Margot",mar: 16.24,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Stratford-On-Avon",mp:"Nadhim Zahawi",mprev:"Zahawi Nadhim",mar: 41.02,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Streatham",mp:"Chuka Umunna",mprev:"Umunna Chuka",mar: 47.11,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Stretford and Urmston",mp:"Kate Green",mprev:"Green Kate",mar: 39.26,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Stroud",mp:"David Drew",mprev:"Drew David",mar: 1.08,reg:"South West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Suffolk Coastal",mp:"Therese Coffey",mprev:"Coffey Therese",mar: 27.57,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Sunderland Central",mp:"Julie Elliott",mprev:"Elliott Julie",mar: 22.16,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Surrey Heath",mp:"Michael Gove",mprev:"Gove Michael",mar: 43.14,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Sutton and Cheam",mp:"Paul Scully",mprev:"Scully Paul",mar: 24.43,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Sutton Coldfield",mp:"Andrew Mitchell",mprev:"Mitchell Andrew",mar: 29.02,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Tamworth",mp:"Christopher Pincher",mprev:"Pincher Christopher",mar: 26.21,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Tatton",mp:"Esther McVey",mprev:"McVey Esther",mar: 30.11,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Taunton Deane",mp:"Rebecca Pow",mprev:"Pow Rebecca",mar: 25.2,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Telford",mp:"Lucy Allan",mprev:"Allan Lucy",mar: 1.61,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Tewkesbury",mp:"Laurence Robertson",mprev:"Robertson Laurence",mar: 38.21,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"The Cotswolds",mp:"Geoffrey Clifton-Brown",mprev:"Clifton-Brown Geoffrey",mar: 42.71,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"The Wrekin",mp:"Mark Pritchard",mprev:"Pritchard Mark",mar: 19.31,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Thirsk and Malton",mp:"Kevin Hollinrake",mprev:"Hollinrake Kevin",mar: 33.97,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Thornbury and Yate",mp:"Luke Hall",mprev:"Hall Luke",mar: 23.81,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Thurrock",mp:"Jackie Doyle-Price",mprev:"Doyle-Price Jackie",mar: 0.69,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Tiverton and Honiton",mp:"Neil Parish",mprev:"Parish Neil",mar: 34.25,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Tonbridge and Malling",mp:"Tom Tugendhat",mprev:"Tugendhat Tom",mar: 41.31,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Tooting",mp:"Rosena Allin-Khan",mprev:"Allin-Khan Rosena",mar: 26.57,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Torbay",mp:"Kevin Foster",mprev:"Foster Kevin",mar: 27.91,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Torridge and West Devon",mp:"Geoffrey Cox",mprev:"Cox Geoffrey",mar: 34.78,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Totnes",mp:"Sarah Wollaston",mprev:"Wollaston Sarah",mar: 26.81,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Tottenham",mp:"David Lammy",mprev:"Lammy David",mar: 70.09,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Truro and Falmouth",mp:"Sarah Newton",mprev:"Newton Sarah",mar: 6.69,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Tunbridge Wells",mp:"Greg Clark",mprev:"Clark Greg",mar: 30.37,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Twickenham",mp:"Vince Cable",mprev:"Cable Vince",mar: 14.73,reg:"London",party:"Liberal Democrats",prev:"#0087DC",curr:"#FDBB30",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Tynemouth",mp:"Alan Campbell",mprev:"Campbell Alan",mar: 20.52,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Uxbridge and South Ruislip",mp:"Boris Johnson",mprev:"Johnson Boris",mar: 10.78,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Vauxhall",mp:"Kate Hoey",mprev:"Hoey Kate",mar: 36.79,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FDBB30",prevparty: "Labour",secparty:"Liberal Democrats"},
{year:"2017",con:"Wakefield",mp:"Mary Creagh",mprev:"Creagh Mary",mar: 4.7,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Wallasey",mp:"Angela Eagle",mprev:"Eagle Angela",mar: 48.23,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Walsall North",mp:"Eddie Hughes",mprev:"Hughes Eddie",mar: 6.82,reg:"West Midlands",party:"Conservative",prev:"#DC241f",curr:"#0087DC",sec:"#DC241f",prevparty: "Labour",secparty:"Labour"},
{year:"2017",con:"Walsall South",mp:"Valerie Vaz",mprev:"Vaz Valerie",mar: 20.18,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Walthamstow",mp:"Stella Creasy",mprev:"Creasy Stella",mar: 66.5,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Wansbeck",mp:"Ian Lavery",mprev:"Lavery Ian",mar: 24.58,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Wantage",mp:"Ed Vaizey",mprev:"Vaizey Ed",mar: 27.33,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Warley",mp:"John Spellar",mprev:"Spellar John",mar: 41,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Warrington North",mp:"Helen Jones",mprev:"Jones Helen",mar: 19.75,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Warrington South",mp:"Faisal Rashid",mprev:"Rashid Faisal",mar: 4.11,reg:"North West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Warwick and Leamington",mp:"Matt Western",mprev:"Western Matt",mar: 2.23,reg:"West Midlands",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Washington and Sunderland West",mp:"Sharon Hodgson",mprev:"Hodgson Sharon",mar: 31.89,reg:"North East",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Watford",mp:"Richard Harrington",mprev:"Harrington Richard",mar: 3.57,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Waveney",mp:"Peter Aldous",mprev:"Aldous Peter",mar: 17.49,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wealden",mp:"Nus Ghani",mprev:"Ghani Nus",mar: 39.08,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Weaver Vale",mp:"Mike Amesbury",mprev:"Amesbury Mike",mar: 7.76,reg:"North West",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Wellingborough",mp:"Peter Bone",mprev:"Bone Peter",mar: 23.4,reg:"East Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wells",mp:"James Heappey",mprev:"Heappey James",mar: 12.46,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Welwyn Hatfield",mp:"Grant Shapps",mprev:"Shapps Grant",mar: 14.26,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wentworth and Dearne",mp:"John Healey",mprev:"Healey John",mar: 33.68,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"West Bromwich East",mp:"Tom Watson",mprev:"Watson Tom",mar: 19.73,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"West Bromwich West",mp:"Adrian Bailey",mprev:"Bailey Adrian",mar: 12.36,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"West Dorset",mp:"Oliver Letwin",mprev:"Letwin Oliver",mar: 32.03,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"West Ham",mp:"Lyn Brown",mprev:"Brown Lyn",mar: 60.54,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"West Lancashire",mp:"Rosie Cooper",mprev:"Cooper Rosie",mar: 21.49,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"West Suffolk",mp:"Matt Hancock",mprev:"Hancock Matt",mar: 32.97,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"West Worcestershire",mp:"Harriett Baldwin",mprev:"Baldwin Harriett",mar: 37.77,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Westminster North",mp:"Karen Buck",mprev:"Buck Karen",mar: 26.59,reg:"London",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Westmorland and Lonsdale",mp:"Tim Farron",mprev:"Farron Tim",mar: 1.5,reg:"North West",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#0087DC",prevparty: "Liberal Democrats",secparty:"Conservative"},
{year:"2017",con:"Weston-Super-Mare",mp:"John Penrose",mprev:"Penrose John",mar: 20.46,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wigan",mp:"Lisa Nandy",mprev:"Nandy Lisa",mar: 33.71,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Wimbledon",mp:"Stephen Hammond",mprev:"Hammond Stephen",mar: 10.91,reg:"London",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Winchester",mp:"Steve Brine",mprev:"Brine Steve",mar: 17.49,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Windsor",mp:"Adam Afriyie",mprev:"Afriyie Adam",mar: 41.51,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wirral South",mp:"Alison McGovern",mprev:"McGovern Alison",mar: 18.42,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Wirral West",mp:"Margaret Greenwood",mprev:"Greenwood Margaret",mar: 12.21,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Witham",mp:"Priti Patel",mprev:"Patel Priti",mar: 37.87,reg:"East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Witney",mp:"Robert Courts",mprev:"Courts Robert",mar: 34.86,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Woking",mp:"Jonathan Lord",mprev:"Lord Jonathan",mar: 30.27,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wokingham",mp:"John Redwood",mprev:"Redwood John",mar: 31.49,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wolverhampton North East",mp:"Emma Reynolds",mprev:"Reynolds Emma",mar: 12.56,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Wolverhampton South East",mp:"Pat McFadden",mprev:"McFadden Pat",mar: 23.45,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Wolverhampton South West",mp:"Eleanor Smith",mprev:"Smith Eleanor",mar: 5.16,reg:"West Midlands",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Worcester",mp:"Robin Walker",mprev:"Walker Robin",mar: 4.88,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Workington",mp:"Sue Hayman",mprev:"Hayman Sue",mar: 9.42,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Worsley and Eccles South",mp:"Barbara Keeley",mprev:"Keeley Barbara",mar: 18.36,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Worthing West",mp:"Peter Bottomley",mprev:"Bottomley Peter",mar: 22.18,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wycombe",mp:"Steve Baker",mprev:"Baker Steve",mar: 12.3,reg:"South East",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wyre and Preston North",mp:"Ben Wallace",mprev:"Wallace Ben",mar: 23.26,reg:"North West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wyre Forest",mp:"Mark Garnier",mprev:"Garnier Mark",mar: 26.08,reg:"West Midlands",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Wythenshawe and Sale East",mp:"Mike Kane",mprev:"Kane Mike",mar: 32.6,reg:"North West",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Yeovil",mp:"Marcus Fysh",mprev:"Fysh Marcus",mar: 24.78,reg:"South West",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"York Central",mp:"Rachael Maskell",mprev:"Maskell Rachael",mar: 34.99,reg:"Yorkshire and The Humber",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"York Outer",mp:"Julian Sturdy",mprev:"Sturdy Julian",mar: 14.43,reg:"Yorkshire and The Humber",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Belfast East",mp:"Gavin Robinson",mprev:"Robinson Gavin",mar: 19.76,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#F6CB2F",prevparty: "Democratic Unionist Party",secparty:"Alliance"},
{year:"2017",con:"Belfast North",mp:"Nigel Dodds",mprev:"Dodds Nigel",mar: 4.53,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#008800",prevparty: "Democratic Unionist Party",secparty:"Sinn Fein"},
{year:"2017",con:"Belfast South",mp:"Emma Little Pengelly",mprev:"Little Pengelly Emma",mar: 4.57,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#99FF66",curr:"#D46A4C",sec:"#99FF66",prevparty: "Social Democratic and Labour Party",secparty:"Social Democratic and Labour Party"},
{year:"2017",con:"Belfast West",mp:"Paul Maskey",mprev:"Maskey Paul",mar: 53.29,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#D46A4C",prevparty: "Sinn Fein",secparty:"Democratic Unionist Party"},
{year:"2017",con:"East Antrim",mp:"Sammy Wilson",mprev:"Wilson Sammy",mar: 41.75,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#F6CB2F",prevparty: "Democratic Unionist Party",secparty:"Alliance"},
{year:"2017",con:"East Londonderry",mp:"Gregory Campbell",mprev:"Campbell Gregory",mar: 21.55,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#008800",prevparty: "Democratic Unionist Party",secparty:"Sinn Fein"},
{year:"2017",con:"Fermanagh and South Tyrone",mp:"Michelle Gildernew",mprev:"Gildernew Michelle",mar: 1.64,reg:"Northern Ireland",party:"Sinn Fein",prev:"#9999FF",curr:"#008800",sec:"#9999FF",prevparty: "Ulster Unionist Party",secparty:"Ulster Unionist Party"},
{year:"2017",con:"Foyle",mp:"Elisha McCallion",mprev:"McCallion Elisha",mar: 0.37,reg:"Northern Ireland",party:"Sinn Fein",prev:"#99FF66",curr:"#008800",sec:"#99FF66",prevparty: "Social Democratic and Labour Party",secparty:"Social Democratic and Labour Party"},
{year:"2017",con:"Lagan Valley",mp:"Jeffrey Donaldson",mprev:"Donaldson Jeffrey",mar: 42.8,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#9999FF",prevparty: "Democratic Unionist Party",secparty:"Ulster Unionist Party"},
{year:"2017",con:"Mid Ulster",mp:"Francie Molloy",mprev:"Molloy Francie",mar: 27.61,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#D46A4C",prevparty: "Sinn Fein",secparty:"Democratic Unionist Party"},
{year:"2017",con:"Newry and Armagh",mp:"Mickey Brady",mprev:"Brady Mickey",mar: 23.31,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#D46A4C",prevparty: "Sinn Fein",secparty:"Democratic Unionist Party"},
{year:"2017",con:"North Antrim",mp:"Ian Paisley",mprev:"Paisley Ian",mar: 42.6,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#008800",prevparty: "Democratic Unionist Party",secparty:"Sinn Fein"},
{year:"2017",con:"North Down",mp:"Sylvia Hermon",mprev:"Hermon Sylvia",mar: 3.08,reg:"Northern Ireland",party:"Independent",prev:"#DDDDDD",curr:"#DDDDDD",sec:"#D46A4C",prevparty: "Independent",secparty:"Democratic Unionist Party"},
{year:"2017",con:"South Antrim",mp:"Paul Girvan",mprev:"Girvan Paul",mar: 7.43,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#9999FF",curr:"#D46A4C",sec:"#9999FF",prevparty: "Ulster Unionist Party",secparty:"Ulster Unionist Party"},
{year:"2017",con:"South Down",mp:"Chris Hazzard",mprev:"Hazzard Chris",mar: 4.81,reg:"Northern Ireland",party:"Sinn Fein",prev:"#99FF66",curr:"#008800",sec:"#99FF66",prevparty: "Social Democratic and Labour Party",secparty:"Social Democratic and Labour Party"},
{year:"2017",con:"Strangford",mp:"Jim Shannon",mprev:"Shannon Jim",mar: 47.34,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#F6CB2F",prevparty: "Democratic Unionist Party",secparty:"Alliance"},
{year:"2017",con:"Upper Bann",mp:"David Simpson",mprev:"Simpson David",mar: 15.59,reg:"Northern Ireland",party:"Democratic Unionist Party",prev:"#D46A4C",curr:"#D46A4C",sec:"#008800",prevparty: "Democratic Unionist Party",secparty:"Sinn Fein"},
{year:"2017",con:"West Tyrone",mp:"Barry McElduff",mprev:"McElduff Barry",mar: 23.78,reg:"Northern Ireland",party:"Sinn Fein",prev:"#008800",curr:"#008800",sec:"#D46A4C",prevparty: "Sinn Fein",secparty:"Democratic Unionist Party"},
{year:"2017",con:"Aberdeen North",mp:"Kirsty Blackman",mprev:"Blackman Kirsty",mar: 11.26,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Aberdeen South",mp:"Ross Thomson",mprev:"Thomson Ross",mar: 10.68,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Airdrie and Shotts",mp:"Neil Gray",mprev:"Gray Neil",mar: 0.51,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Angus",mp:"Kirstene Hair",mprev:"Hair Kirstene",mar: 6.58,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Argyll and Bute",mp:"Brendan O'Hara",mprev:"O'Hara Brendan",mar: 2.76,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"Ayr, Carrick and Cumnock",mp:"Bill Grant",mprev:"Grant Bill",mar: 6,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Banff and Buchan",mp:"David Duguid",mprev:"Duguid David",mar: 8.87,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Berwickshire, Roxburgh and Selkirk",mp:"John Lamont",mprev:"Lamont John",mar: 21.12,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Caithness, Sutherland and Easter Ross",mp:"Jamie Stone",mprev:"Stone Jamie",mar: 6.61,reg:"Scotland",party:"Liberal Democrats",prev:"#FFFF00",curr:"#FDBB30",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Central Ayrshire",mp:"Philippa Whitford",mprev:"Whitford Philippa",mar: 2.81,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"Coatbridge, Chryston and Bellshill",mp:"Hugh Gaffney",mprev:"Gaffney Hugh",mar: 3.52,reg:"Scotland",party:"Labour",prev:"#FFFF00",curr:"#DC241f",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Cumbernauld, Kilsyth and Kirkintilloch East",mp:"Stuart McDonald",mprev:"McDonald Stuart",mar: 9.73,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Dumfries and Galloway",mp:"Alister Jack",mprev:"Jack Alister",mar: 10.94,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Dumfriesshire, Clydesdale and Tweeddale",mp:"David Mundell",mprev:"Mundell David",mar: 19.28,reg:"Scotland",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FFFF00",prevparty: "Conservative",secparty:"Scottish National Party"},
{year:"2017",con:"Dundee East",mp:"Stewart Hosie",mprev:"Hosie Stewart",mar: 15.48,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"Dundee West",mp:"Chris Law",mprev:"Law Chris",mar: 13.6,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Dunfermline and West Fife",mp:"Douglas Chapman",mprev:"Chapman Douglas",mar: 1.65,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"East Dunbartonshire",mp:"Jo Swinson",mprev:"Swinson Jo",mar: 10.31,reg:"Scotland",party:"Liberal Democrats",prev:"#FFFF00",curr:"#FDBB30",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"East Kilbride, Strathaven and Lesmahagow",mp:"Lisa Cameron",mprev:"Cameron Lisa",mar: 7.15,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"East Lothian",mp:"Martin Whitfield",mprev:"Whitfield Martin",mar: 5.52,reg:"Scotland",party:"Labour",prev:"#FFFF00",curr:"#DC241f",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"East Renfrewshire",mp:"Paul Masterton",mprev:"Masterton Paul",mar: 8.77,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Edinburgh East",mp:"Tommy Sheppard",mprev:"Sheppard Tommy",mar: 7.87,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Edinburgh North and Leith",mp:"Deidre Brock",mprev:"Brock Deidre",mar: 2.87,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Edinburgh South",mp:"Ian Murray",mprev:"Murray Ian",mar: 32.43,reg:"Scotland",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#FFFF00",prevparty: "Labour",secparty:"Scottish National Party"},
{year:"2017",con:"Edinburgh South West",mp:"Joanna Cherry",mprev:"Cherry Joanna",mar: 2.22,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"Edinburgh West",mp:"Christine Jardine",mprev:"Jardine Christine",mar: 5.66,reg:"Scotland",party:"Liberal Democrats",prev:"#FFFF00",curr:"#FDBB30",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Na h-Eileanan An Iar",mp:"Angus MacNeil",mprev:"MacNeil Angus",mar: 6.8,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Falkirk",mp:"Johnny McNally",mprev:"McNally Johnny",mar: 9.15,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Glasgow Central",mp:"Alison Thewliss",mprev:"Thewliss Alison",mar: 6.3,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Glasgow East",mp:"David Linden",mprev:"Linden David",mar: 0.21,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Glasgow North",mp:"Patrick Grady",mprev:"Grady Patrick",mar: 3.17,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Glasgow North East",mp:"Paul Sweeney",mprev:"Sweeney Paul",mar: 0.76,reg:"Scotland",party:"Labour",prev:"#FFFF00",curr:"#DC241f",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Glasgow North West",mp:"Carol Monaghan",mprev:"Monaghan Carol",mar: 6.59,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Glasgow South",mp:"Stewart McDonald",mprev:"McDonald Stewart",mar: 4.55,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Glasgow South West",mp:"Chris Stephens",mprev:"Stephens Chris",mar: 0.17,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Glenrothes",mp:"Peter Grant",mprev:"Grant Peter",mar: 8.09,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Gordon",mp:"Colin Clark",mprev:"Clark Colin",mar: 4.86,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Inverclyde",mp:"Ronnie Cowan",mprev:"Cowan Ronnie",mar: 0.98,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Inverness, Nairn, Badenoch and Strathspey",mp:"Drew Hendry",mprev:"Hendry Drew",mar: 9.33,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"Kilmarnock and Loudoun",mp:"Alan Brown",mprev:"Brown Alan",mar: 13.48,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Kirkcaldy and Cowdenbeath",mp:"Lesley Laird",mprev:"Laird Lesley",mar: 0.56,reg:"Scotland",party:"Labour",prev:"#FFFF00",curr:"#DC241f",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Lanark and Hamilton East",mp:"Angela Crawley",mprev:"Crawley Angela",mar: 0.53,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"Linlithgow and East Falkirk",mp:"Martyn Day",mprev:"Day Martyn",mar: 5.2,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Livingston",mp:"Hannah Bardell",mprev:"Bardell Hannah",mar: 7.39,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Midlothian",mp:"Danielle Rowley",mprev:"Rowley Danielle",mar: 1.95,reg:"Scotland",party:"Labour",prev:"#FFFF00",curr:"#DC241f",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Moray",mp:"Douglas Ross",mprev:"Ross Douglas",mar: 8.74,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Motherwell and Wishaw",mp:"Marion Fellows",mprev:"Fellows Marion",mar: 0.76,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"North Ayrshire and Arran",mp:"Patricia Gibson",mprev:"Gibson Patricia",mar: 7.66,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"North East Fife",mp:"Stephen Gethins",mprev:"Gethins Stephen",mar: 0,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#FDBB30",prevparty: "Scottish National Party",secparty:"Liberal Democrats"},
{year:"2017",con:"Ochil and South Perthshire",mp:"Luke Graham",mprev:"Graham Luke",mar: 6.2,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Orkney and Shetland",mp:"Alistair Carmichael",mprev:"Carmichael Alistair",mar: 19.6,reg:"Scotland",party:"Liberal Democrats",prev:"#FDBB30",curr:"#FDBB30",sec:"#FFFF00",prevparty: "Liberal Democrats",secparty:"Scottish National Party"},
{year:"2017",con:"Paisley and Renfrewshire North",mp:"Gavin Newlands",mprev:"Newlands Gavin",mar: 5.61,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Paisley and Renfrewshire South",mp:"Mhairi Black",mprev:"Black Mhairi",mar: 6.09,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Perth and North Perthshire",mp:"Pete Wishart",mprev:"Wishart Pete",mar: 0.04,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"Ross, Skye and Lochaber",mp:"Ian Blackford",mprev:"Blackford Ian",mar: 15.39,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#0087DC",prevparty: "Scottish National Party",secparty:"Conservative"},
{year:"2017",con:"Rutherglen and Hamilton West",mp:"Ged Killen",mprev:"Killen Ged",mar: 0.52,reg:"Scotland",party:"Labour",prev:"#FFFF00",curr:"#DC241f",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"Stirling",mp:"Stephen Kerr",mprev:"Kerr Stephen",mar: 0.3,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"West Aberdeenshire and Kincardine",mp:"Andrew Bowie",mprev:"Bowie Andrew",mar: 15.4,reg:"Scotland",party:"Conservative",prev:"#FFFF00",curr:"#0087DC",sec:"#FFFF00",prevparty: "Scottish National Party",secparty:"Scottish National Party"},
{year:"2017",con:"West Dunbartonshire",mp:"Martin Docherty",mprev:"Docherty Martin",mar: 5.19,reg:"Scotland",party:"Scottish National Party",prev:"#FFFF00",curr:"#FFFF00",sec:"#DC241f",prevparty: "Scottish National Party",secparty:"Labour"},
{year:"2017",con:"Ynys Mon",mp:"Albert Owen",mprev:"Owen Albert",mar: 14.07,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Delyn",mp:"David Hanson",mprev:"Hanson David",mar: 10.76,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Alyn and Deeside",mp:"Mark Tami",mprev:"Tami Mark",mar: 11.7,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Wrexham",mp:"Ian Lucas",mprev:"Lucas Ian",mar: 5.22,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Llanelli",mp:"Nia Griffith",mprev:"Griffith Nia",mar: 29.81,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Gower",mp:"Tonia Antoniazzi",mprev:"Antoniazzi Tonia",mar: 7.17,reg:"Wales",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Swansea West",mp:"Geraint Davies",mprev:"Davies Geraint",mar: 28.43,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Swansea East",mp:"Carolyn Harris",mprev:"Harris Carolyn",mar: 37.45,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Aberavon",mp:"Stephen Kinnock",mprev:"Kinnock Stephen",mar: 50.38,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Cardiff Central",mp:"Jo Stevens",mprev:"Stevens Jo",mar: 42.6,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Cardiff North",mp:"Anna McMorrin",mprev:"McMorrin Anna",mar: 8.02,reg:"Wales",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Rhondda",mp:"Chris Bryant",mprev:"Bryant Chris",mar: 41.74,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2017",con:"Torfaen",mp:"Nick Thomas-Symonds",mprev:"Thomas-Symonds Nick",mar: 26.65,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Monmouth",mp:"David Davies",mprev:"Davies David",mar: 16.5,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Newport East",mp:"Jessica Morden",mprev:"Morden Jessica",mar: 21.74,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Newport West",mp:"Paul Flynn",mprev:"Flynn Paul",mar: 13.03,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Arfon",mp:"Hywel Williams",mprev:"Williams Hywel",mar: 0.33,reg:"Wales",party:"Plaid Cymru",prev:"#008142",curr:"#008142",sec:"#DC241f",prevparty: "Plaid Cymru",secparty:"Labour"},
{year:"2017",con:"Aberconwy",mp:"Guto Bebb",mprev:"Bebb Guto",mar: 1.98,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Clwyd West",mp:"David Jones",mprev:"Jones David",mar: 8.45,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Vale Of Clwyd",mp:"Chris Ruane",mprev:"Ruane Chris",mar: 6.15,reg:"Wales",party:"Labour",prev:"#0087DC",curr:"#DC241f",sec:"#0087DC",prevparty: "Conservative",secparty:"Conservative"},
{year:"2017",con:"Dwyfor Meirionnydd",mp:"Liz Saville Roberts",mprev:"Saville Roberts Liz",mar: 15.98,reg:"Wales",party:"Plaid Cymru",prev:"#008142",curr:"#008142",sec:"#0087DC",prevparty: "Plaid Cymru",secparty:"Conservative"},
{year:"2017",con:"Clwyd South",mp:"Susan Elan Jones",mprev:"Elan Jones Susan",mar: 11.62,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Montgomeryshire",mp:"Glyn Davies",mprev:"Davies Glyn",mar: 26.61,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Ceredigion",mp:"Ben Lake",mprev:"Lake Ben",mar: 0.26,reg:"Wales",party:"Plaid Cymru",prev:"#FDBB30",curr:"#008142",sec:"#FDBB30",prevparty: "Liberal Democrats",secparty:"Liberal Democrats"},
{year:"2017",con:"Preseli Pembrokeshire",mp:"Stephen Crabb",mprev:"Crabb Stephen",mar: 0.74,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Carmarthen West and South Pembrokeshire",mp:"Simon Hart",mprev:"Hart Simon",mar: 7.37,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Carmarthen East and Dinefwr",mp:"Jonathan Edwards",mprev:"Edwards Jonathan",mar: 9.52,reg:"Wales",party:"Plaid Cymru",prev:"#008142",curr:"#008142",sec:"#DC241f",prevparty: "Plaid Cymru",secparty:"Labour"},
{year:"2017",con:"Brecon and Radnorshire",mp:"Chris Davies",mprev:"Davies Chris",mar: 19.45,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#FDBB30",prevparty: "Conservative",secparty:"Liberal Democrats"},
{year:"2017",con:"Neath",mp:"Christina Rees",mprev:"Rees Christina",mar: 32.99,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Cynon Valley",mp:"Ann Clwyd",mprev:"Clwyd Ann",mar: 41.63,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Merthyr Tydfil and Rhymney",mp:"Gerald Jones",mprev:"Jones Gerald",mar: 48.69,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Blaenau Gwent",mp:"Nick Smith",mprev:"Smith Nick",mar: 36.77,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#008142",prevparty: "Labour",secparty:"Plaid Cymru"},
{year:"2017",con:"Bridgend",mp:"Madeleine Moon",mprev:"Moon Madeleine",mar: 10.87,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Ogmore",mp:"Chris Elmore",mprev:"Elmore Chris",mar: 37.28,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Pontypridd",mp:"Owen Smith",mprev:"Smith Owen",mar: 28.7,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Caerphilly",mp:"Wayne David",mprev:"David Wayne",mar: 29.25,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Islwyn",mp:"Chris Evans",mprev:"Evans Chris",mar: 31.62,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Vale Of Glamorgan",mp:"Alun Cairns",mprev:"Cairns Alun",mar: 4.08,reg:"Wales",party:"Conservative",prev:"#0087DC",curr:"#0087DC",sec:"#DC241f",prevparty: "Conservative",secparty:"Labour"},
{year:"2017",con:"Cardiff West",mp:"Kevin Brennan",mprev:"Brennan Kevin",mar: 26.92,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"},
{year:"2017",con:"Cardiff South and Penarth",mp:"Stephen Doughty",mprev:"Doughty Stephen",mar: 29.3,reg:"Wales",party:"Labour",prev:"#DC241f",curr:"#DC241f",sec:"#0087DC",prevparty: "Labour",secparty:"Conservative"}
]

    }
  
}

export default SummaryResults;
