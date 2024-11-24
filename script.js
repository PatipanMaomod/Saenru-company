// Handle select event for CPU packages
function handleSelect(selectElement, brandIndex) {
    // Reset other selects when one is selected
    document.querySelectorAll('.cpu-select').forEach((select, index) => {
        if (index !== brandIndex) {
            select.value = ""; // Clear the value of other selects
        }
    });

    // Fetch and show packages based on the selected value
    const selectedPackagesJson = selectElement.value;
    showPackages(selectedPackagesJson);
}


// Owl Carousel initialization
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        items: 1,
        stagePadding: 20,
        center: true,
        nav: false,
        margin: 50,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            575: { items: 2 },
            768: { items: 2 },
            991: { items: 3 },
            1200: { items: 4 }
        }
    });
});
