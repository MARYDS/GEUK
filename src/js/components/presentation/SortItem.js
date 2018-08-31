//========================================================================
// One button when choosing which the sort order of the summary list
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'

// One sort item
class SortItem extends React.Component {
    constructor(props){
       super(props)
       this.allowDrop = this.allowDrop.bind(this)
       this.handleDrag = this.handleDrag.bind(this)
       this.handleDragEnd = this.handleDragEnd.bind(this)
    }
 
    allowDrop(event) {
       event.preventDefault();
    }
    handleDrag(event) {
       event.dataTransfer.setData("text", event.target.id)
       event.dataTransfer.dropEffect = "move"
       event.target.style.opacity = '0.4'
    }
    handleDragEnd(event) {
       event.target.style.opacity = '1.0'
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
             <button type="button" id={this.props.sortItem.itemName} 
                     className="resultsSummarySortButton" 
                     onClick={this.props.sortOrderClickHandler} 
                     onDrop={this.props.sortOrderChangeHandler} 
                     onDragOver={this.allowDrop} 
                     draggable={true} onDragStart={this.handleDrag} 
                     onDragEnd={this.handleDragEnd}
             >
                {this.props.sortItem.itemName}&nbsp;{asc}
             </button>
          </span>
       )
    }
 }

 export default SortItem