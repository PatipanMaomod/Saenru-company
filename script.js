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
function changeTestimonial(testimonialId) {
    // ซ่อนทั้งหมด
    var testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(function (testimonial) {
        testimonial.style.display = 'none';
    });

    // แสดง testimonial ที่เลือก
    document.getElementById('testimonial' + testimonialId).style.display = 'block';
}


$(document).ready(function () {
    var silder = $(".owl-carousel");
    silder.owlCarousel({
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