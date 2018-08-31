//========================================================================
// Display detail results for one constituency 
//========================================================================
import React from 'react'
import DetailResultsHeading from './DetailResultsHeading.js';
import DetailResultsConstituency from './DetailResultsConstituency.js';
import EURefResults from '../container/EURefResults.js';

var $ = require("jquery")

// Detail results for a constituency
class DetailResults extends React.Component {
   constructor(props){
      super(props)      
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

      var selectedConstituency = this.props.selectedConstituencyName
      var selectedResultsYear = this.props.selectedResultsYear

      // Get the results for the required constituency
      var constitResults = this.props.detailResults.filter((result)=> {
         return result.constit == selectedConstituency &&
                result.year == selectedResultsYear
      })
    
      // Get the results for the previous election if there is one
      var constitPrevResults = []
      var yearPos = this.props.resultYears.map(function(year) {
           return year.year; }).indexOf(selectedResultsYear);
      yearPos += 1
      while (yearPos < this.props.resultYears.length) {
         constitPrevResults = this.props.detailResults.filter((result)=> {
             return result.constit == selectedConstituency &&
                    result.year == this.props.resultYears[yearPos].year
         }) 
         if (constitPrevResults.length > 0) {break}
         yearPos += 1;
      }
      if (constitPrevResults.length == 0) {
         constitPrevResults = [{
           constit: selectedConstituency,
           year: '', 
           overallResults: {}, 
           detailResult:  [ ]
         }]
      }

      // We have results for the constituency, output them     
      if (constitResults.length > 0) {
         return ( 
           <section className="detailResultsArea" id="detailResultsArea">   
              <DetailResultsHeading year = {selectedResultsYear} 
                  constituency = {selectedConstituency} 
                  constitResults = {constitResults[0]}
                  constitPrevResults = {constitPrevResults[0]}
              />
              <DetailResultsConstituency selectedResultsYear={selectedResultsYear} 
                  constituency = {selectedConstituency} 
                  detailResults={constitResults[0].detailResult}
              />
              <EURefResults constituency = {selectedConstituency}/>
           </section>
         ) 
      } else {
           return ( 
             <div>
             </div>
           )
      }
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