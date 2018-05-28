//========================================================================
// Detail results for a constituency
//========================================================================

import React from 'react'
import {render} from 'react-dom'
var $ = require("jquery")
var detailData = require("./detaildata.js");

// Detail results title for a constituency
class DetailResultsTitle extends React.Component {
   constructor(props){
      super(props)
   }  
   render() {    
      return (  
         <div className="detailResultsTitleArea">
            <h3 className="detailResultsTitle">{this.props.selectedConstituencyName}</h3>
         </div>  
      )    
   }
}

// Detail overall results for a constituency - piechart section
class DetailResultsOverallLeft extends React.Component {
   constructor(props){
      super(props) 
      this.updateCanvasLeft = this.updateCanvasLeft.bind(this)
      this.drawSegment = this.drawSegment.bind(this)       
   }
  
   shouldComponentUpdate(nextProps, nextState) {
      return true
   }
  //
   componentDidMount() {
      this.updateCanvasLeft()
   }
  
   componentDidUpdate() {
      this.updateCanvasLeft()
   }
  
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
          this.drawSegment(canvas, ctx, arcSizes[i], colours[i], startingAngle)
          startingAngle += arcSizes[i]
       }  
   }

   drawSegment(canvas, context, arcSize, colour, startingAngle) {
       context.save();
       var centerX = Math.floor(canvas.width / 2)
       var centerY = Math.floor(canvas.height / 2)
       var radius = Math.floor(canvas.width / 2)

       var endingAngle = startingAngle + arcSize

       context.beginPath()
       context.moveTo(centerX, centerY)
       context.arc(centerX, centerY, radius, startingAngle, endingAngle, false)
       context.closePath()

       context.fillStyle = colour
       context.fill()

       context.restore()
   }

   render() {   
      var detailId = "Detail_" + this.props.constitResults.constit
      return ( 
        <div className="detailResultsOverallLeft" id={detailId}>
            <span className="detailResultsOverallText">{this.props.constitResults.year}</span>
            <canvas className="detailResultsOverallCanvas"  ref="canvas" width={120} height={120}/>
        </div>
      )
   }
}

// Detail overall results for a constituency
class DetailResultsOverallCenter extends React.Component {
     constructor(props){
      super(props)
   }
  
   render() { 
      return ( 
         <div className="detailResultsOverallCenter">
             <table>
                <tbody>
                    <tr>
                       <td className="detailResultsOverallText">Electorate:</td>
                       <td className="detailResultsOverallNumber">
                         {this.props.constitResults.overallResults.electorate.toLocaleString()}</td>
                    </tr>
                    <tr>
                       <td className="detailResultsOverallText">Valid votes:</td>
                       <td className="detailResultsOverallNumber">
                         {this.props.constitResults.overallResults.valVotes.toLocaleString()}</td>
                    </tr>
                    <tr>
                       <td className="detailResultsOverallText">Invalid votes:</td>
                       <td className="detailResultsOverallNumber">
                         {this.props.constitResults.overallResults.invalVotes.toLocaleString()}</td>
                    </tr>
                    <tr>
                       <td className="detailResultsOverallText">Turnout %:</td>
                       <td className="detailResultsOverallNumber">
                         {this.props.constitResults.overallResults.toPct.toFixed(1)}</td>
                    </tr>
                    <tr>
                       <td className="detailResultsOverallText">Majority Votes:</td>
                       <td className="detailResultsOverallNumber">
                         {this.props.constitResults.overallResults.majVotes.toLocaleString()}</td>
                  </tr>
                    <tr>
                       <td className="detailResultsOverallText">Majority %:</td>
                       <td className="detailResultsOverallNumber">
                         {this.props.constitResults.overallResults.majPct.toFixed(1)}</td>
                    </tr>
                    <tr>
                       <td className="detailResultsOverallText">Result</td>
                       <td className="detailResultsOverallNumber">
                         {this.props.constitResults.overallResults.resultNarr}</td>
                    </tr>
                </tbody>  
             </table>
         </div> 
      )    
   }
}

// Detail overall results for a constituency - Blank right header
class DetailResultsOverallRight extends React.Component {
   constructor(props){
      super(props) 
      this.updateCanvasRight = this.updateCanvasRight.bind(this)
      this.drawSegment = this.drawSegment.bind(this)       
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
          this.drawSegment(canvas2, ctx, arcSizes[i], colours[i], startingAngle)
          startingAngle += arcSizes[i]
        }
      }

      drawSegment(canvas, context, arcSize, colour, startingAngle) {
         context.save();
         var centerX = Math.floor(canvas.width / 2)
         var centerY = Math.floor(canvas.height / 2)
         var radius = Math.floor(canvas.width / 2)

         var endingAngle = startingAngle + arcSize

         context.beginPath()
         context.moveTo(centerX, centerY)
         context.arc(centerX, centerY, radius, startingAngle, endingAngle, false)
         context.closePath()

         context.fillStyle = colour
         context.fill()

         context.restore()
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

// Detail results heading section for a constituency
class DetailResultsHeading extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() {    
      return (  
         <div className="detailResultsOverall" id="detailResultsOverall">
             <DetailResultsTitle selectedResultsYear={this.props.selectedResultsYear} 
                 selectedConstituencyName = {this.props.selectedConstituencyName}/>
             <div>
                 <DetailResultsOverallLeft constitResults={this.props.constitResults}
                   selectedResultsYear={this.props.selectedResultsYear} />
                 <DetailResultsOverallCenter constitResults={this.props.constitResults} />
                 <DetailResultsOverallRight constitPrevResults={this.props.constitPrevResults}
                   selectedConstituencyName = {this.props.selectedConstituencyName}
                   />
              </div>
          </div>   
        
      )    
   }
}

