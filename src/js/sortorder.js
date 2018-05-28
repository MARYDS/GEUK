//========================================================================
// Sort Order Selection
//========================================================================

// One sort item
class SortItemSummary extends React.Component {
   constructor(props){
      super(props)
      this.allowDrop = this.allowDrop.bind(this)
      this.handleDrag = this.handleDrag.bind(this)
   }

  allowDrop(event) {
     event.preventDefault();
  }
  handleDrag(event) {
     event.dataTransfer.setData("text", event.target.id)
     event.dataTransfer.dropEffect = "move"
     event.target.style.opacity = '0.4'
  }
  
   render() {
      var asc
      if (this.props.sortItem.ascending) {
        asc = '\u25B2'
      } else {
        asc = '\u25BC'
      }
      return (
         <span>
            <button type="button" id={this.props.sortItem.itemName} className="resultsSummarySortButton" 
                    onClick={this.props.sortOrderClickHandler} onDrop={this.props.sortOrderChangeHandler} onDragOver={this.allowDrop} 
                    draggable={true} onDragStart={this.handleDrag}>
               {this.props.sortItem.itemName}&nbsp;{asc}
            </button>
         </span>
      )
   }
}

// Sort options selection
class SortOrderSelection extends React.Component {
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
                      <SortItemSummary sortItem={sortItem} key = {sortItem.itemName} 
                           sortOrderChangeHandler={this.props.sortOrderChangeHandler}
                           sortOrderClickHandler={this.props.sortOrderClickHandler}/>
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

export default SortOrderSelection;
