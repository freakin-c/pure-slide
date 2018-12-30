// Global Variables

var modal = document.querySelector(".modal")

var cardContents = null;
var currentContentId = 0;

// EventListeners
// --------------

// Toggle the Modal
function toggleModal() {
    modal.classList.toggle("is-active")

    if (modal.classList.contains("is-active")) {
        cleanUpModalContent()
        setModalContent(0)
    }

    // toggle  `keydown` eventListener alongside with modal
    modal.classList.contains("is-active") ?
        document.addEventListener("keydown", escapeModal) :
        document.removeEventListener("keydown", escapeModal)
}

// Iterate the Modal Cards
function iterateCardContent(forward = true) {
    cleanUpModalContent()

    var nextContent = currentContentId
    forward ? nextContent++ : nextContent--

    if ( nextContent === cardContents.length ){
        toggleModal()
        return
    }

    if ( nextContent < 0 ) {
        nextContent += cardContents.length
    }

    setModalContent(nextContent)

}

// Count next card button *hovers*
var countNextButtonHovers = 0
function hoverCardNext( e ) {
    console.log( "Hovered: #" + (++countNextButtonHovers) )
}

// Register EventListeners
// -----------------------
//
// Set event listeners calling appropriate function
// for all elements with given class.
// Commonly used events are `click` and `keydown`

// Buttons to toggle Modal visibility
var modalToggleButtons = document.querySelectorAll(".toggle-modal")
modalToggleButtons.forEach(
    function(currentValue, currentIndex, listObj) {
        listObj[currentIndex].addEventListener("click", toggleModal)
    })

// Modal 'next' buttons to iterate the modal cards
var modalCardNextButton = document.querySelector(".modal-card-button.next")
modalCardNextButton.addEventListener("click", iterateCardContent)
modalCardNextButton.addEventListener("mouseenter", hoverCardNext)

// Escape Key to close modal
function escapeModal( e ) {
    if ( modal.classList.contains("is-active") && e.key === "Escape" ) {
        console.log( "Active modal escaped" )
        toggleModal()
    }
}
document.addEventListener("keydown", escapeModal)

// Modal Content
//
function setModalContent(contentId) {
    if ( currentContentId !== contentId ){
        currentContentId = contentId
    }

    content = cardContents[contentId]
    cardTitle.innerHTML = content.title
    cardLead.innerHTML = content.lead
    cardBodyContent.innerHTML = content.body.join('\n')
    cardNextButton.innerHTML = content.next.label

    if ( content.next.classes ) {
        for ( var i = 0; i < content.next.classes.length; i++ ) {
            cardNextButton.classList.add( content.next.classes[i] )
        }
    }
}

function cleanUpModalContent() {
    content = cardContents[currentContentId]
    if ( content.next.classes ){
        for ( var i = 0; i < content.next.classes.length; i++ ) {
            cardNextButton.classList.remove(content.next.classes[i])
        }
    }
}

cardTitle = modal.querySelector('.modal-card-title')
cardLead = modal.querySelector('.modal-card-body .lead')
cardBodyContent = modal.querySelector('.modal-card-body p')
cardNextButton = modal.querySelector('.modal-card-foot .button')

function pullContent( url ) {
    json = fetch(url).then(function(response){
        return(response.json());
    }).then(function(response){
        cardContents = response
        setModalContent(0)
    })
}
pullContent("/content/cards.json");
