//========================================================================
// EU referendum results for a constituency
//========================================================================

import React from 'react'
import {render} from 'react-dom'
var euRefData = require("./eurefdata.js")

// Detail local authority result for a constituency
class EURefResultsLocAuth extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() { 
      var resultColour  
      if (this.props.locAuthResult.remain > this.props.locAuthResult.leave) {
          resultColour = '#FCC822'
      } else {
          resultColour = '#0069b5'
      }
      return ( 
        <tbody>
            <tr>  
                <td className="euResultsColour" style={{backgroundColor: resultColour}}>&nbsp;</td>
                <td className="euResultsLocAuth">{this.props.locAuthResult.name}&nbsp;{this.props.locAuthResult.wards}</td>
                <td className="euResultsElectorate">{this.props.locAuthResult.electorate.toLocaleString()}</td>
                <td className="euResultsTurnoutPct">{this.props.locAuthResult.topct.toLocaleString()}</td>
                <td className="euResultsRemainVotes">{this.props.locAuthResult.remain.toLocaleString()}</td>
                <td className="euResultsRemainPct">{this.props.locAuthResult.remainpct.toLocaleString()}</td>
                <td className="euResultsLeaveVotes">{this.props.locAuthResult.leave.toLocaleString()}</td>
                <td className="euResultsLeavePct">{this.props.locAuthResult.leavepct.toLocaleString()}</td>
             </tr>
          </tbody>
        )
   }
}

// EU referendum results heading section for a constituency
class EURefResultsHeading extends React.Component {
    constructor(props){
      super(props)
   }
  
   render() {   
      return (  
         <thead>
            <tr>
                <th className="euResultsColour">&nbsp;</th>
                <th className="euResultsLocAuth">Local Authority (wards)</th>
                <th className="euResultsElectorate">Electorate</th>
                <th className="euResultsTurnoutPct">Turnout %</th>
                <th className="euResultsRemainVotes">Remain</th>
                <th className="euResultsRemainPct">Remain %</th>
                <th className="euResultsLeaveVotes">Leave</th>
                <th className="euResultsLeavePct">Leave %</th>
            </tr>
         </thead> 
      )    
   }
}

// EU Referendum results for a constituency
class EURefResults extends React.Component {
    constructor(props){
       super(props)
       this.getResults = this.getResults.bind(this)       
    }
  
   render() {

      // Get all the EU referendum results
      var allEURefResults = this.getResults()

      // Get the results for the required constituency
      var constitEUResults = allEURefResults.filter((result)=> {
         return result.constit == this.props.selectedConstituencyName 
      })

      // We have results for the constituency, output them     
      if (constitEUResults.length > 0) {
         return (  
            <div className="euResultsDetails">
                <span className="euResultTitle">EU Referendum</span>
                <table className="euResultsDetailTable"> 
                    <EURefResultsHeading />
                    {constitEUResults[0].locAuthResults.map(locAuth => 
                        <EURefResultsLocAuth locAuthResult = {locAuth} key={locAuth.name} />
                    )}                                 
                </table> 
            </div>
         ) 
      } else {
           return ( 
             <div>
             </div>
           )
      }
   }     
        
   getResults() {
       return euRefData
   }       

}

export default EURefResults;