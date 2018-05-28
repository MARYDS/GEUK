//========================================================================
// Buttons to display / hide selection panels
//========================================================================

import React from 'react'
import {render} from 'react-dom'

// Menu buttons for options
class ShowButton extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() {    
      return (
        <button className="resultsSummarySelectButton" onClick={this.props.clickEventHandler}>{this.props.text}</button>
      )
   }
}

class ShowButtons extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() {
          
      var selectYear = "Select Year"
      if (this.props.selectYearDisplayed) {
         selectYear = "Hide Years"
      }
   
      var selectRegions = "Select Regions"
      if (this.props.selectRegionsDisplayed) {
         selectRegions = "Hide Regions"
      } 
     
      var selectParties = "Select Parties"
      if (this.props.selectPartiesDisplayed) {
         selectParties = "Hide Parties"
      }
   
      var selectSortOptions = "Select Sort Options"
      if (this.props.selectSortOptionsDisplayed) {
         selectSortOptions = "Hide Sort Options"
      } 

      return (
         <div className = "resultsSummaryMenuOptions">
              <ShowButton text={selectYear} 
                          clickEventHandler={this.props.selectYearClickHandler} 
                          selectYearDisplayed={this.props.selectYearDisplayed}/>

              <ShowButton text={selectRegions} 
                          clickEventHandler={this.props.selectRegionsClickHandler} 
                          selectRegionsDisplayed={this.props.selectRegionsDisplayed}/>
              <ShowButton text={selectParties} 
                          clickEventHandler={this.props.selectPartiesClickHandler} 
                          selectPartiesDisplayed={this.props.selectPartiesDisplayed}/>
              <ShowButton text={selectSortOptions} 
                          clickEventHandler={this.props.selectSortOptionsClickHandler} 
                          selectSortOptionsDisplayed={this.props.selectSortOptionsDisplayed}/>
          </div>
      )
   }
}

export default ShowButtons;
