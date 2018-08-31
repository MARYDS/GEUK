//========================================================================
// Display summary overall results for constituency
// (Invoked from DetailResultsHeading)
//========================================================================
import React from 'react'

// Detail overall results for a constituency
const DetailResultsHeadingCenter = ({
    overallResults
}) => {
     return ( 
        <div className="detailResultsOverallCenter">
            <table>
               <tbody>
                   <tr>
                      <td className="detailResultsOverallText">Electorate:</td>
                      <td className="detailResultsOverallNumber">
                        {overallResults.electorate.toLocaleString()}</td>
                   </tr>
                   <tr>
                      <td className="detailResultsOverallText">Valid votes:</td>
                      <td className="detailResultsOverallNumber">
                        {overallResults.valVotes.toLocaleString()}</td>
                   </tr>
                   <tr>
                      <td className="detailResultsOverallText">Invalid votes:</td>
                      <td className="detailResultsOverallNumber">
                        {overallResults.invalVotes.toLocaleString()}</td>
                   </tr>
                   <tr>
                      <td className="detailResultsOverallText">Turnout %:</td>
                      <td className="detailResultsOverallNumber">
                        {overallResults.toPct.toFixed(1)}</td>
                   </tr>
                   <tr>
                      <td className="detailResultsOverallText">Majority Votes:</td>
                      <td className="detailResultsOverallNumber">
                        {overallResults.majVotes.toLocaleString()}</td>
                 </tr>
                   <tr>
                      <td className="detailResultsOverallText">Majority %:</td>
                      <td className="detailResultsOverallNumber">
                        {overallResults.majPct.toFixed(1)}</td>
                   </tr>
                   <tr>
                      <td className="detailResultsOverallText">Result</td>
                      <td className="detailResultsOverallNumber">
                        {overallResults.resultNarr}</td>
                   </tr>
               </tbody>  
            </table>
        </div> 
     )    
  }

export default DetailResultsHeadingCenter