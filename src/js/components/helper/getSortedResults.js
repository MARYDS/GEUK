const getSortedResults = (
    results,
    sortOrder
) => {
     var sortedResults = results.sort((a, b) => {

        var res = [0, 0, 0, 0, 0, 0, 0]
        for (var i = 0; i < sortOrder.length; i++) {

            switch (sortOrder[i].itemName) {

                case "Region":
                    if (sortOrder[i].ascending) {
                        res[i] = a.reg < b.reg ? -1 : a.reg > b.reg ? 1 : 0;
                    } else {
                        res[i] = a.reg > b.reg ? -1 : a.reg < b.reg ? 1 : 0;
                    }
                    break;

                case "Constituency":
                    if (sortOrder[i].ascending) {
                        res[i] = a.con < b.con ? -1 : a.con > b.con ? 1 : 0;
                    } else {
                        res[i] = a.con > b.con ? -1 : a.con < b.con ? 1 : 0;
                    }
                    break;

                case "Party":
                    if (sortOrder[i].ascending) {
                        res[i] = a.party < b.party ? -1 : a.party > b.party ? 1 : 0;
                    } else {
                        res[i] = a.party > b.party ? -1 : a.party < b.party ? 1 : 0;
                    }
                    break;

                case "MP":
                    if (sortOrder[i].ascending) {
                        res[i] = a.mprev < b.mprev ? -1 : a.mprev > b.mprev ? 1 : 0;
                    } else {
                        res[i] = a.mprev > b.mprev ? -1 : a.mprev < b.mprev ? 1 : 0;
                    }
                    break;

                case "Prev_Party":
                    if (sortOrder[i].ascending) {
                        res[i] = a.prevparty < b.prevparty ? -1 : a.prevparty > b.prevparty ? 1 : 0;
                    } else {
                        res[i] = a.prevparty > b.prevparty ? -1 : a.prevparty < b.prevparty ? 1 : 0;
                    }
                    break;

                case "2nd_Party":
                    if (sortOrder[i].ascending) {
                        res[i] = a.secparty < b.secparty ? -1 : a.secparty > b.secparty ? 1 : 0;
                    } else {
                        res[i] = a.secparty > b.secparty ? -1 : a.secparty < b.secparty ? 1 : 0;
                    }
                    break;

                case "Margin":
                    if (sortOrder[i].ascending) {
                        res[i] = parseFloat(a.mar) < parseFloat(b.mar) ? -1 :
                            parseFloat(a.mar) > parseFloat(b.mar) ? 1 : 0;
                    } else {
                        res[i] = parseFloat(a.mar) > parseFloat(b.mar) ? -1 :
                            parseFloat(a.mar) < parseFloat(b.mar) ? 1 : 0;
                    }
                    break;
            } // switch
        } // for

        return (res[0] || res[1] || res[2] || res[3] || res[4])
    }) // sort

    return sortedResults
}

export default getSortedResults