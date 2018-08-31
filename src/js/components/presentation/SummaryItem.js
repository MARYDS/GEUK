//========================================================================
// Results for one Constituency in the Summary Results section
// (Invoked from SummaryResults)
//========================================================================
import React from 'react'

// Summary results one constituency result row
const SummaryItem = ({
    conRes,
    clickEventHandler
}) => {
    return (
        <tbody>
            <tr onClick={clickEventHandler} id={conRes.con}>
                <td className="summListL1 summListPrev1"
                    style={{ backgroundColor: conRes.prev }}
                    title={"Previous: " + conRes.prevparty}>
                    &nbsp;
               </td>
                <td className="summListL1 summListCon" >
                    {conRes.con}
                </td>
                <td className="summListL1 summListCurr1"
                    style={{ backgroundColor: conRes.curr }}
                    title={"Current: " + conRes.party}>
                    &nbsp;
               </td>
                <td className="summListL1 summListMP">
                    {conRes.mp}
                </td>
                <td className="summListL1 summListMar">
                    {conRes.mar.toFixed(1)}
                </td>
                <td className="summListL1 summListSec1"
                    style={{ backgroundColor: conRes.sec }}
                    title={"Second Party: " + conRes.secparty}>
                    &nbsp;
               </td>
            </tr>
            <tr onClick={clickEventHandler} id={conRes.con}>
                <td className="summListL2 summListPrev2"
                    style={{ backgroundColor: conRes.prev }}
                    title={"Previous: " + conRes.prevparty}>
                    &nbsp;
               </td>
                <td className="summListL2 summListReg">
                    {conRes.reg}
                </td>
                <td className="summListL2 summListCurr2"
                    style={{ backgroundColor: conRes.curr }}
                    title={"Current: " + conRes.party}>
                    &nbsp;
               </td>
                <td className="summListL2 summListParty">
                    {conRes.party}
                </td>
                <td className="summListL2 summListEmpty">
                    &nbsp;
               </td>
                <td className="summListL2 summListSec2"
                    style={{ backgroundColor: conRes.sec }}
                    title={"Second Party: " + conRes.secparty}>
                    &nbsp;
               </td>
            </tr>
        </tbody>
    )
}

export default SummaryItem