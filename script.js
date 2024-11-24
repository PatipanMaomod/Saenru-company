function handleSelect(selectElement, brandIndex) {
    const selects = document.querySelectorAll('.cpu-select');
    selects.forEach((select, index) => {
        if (index !== brandIndex) {
            select.value = "";
        }
    });
    const selectedPackagesJson = selectElement.value;
    showPackages(selectedPackagesJson);
}

function showPackages(packagesJson) {
    if (!packagesJson) {
        document.getElementById('packagesGrid').innerHTML = '<p>No packages available</p>';
        return;
    }

    const packages = JSON.parse(packagesJson);
    const grid = document.getElementById('packagesGrid');
    grid.innerHTML = '';  // Clear any previous content

    packages.forEach((pkg, index) => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.innerHTML = `
            <div class="package-title">${pkg.name}</div>
            <div class="package-info">
                <div>CPU: ${pkg.cpu} vCPU</div>
                <div>RAM: ${pkg.memory / 1024} GB</div>
                <div>Disk: ${pkg.disk / 1024} GB</div>
                <div>Hourly: ${pkg.price.hourly.toFixed(2)}฿</div>
                <div>Monthly: ${pkg.price.monthly}฿</div>
            </div>
            <button class="select-btn">Select Package</button>
        `;
        grid.appendChild(card);

        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 50);
    });
}

$('.testimonials-container').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:6000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1,
            nav:false
        },
        600:{
            items:1,
            nav:true
        },
        768:{
            items:2
        },
    }
})