// Detail candidate result for a constituency
class DetailResultsCandidate extends React.Component {
   constructor(props){
      super(props)
   }
  
   render() {  
      return ( 
        <tbody>
            <tr>               
                <td className="resultsDetailColour" style={{backgroundColor: this.props.candidateResult.colour}}>&nbsp;</td> 
                <td className="resultsDetailCandidate">{this.props.candidateResult.name}</td> 
                <td className="resultsDetailVotes">{this.props.candidateResult.votes.toLocaleString()}</td>
                <td className="resultsDetailShare">{this.props.candidateResult.shrPct.toFixed(1)}</td>
                <td className="resultsDetailChange">{this.props.candidateResult.chgPct.toFixed(1)}</td>
            </tr>
            <tr>
               <td className="resultsDetailColour" style={{backgroundColor: this.props.candidateResult.colour}}>&nbsp;</td>
               <td className="resultsDetailParty">{this.props.candidateResult.party}</td>            
            </tr>
          </tbody>
        )
   }
}

// Detail results for all candidates in constit
class DetailResultsDetails extends React.Component {
     constructor(props){
      super(props)
   }
  
   render() {   
      return (  
         <div className="detailResultsDetails">
             <table className="resultsDetailTable">
                 <thead>
                     <tr>
                         <th>&nbsp;</th>
                         <th className="resultsDetailCandidate">Candidate</th>
                         <th className="resultsDetailVotes">Votes</th>
                         <th className="resultsDetailShare">Share %</th>
                         <th className="resultsDetailChange">Change %</th>
                      </tr>
                  </thead> 
                    {this.props.constitResults.detailResult.map(candRes => 
                         <DetailResultsCandidate candidateResult = {candRes} key={candRes.name} />
                    )} 
                   
              </table> 
          </div>
      )    
   }
}

// Detail results for a constituency
class DetailResults extends React.Component {
   constructor(props){
      super(props)
      this.getResults = this.getResults.bind(this)       
   }
  
   render() {

      // Get all the constituency results
      var allConstituencyResults = this.getResults()

      // Get the results for the required constituency
      var constitResults = allConstituencyResults.filter((result)=> {
         return result.constit == this.props.selectedConstituencyName &&
                result.year == this.props.selectedResultsYear
      })
    
      // Get the results for the previous election if there is one
      var constitPrevResults = []
      var yearPos = this.props.resultYears.map(function(year) {
           return year.year; }).indexOf(this.props.selectedResultsYear);
      yearPos += 1
      while (yearPos < this.props.resultYears.length) {
         constitPrevResults = allConstituencyResults.filter((result)=> {
             return result.constit == this.props.selectedConstituencyName &&
                    result.year == this.props.resultYears[yearPos].year
         }) 
         if (constitPrevResults.length > 0) {break}
         yearPos += 1;
      }
      if (constitPrevResults.length == 0) {
         constitPrevResults = [{
           constit: this.props.selectedConstituencyName,
           year: '', 
           overallResults: {}, 
           detailResult:  [ ]
         }]
      }

      // We have results for the constituency, output them     
      if (constitResults.length > 0) {
         return ( 
           <div className="detailResultsArea" id="detailResultsArea">   
              <DetailResultsHeading selectedResultsYear={this.props.selectedResultsYear} 
                  selectedConstituencyName = {this.props.selectedConstituencyName} 
                  constitResults={constitResults[0]}
                  constitPrevResults={constitPrevResults[0]}
              />
              <DetailResultsDetails selectedResultsYear={this.props.selectedResultsYear} 
                  selectedConstituencyName = {this.props.selectedConstituencyName} 
                  constitResults={constitResults[0]}
           />
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
       return detailData
   }       

}


// JQuery to keep details for constituency on screen when scrolling
	$().ready(function() {
		  var $scrollingDiv = $("#detailResultsArea");
    
      $(window).scroll(function(){	
			$scrollingDiv
				.stop()
        .animate({"marginTop": ($(window).scrollTop()) + "px"}, 300);	
				//.animate({"marginTop": ($(window).scrollTop()) + "px"}, 300);			
		  });
	}); 

export default DetailResults;