//========================================================================
// Display pie-chart of current election results for constituency
// (Invoked from DetailResultsHeading)
//========================================================================
import React from 'react'
import drawPieChartSegment from '../helper/drawPieChartSegment.js';

// Detail overall results for a constituency - piechart section
class DetailResultsHeadingLeft extends React.Component {
    constructor(props){
       super(props) 
       this.updateCanvasLeft = this.updateCanvasLeft.bind(this)
    }
   
    shouldComponentUpdate(nextProps, nextState) {
       return true
    }
   
    componentDidMount() {
       this.updateCanvasLeft()
    }
   
    componentDidUpdate() {
       this.updateCanvasLeft()
    }
   
    // Pie chart of current election result
    updateCanvasLeft() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        var arcSizes = []
        var colours = []
        var valVotes = this.props.constitResults.overallResults.valVotes
        
        for (var i=0; i< this.props.constitResults.detailResult.length; i++) {
           var candidateResult = this.props.constitResults.detailResult[i]
           // Angle required in radians for segment
           arcSizes[i] = (candidateResult.votes * (360 / valVotes)) * Math.PI/180
           // Colour for segment
           colours[i] = candidateResult.colour
        }
      
        var startingAngle = 270 * Math.PI/180
        for (var i=0; i<arcSizes.length; i++) {
           drawPieChartSegment(canvas, ctx, arcSizes[i], colours[i], startingAngle)
           startingAngle += arcSizes[i]
        }  
    }
 
    render() {   
       var detailId = "Detail_" + this.props.constitResults.constit
       return ( 
         <div className="detailResultsOverallLeft" id={detailId}>
             <span className="detailResultsOverallText">{this.props.constitResults.year}</span>
             <canvas className="detailResultsOverallCanvas"  ref="canvas" width="100" height="100" />
         </div>
       )
    }
 }

 export default DetailResultsHeadingLeft