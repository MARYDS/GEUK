//========================================================================
// Year Selection
//========================================================================

import React from 'react'
import {render} from 'react-dom'

// Radio buttion in year selection area
class YearItem extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() {
      return (
         <label className="resultsSummaryYearField">
              <input type="radio" name="year" 
                     onChange={this.props.yearChangeHandler}
                     value={this.props.year.year} 
                     checked={this.props.year.checked} 
                />             
          {this.props.year.year}
         </label>
      )
   }
}        

// Year selection radio buttons 
export class YearSelection extends React.Component {
   constructor(props){
      super(props)
   }

   render() {
     
      if (this.props.selectYearDisplayed){
         return ( 
            <div className="resultsSummaryYearArea">
               <form>
                   <fieldset className="resultsSummaryYearFieldset">
                       {this.props.years.map( year => 
                           <YearItem year={year} key={year.year} 
                           yearChangeHandler = {this.props.yearChangeHandler}/>
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

export default YearSelection
