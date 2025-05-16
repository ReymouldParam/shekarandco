document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const flagValue = urlParams.get('emailSuccess');
    const popupMessage = document.getElementById("popup-message");
    const popupHeading = document.getElementById("popup-heading");
    const popupPara = document.getElementById("popup-para");
    const closePopup = document.getElementById("close-popup");

    if (flagValue === 'true') {
        popupHeading.innerHTML = "EMAIL SENT SUCCESSFULLY";
        popupPara.innerHTML = "Thank you for your interest. We will get back to you shortly.";
        popupMessage.style.display = "block";


    } else if (flagValue === 'false') {
        popupHeading.innerHTML = "EMAIL NOT SENT";
        popupPara.innerHTML = "There was an error sending your message. Please try again later.";
        popupMessage.style.display = "block";

    }

    closePopup.addEventListener("click", function () {
        popupMessage.style.display = "none";


    });

    // Get the current URL without the query parameters
    const baseUrl = window.location.href.split('?')[0];

    // Replace the current state with a new state without the query parameters
    history.replaceState(null, null, baseUrl);
});