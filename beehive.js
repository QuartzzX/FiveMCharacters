// noinspection JSUnusedGlobalSymbols

console.log(Website.Info.Crystal)


/**
 Get the formatted priors of a character from JSON.
 @param character - The path to the JSON character to get priors of.
 */
function getPriors(character) {
    return (character.priors.length === 0) ? "No Priors." : "Priors for: " + character.priors.join(", ") + "."
}

/**
 Get the formatted warrants of a character from JSON.
 @param character - The path to the JSON character to get warrants of.
 */
function getWarrants(character) {
    return (character.warrants.length === 0) ? "No Active Warrants." : "Active Warrant(s): " + character.warrants.join(", ") + "."
}

/**
 Get the formatted boolean of whether a character is known to police from JSON.
 @param character - The path to the JSON character to get the known status of.
 */
function getIsKnownToPolice(character) {
    return (character.knownToPolice) ? "Known To Police" : "Not Known to Police" + "."
}


/**
 * Gets the notes of a character from JSON.
 * @param character - The path to the JSON character to get the note of.
 */
function getNotes(character) {
    return (character.notes.join("<br>")) + "."
}

function getCharacterByName(name) {
    for (const character of Website.Info.Beehive) {
        if (character.name === name) {
            return character
        }
    }
}

Website.Info.Beehive.forEach((character) => {
    document.getElementById("select").innerHTML += "<option>" + character.name + "</option>"
})



function update() {
    let select = document.getElementById("select")
    let option = select.options[select.selectedIndex]
    if (option.value === "Select Character") {
        document.getElementById("civ-information").innerHTML = "No Information"
        document.getElementById("civ-notes").innerHTML = "No Notes"
        document.getElementById("civ-command").innerHTML = ""
        return;

    }
    let character = getCharacterByName(option.value)
    document.getElementById("civ-information").innerHTML = "Address: " + character.address.postal + ", " + character.address.roadName + ", " + character.address.area + ", " + character.address.city + "<br>" + "Date of Birth: " + character.birthday + "<br>" + getPriors(character) + "<br>" + getWarrants(character) + "<br>" + getIsKnownToPolice(character) + "<br>" + character.licence
    document.getElementById("civ-notes").innerHTML = getNotes(character)
    document.getElementById("civ-command").innerHTML = (`/do QP '${character.name}': Lives at ${character.address.postal}, ${character.address.roadName}, ${character.address.area}, ${character.address.city}. Born on ${character.birthday}. ${getPriors(character)} ${getWarrants(character)} ${getIsKnownToPolice(character)} ${character.licence} .`)

}
