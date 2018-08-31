//========================================================================
// Display pie-chart of previous election results for constituency
// (Invoked from DetailResultsHeading)
//========================================================================
import React from 'react'
import drawPieChartSegment from '../helper/drawPieChartSegment.js';

// Pie chart of previous election results for comparison
class DetailResultsHeadingRight extends React.Component {
    constructor(props){
       super(props) 
       this.updateCanvasRight = this.updateCanvasRight.bind(this)
    }
   
    shouldComponentUpdate(nextProps, nextState) {
       return true
    }
   
    componentDidMount() {
       this.updateCanvasRight()
    }
   
    componentDidUpdate() {
       this.updateCanvasRight()
    }
  
    updateCanvasRight() {
       const canvas2 = this.refs.canvas2
       const ctx = canvas2.getContext('2d')
       ctx.clearRect(0, 0, canvas2.width, canvas2.height)
       ctx.restore()
 
       var arcSizes = []
       var colours = []
       var valVotes = this.props.constitPrevResults.overallResults.valVotes
        
       for (var i=0; i< this.props.constitPrevResults.detailResult.length; i++) {
           var candidateResult = this.props.constitPrevResults.detailResult[i]
           // Angle required in radians for segment
           arcSizes[i] = (candidateResult.votes * (360 / valVotes)) * Math.PI/180
           // Colour for segment
           colours[i] = candidateResult.colour
        }
      
        var startingAngle = 270 * Math.PI/180
        for (var i=0; i<arcSizes.length; i++) {
           drawPieChartSegment(canvas2, ctx, arcSizes[i], colours[i], startingAngle)
           startingAngle += arcSizes[i]
         }
       }
 
       render() {   
          var detailId = "Detail_" + this.props.selectedConstituencyName + "prev"
 
          return ( 
            <div className="detailResultsOverallRight" id={this.detailId}>
                <span className="detailResultsOverallText">{this.props.constitPrevResults.year}</span>
                <canvas className="detailResultsOverallCanvas"  ref="canvas2" width={120} height={120}/>
            </div>
          )
       }
 }

 export default DetailResultsHeadingRight