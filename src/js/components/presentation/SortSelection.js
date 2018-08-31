//========================================================================
// Sort Order Selection
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'
import SortItem from './SortItem.js'

// Sort options selection
class SortSelection extends React.Component {
   constructor(props){
      super(props)
   }
   render() {
      if (this.props.selectSortOptionsDisplayed){
         return ( 
            <div className="resultsSummarySortArea">
               <form>
                  <fieldset>
                      <span  className="resultsSummarySortAreaText">
                         <p>Drag sort items into the required sort order, click for ascending/descending</p>
                      </span>
                          {this.props.sortOrder.map( sortItem => 
                                <SortItem sortItem={sortItem} 
                                          key = {sortItem.itemName} 
                                          sortOrderChangeHandler={this.props.sortOrderChangeHandler}
                                          sortOrderClickHandler={this.props.sortOrderClickHandler}
                                />
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

export default SortSelection;