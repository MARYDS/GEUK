//========================================================================
// Detail results for a constituency
//========================================================================

import React from 'react'
import {render} from 'react-dom'
import EURefResults from './euref.js';
var $ = require("jquery")
var detailData = require("./detaildata.js")
var images = require.context('../../images', true);


// Detail results title for a constituency
class DetailResultsTitle extends React.Component {
   constructor(props){
      super(props)
   }  
   render() {  
      var wikiArticle = "https://en.wikipedia.org/wiki/" + this.props.selectedConstituencyName.replace(" ", "_") + "_(UK_Parliament_constituency)"

      return (  
         <div className="detailResultsTitleArea">
            <h3 className="detailResultsTitle"><a href={wikiArticle} target="_blank">{this.props.selectedConstituencyName}</a></h3>
         </div>  
      )    
   }
}

function DrawPieChartSegment(canvas, context, arcSize, colour, startingAngle) {
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

// Detail overall results for a constituency - piechart section
class DetailResultsOverallLeft extends React.Component {
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
          DrawPieChartSegment(canvas, ctx, arcSizes[i], colours[i], startingAngle)
          startingAngle += arcSizes[i]
       }  
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

// Pie chart of previous election results for comparison
class DetailResultsOverallRight extends React.Component {
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
          DrawPieChartSegment(canvas2, ctx, arcSizes[i], colours[i], startingAngle)
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
      var photoId = "Photo" + this.props.candidateResult.name
      var photoImg = images("./blank.jpg") 
      if (this.props.candidateResult.photo == "Y") {
          photoImg = images("./" + this.props.candidateResult.name + "_" + this.props.selectedConstituencyName + ".jpg")  
      }
      var wikiLink = "javascript:void(0);"
      var linkClass = "resultsDetailCandidateNoLink"
      if (this.props.candidateResult.wiki && this.props.candidateResult.wiki != "") {
        wikiLink = "https://en.wikipedia.org/wiki/" + this.props.candidateResult.wiki
        linkClass = "resultsDetailCandidateLink" 
      }
      return ( 
        <tbody>
            <tr>               
                <td className="resultsDetailColour" style={{backgroundColor: this.props.candidateResult.colour}}>&nbsp;</td> 
                <td className="resultsDetailCandidate"><a href={wikiLink} target="_blank" className={linkClass}>{this.props.candidateResult.name}</a></td> 
                <td className="resultsDetailPhoto" id={photoId} rowSpan="2"><img src={photoImg} height="50" width="50" alt=""/></td> 
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

// Detail results for all candidates in constituency
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
                         <th className="resultsDetailPhoto">&nbsp;</th>
                         <th className="resultsDetailVotes">Votes</th>
                         <th className="resultsDetailShare">Share %</th>
                         <th className="resultsDetailChange">Change %</th>
                      </tr>
                  </thead> 
                    {this.props.constitResults.detailResult.map(candRes => 
                         <DetailResultsCandidate 
                              candidateResult = {candRes}  
                              selectedConstituencyName = {this.props.selectedConstituencyName} 
                              key={candRes.name} />
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
  
   componentDidUpdate() {
      var $scrollingDiv = $("#detailResultsArea");
    
      var scrollToPos 
      if ($(window).scrollTop() > $('#mainTitleArea').height()) {
          scrollToPos = $(window).scrollTop()
              //scrollToPos = $(window).scrollTop() - $('#mainTitleArea').height()
      } else {
          scrollToPos = 0
      }

      $scrollingDiv
         .stop()
         .animate({"marginTop": (scrollToPos) + "px"}, 300);				
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
           <section className="detailResultsArea" id="detailResultsArea">   
              <DetailResultsHeading selectedResultsYear={this.props.selectedResultsYear} 
                  selectedConstituencyName = {this.props.selectedConstituencyName} 
                  constitResults={constitResults[0]}
                  constitPrevResults={constitPrevResults[0]}
              />
              <DetailResultsDetails selectedResultsYear={this.props.selectedResultsYear} 
                  selectedConstituencyName = {this.props.selectedConstituencyName} 
                  constitResults={constitResults[0]}
              />
              <EURefResults selectedConstituencyName = {this.props.selectedConstituencyName}/>
           </section>
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


// JQuery to keep details for constituency on screen when scrolling back up
$().ready(function() {
          var $scrollingDiv = $("#detailResultsArea");
    
      $(window).scroll(function(){
 
            var scrollToPos 
            if (parseInt($scrollingDiv.css("marginTop")) > $(window).scrollTop()) {
                if ($(window).scrollTop() > $('#mainTitleArea').height()) {
                   scrollToPos = $(window).scrollTop()
                } else {
                    scrollToPos = 0
                }
            }

			$scrollingDiv
				.stop()
                .animate({"marginTop": (scrollToPos) + "px"}, 300);				
	   });
}); 

export default DetailResults;