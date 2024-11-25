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
document.addEventListener('mousemove', function(e) {
    const mouseCircle = document.getElementById('mouseCircle');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // ตั้งตำแหน่งของวงกลมตามตำแหน่งเมาส์
    mouseCircle.style.left = mouseX + 'px'; 
    mouseCircle.style.top = mouseY + 'px'; 
    
    // เพิ่มขนาดของวงกลมเมื่อเมาส์เคลื่อนที่
    const circleSize = Math.max(50, Math.min(150, Math.abs(e.clientX - window.innerWidth / 2) / 2));
    mouseCircle.style.width = circleSize + 'px';
    mouseCircle.style.height = circleSize + 'px';
});

