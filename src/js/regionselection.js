//========================================================================
// Region Selection
//========================================================================

// Checkbox in region selection area
class RegionItem extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() {
      return (
         <span className="resultsSummaryRegionField">
              <input type="checkbox" name="regions" 
                     onChange={this.props.regionChangeHandler}
                     value={this.props.region.regionName} 
                     checked={this.props.region.checked} 
                />             
          {this.props.region.regionName}
         </span>
      )
   }
}        

// Region selection checkboxes 
export class RegionSelection extends React.Component {
   constructor(props){
      super(props)
   }

   render() {
     
      if (this.props.selectRegionsDisplayed){
         return ( 
            <div className="resultsSummaryRegionArea">
               <form>
                   <fieldset className="resultsSummaryRegionFieldset">
                       <div className="resultsSummaryRegionButtons">
                          <button type="button" className="resultsSummaryRegionButton"
                              onClick={this.props.regionClearAllHandler}>
                              Clear All
                          </button>    
                          <button type="button" className="resultsSummaryRegionButton"
                              onClick={this.props.regionSelectAllHandler}>
                              Select All
                          </button>
                       </div>
                       {this.props.regions.map( region => 
                           <RegionItem region={region} key={region.regionName} 
                           regionChangeHandler = {this.props.regionChangeHandler}/>
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

export default RegionSelection
