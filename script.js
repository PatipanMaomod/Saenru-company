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


// เลือกปุ่ม
const backToTop = document.getElementById('backToTop');

// แสดง/ซ่อนปุ่มเมื่อเลื่อน
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTop.style.display = "block"; // แสดงปุ่มเมื่อเลื่อนเกิน 100px
    } else {
        backToTop.style.display = "none"; // ซ่อนปุ่ม
    }
};

// ฟังก์ชันเลื่อนกลับไปข้างบน
backToTop.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // เลื่อนแบบนุ่มนวล
    });
};
