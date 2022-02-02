const search = document.getElementById("search")
const changes = document.getElementById("changes")

const searchState = async searchText => {
    const res = await fetch("../js/data.json")
    const states = await res.json()

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`,`gi`)
        return state.name.match(regex) || state.abbr.match(regex) 
    })
    
    if (searchText.length == 0) {
        return []
    }
    
    outPutHtml(matches)
} 

const outPutHtml = matches => {
    const html = matches.map(match => `
    <div class="results">
        <div class="name"> ${match.name} (${match.abbr}) <span class="cap">${match.capital}</span></div>
        <div class="let"> lat: ${match.lat} / long: ${match.long}</div>
    </div>
    `).join("")

    changes.innerHTML = html
}

search.addEventListener("input", () => searchState(search.value) )


