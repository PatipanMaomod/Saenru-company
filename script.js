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


function loadNavbar() {
    fetch('navbar.html')  // กำหนด path ของไฟล์ navbar.html
        .then(response => response.text()) // ดึงข้อมูล HTML
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data; // ใส่ข้อมูลที่ดึงมาใน element ที่มี id="navbar-container"
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// เรียกฟังก์ชัน loadNavbar เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', loadNavbar);
// เพิ่มซูมด้วยการเลื่อนเมาส์
let modalImage = document.getElementById('modalImage');

// ฟังก์ชันที่ปรับขนาดภาพตามการเลื่อนเมาส์
modalImage.addEventListener('wheel', function(event) {
    let scale = 1;

    // ซูมเข้าเมื่อเลื่อนขึ้น, ซูมออกเมื่อเลื่อนลง
    if (event.deltaY < 0) {
        scale += 0.1;
    } else {
        scale -= 0.1;
    }

    // จำกัดการซูม
    if (scale >= 1 && scale <= 3) {
        modalImage.style.transform = `scale(${scale})`;
    }

    // ป้องกันการเลื่อนหน้าเพจเมื่อมีการเลื่อนเมาส์
    event.preventDefault();
});
