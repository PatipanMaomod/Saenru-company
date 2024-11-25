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


