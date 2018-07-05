//========================================================================
// Party Selection
//========================================================================

import React from 'react'
import {render} from 'react-dom'

// Checkbox in party selection area
class PartyItem extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() {
      return (
         <label className="resultsSummaryPartyField">
              <input type="checkbox" name="parties" 
                     onChange={this.props.partyChangeHandler}
                     value={this.props.party.partyName} 
                     checked={this.props.party.checked} 
                />             
          {this.props.party.partyName}
         </label>
      )
   }
}        

// Party selection checkboxes 
class PartySelection extends React.Component {
   constructor(props){
      super(props)
   }
   render() {     
      if (this.props.selectPartiesDisplayed) {
         return ( 
            <div className="resultsSummaryPartyArea">
               <form>
                   <fieldset className="resultsSummaryPartyFieldset">
                      <div className="resultsSummaryPartyButtons">
                          <button type="button" className="resultsSummaryPartyButton"
                              onClick={this.props.partyClearAllHandler}>
                              Clear All
                          </button>    
                          <button type="button" className="resultsSummaryPartyButton"
                              onClick={this.props.partySelectAllHandler}>
                              Select All
                          </button>
                       </div>

                       {this.props.parties.map( party => 
                           <PartyItem party={party} key={party.partyName} 
                           partyChangeHandler = {this.props.partyChangeHandler}/>
                       )}                   
                    </fieldset>
               </form>
           </div>
        )
      } else {
        return null
      }  
   }
}

export default PartySelection;