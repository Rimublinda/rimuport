function formatSheets(sheets) {
    let ArrNames = [];
    let rows = sheets["table"]["rows"];
    ArrNames.push(rows[1]["c"][0]["v"]);
    for (const key in sheets["table"]["rows"]) {
        if (rows.hasOwnProperty.call(rows, key)) {
            const el = rows[key];
            el["c"][1]["v"] == 'lista' ? '' : ArrNames.push(el["c"][1]["v"]);
        }
    }
    let title = ArrNames.shift();
    return {
        list: ArrNames,
        title
    };
}

async function GetSheets(id) {
    const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json`
    let sheets = await fetch(url)
        .then(res => res.text())
        .then(text => JSON.parse(text.substr(47).slice(0, -2)))
    return sheets;
}

function linkFormated(link) {
    let separateLink = link.split('/');
    return separateLink[5];
}

async function convertSheets(value) {
    let linkFormat = await linkFormated(value);
    let GetSheet = await GetSheets(linkFormat);
    let formatedSheets = formatSheets(GetSheet);
    return formatedSheets;
}

export default convertSheets;