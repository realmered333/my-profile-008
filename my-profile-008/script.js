// 1. ปุ่มทักทาย
const greetingBtn = document.getElementById('greetingBtn');
const greetingMessage = document.getElementById('greetingMessage');
if (greetingBtn && greetingMessage) {
    greetingBtn.addEventListener('click', function () { 
        greetingMessage.textContent = "สวัสดี สมาชิก";
    });
}

// 2. ดักจับทุกปุ่มที่มีคลาส .sparkle-btn (ไม่ว่าจะอยู่ตรงเมนูหรือโลโก้)
document.querySelectorAll('.sparkle-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // ป้องกันไม่ให้เบราว์เซอร์กระโดดทันที

        // ก้าวที่ 1: สร้างเอฟเฟกต์ดาวพุ่งตรงตำแหน่งเมาส์ที่คลิก
        const clickX = e.clientX;
        const clickY = e.clientY;
        for (let i = 0; i < 8; i++) {
            createSparkle(clickX, clickY);
        }

        // ก้าวที่ 2: เช็คว่าเป็นลิงก์ภายในหน้าหรือไม่ (มี href ที่ขึ้นต้นด้วย #) ถ้ามีให้เลื่อนจอตามไปด้วย
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ฟังก์ชันสำหรับสร้างประกายดาว
function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    
    const destinationX = (Math.random() - 0.5) * 100;
    const destinationY = (Math.random() - 0.5) * 100;
    
    sparkle.style.setProperty('--dx', `${destinationX}px`);
    sparkle.style.setProperty('--dy', `${destinationY}px`);
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    document.body.appendChild(sparkle);

    // ลบดาวทิ้งอัตโนมัติเมื่อเล่นแอนิเมชันจบ (0.6 วินาที)
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}