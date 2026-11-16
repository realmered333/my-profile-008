// --- ส่วนที่ 1: ระบบข้อความต้อนรับผู้เข้าชม (Personalized Welcome) ---
let visitorName = prompt("กรุณากรอกชื่อผู้เข้าชมเว็บไซต์ของคุณ:");
const greetingMessage = document.getElementById('greetingMessage');

if (visitorName && visitorName.trim() !== "") {
    if (greetingMessage) {
        greetingMessage.textContent = `ยินดีต้อนรับคุณ ${visitorName} เข้าสู่เว็บไซต์ Portfolio ของฉัน`;
    }
} else {
    if (greetingMessage) {
        greetingMessage.textContent = "ยินดีต้อนรับผู้เยี่ยมชมเข้าสู่เว็บไซต์ Portfolio ของฉัน";
    }
}

// 1. ปุ่มทักทาย (เดิม)
const greetingBtn = document.getElementById('greetingBtn');
if (greetingBtn && greetingMessage) {
    greetingBtn.addEventListener('click', function () { 
        greetingMessage.textContent = "สวัสดี สมาชิก";
    });
}

// --- ส่วนที่ 2: ระบบประมาณการค่าบริการพัฒนาเว็บไซต์ (Website Cost Estimator) ---
const estimateBtn = document.getElementById('estimateBtn');
const pagesResult = document.getElementById('pagesResult');
const costResult = document.getElementById('costResult');

if (estimateBtn) {
    estimateBtn.addEventListener('click', function () {
        let inputPages = prompt("กรุณากรอกจำนวนหน้าที่ต้องการพัฒนาเว็บไซต์:");
        
        if (inputPages !== null) {
            let numberOfPages = Number(inputPages);
            
            // ตรวจสอบว่าเป็นตัวเลขที่ถูกต้องและมากกว่า 0 หรือไม่
            if (!isNaN(numberOfPages) && numberOfPages > 0) {
                let pricePerPage = 500;
                let totalPrice = numberOfPages * pricePerPage;
                
                // แสดงผลลัพธ์บนหน้าเว็บไซต์
                pagesResult.textContent = numberOfPages;
                costResult.textContent = totalPrice.toLocaleString(); // ใส่คอมม่าคั่นหลักพันเพื่อความสวยงาม
            } else {
                alert("กรุณากรอกข้อมูลเป็นตัวเลขจำนวนเต็มบวกที่ถูกต้องครับ");
            }
        }
    });
}

// 2. ดักจับทุกปุ่มที่มีคลาส .sparkle-btn (เดิม)
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

// ฟังก์ชันสำหรับสร้างประกายดาว (เดิม)
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