// Global Variables

var modal = document.querySelector(".modal")

// EventListeners
// --------------

// Toggle the Modal
function toggleModal() {
    modal.classList.toggle("is-active")

    // toggle  `keydown` eventListener alongside with modal
    modal.classList.contains("is-active") ?
        document.addEventListener("keydown", escapeModal) :
        document.removeEventListener("keydown", escapeModal)
}

// Iterate the Modal Cards
function modalCardNextContent() {
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
modalCardNextButton.addEventListener("click", modalCardNextContent)
modalCardNextButton.addEventListener("mouseenter", hoverCardNext)

// Escape Key to close modal
function escapeModal( e ) {
    if ( modal.classList.contains("is-active") && e.key === "Escape" ) {
        console.log( "Active modal escaped" )
        toggleModal()
    }
}
document.addEventListener("keydown", escapeModal)
