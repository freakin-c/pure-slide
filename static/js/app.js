// Global Variables

var modal = document.querySelector(".modal")

// EventListeners
// --------------

// Toggle the Modal
function toggleModal() {
    modal.classList.toggle("is-active")
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
