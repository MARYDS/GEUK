
//========================================================================
// Search box
//========================================================================
import React from 'react'
import {render} from 'react-dom'

// Search box area
class Search extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() {
      return ( 
         <div className = "resultsSummarySearchArea">
            <form>
                <input type="text" className="resultsSummarySearchBox" 
                       placeholder="Search" 
                       onChange={this.props.searchChangeHandler}
                       value = {this.props.searchTerm}/>
            </form>
         </div>
     )
   }
}

export default Search;