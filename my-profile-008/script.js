// =====================================================================
// ส่วนที่ 1: ระบบข้อความต้อนรับผู้เข้าชม (Personalized Welcome) - เดิม
// =====================================================================
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

// =====================================================================
// ส่วนที่ 2: ระบบประมาณการค่าบริการพัฒนาเว็บไซต์ (Website Cost Estimator) - เดิม
// =====================================================================
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

// =====================================================================
// ส่วนที่ 3: ดักจับปุ่มที่มีคลาส .sparkle-btn และเอฟเฟกต์ดาว (เดิม)
// =====================================================================
document.querySelectorAll('.sparkle-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // หากเป็นลิงก์ <a> ให้ป้องกันการกระโดดกะทันหัน เพื่อเลื่อนจอแบบ smooth
        if (this.tagName.toLowerCase() === 'a') {
            e.preventDefault();
        }

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

// =====================================================================
// ส่วนที่ 4: ระบบสลับโหมด Light Mode และ Dark Mode (Theme Switcher)
// =====================================================================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

// ฟังก์ชันอัปเดต UI และ Attribute ของโหมดธีม
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Light Mode';
        if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดสว่าง (Light Mode)');
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Dark Mode';
        if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดมืด (Dark Mode)');
    }
}

// ตรวจสอบค่าที่บันทึกไว้ใน localStorage หรือ System preference
const savedTheme = localStorage.getItem('theme-preference');
const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    applyTheme(savedTheme);
} else if (systemDark) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

// Event Listener สำหรับปุ่มสลับธีม
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('theme-preference', nextTheme);
    });
}

// =====================================================================
// ส่วนที่ 5: ระบบแบบฟอร์มติดต่อและการตรวจสอบข้อมูล (Contact Form Validation)
// =====================================================================
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactMessage = document.getElementById('contactMessage');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const contactAlert = document.getElementById('contactAlert');

// ฟังก์ชันตรวจสอบรูปแบบอีเมลที่ถูกต้อง
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

// ฟังก์ชันกำหนดสถานะข้อผิดพลาดของแต่ละ input
function setFieldError(inputEl, errorEl, errorMessage) {
    if (!inputEl || !errorEl) return;
    if (errorMessage) {
        inputEl.classList.add('is-invalid');
        errorEl.textContent = errorMessage;
    } else {
        inputEl.classList.remove('is-invalid');
        errorEl.textContent = '';
    }
}

// ตรวจสอบความถูกต้องแบบ Real-time ขณะผู้ใช้พิมพ์
if (contactName) {
    contactName.addEventListener('input', function () {
        if (this.value.trim().length >= 2) {
            setFieldError(this, nameError, '');
        }
    });
}

if (contactEmail) {
    contactEmail.addEventListener('input', function () {
        if (isValidEmail(this.value)) {
            setFieldError(this, emailError, '');
        }
    });
}

if (contactMessage) {
    contactMessage.addEventListener('input', function () {
        if (this.value.trim().length >= 5) {
            setFieldError(this, messageError, '');
        }
    });
}

// ฟังก์ชันแสดงกล่องข้อความแจ้งเตือน (Alert Banner)
function showContactAlert(type, title, text) {
    if (!contactAlert) return;
    contactAlert.className = `contact-alert ${type}`;
    const iconEl = contactAlert.querySelector('.alert-icon');
    const titleEl = contactAlert.querySelector('.alert-title');
    const textEl = contactAlert.querySelector('.alert-text');
    
    if (iconEl) iconEl.textContent = type === 'success' ? '✅' : '⚠️';
    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;
    
    contactAlert.style.display = 'flex';
    contactAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ตรวจสอบและส่งแบบฟอร์ม
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ

        const nameVal = contactName ? contactName.value.trim() : '';
        const emailVal = contactEmail ? contactEmail.value.trim() : '';
        const messageVal = contactMessage ? contactMessage.value.trim() : '';

        let isValid = true;

        // 1. ตรวจสอบชื่อ
        if (!nameVal) {
            setFieldError(contactName, nameError, 'กรุณากรอกชื่อ-นามสกุลของคุณ');
            isValid = false;
        } else if (nameVal.length < 2) {
            setFieldError(contactName, nameError, 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร');
            isValid = false;
        } else {
            setFieldError(contactName, nameError, '');
        }

        // 2. ตรวจสอบอีเมล
        if (!emailVal) {
            setFieldError(contactEmail, emailError, 'กรุณากรอกที่อยู่อีเมลของคุณ');
            isValid = false;
        } else if (!isValidEmail(emailVal)) {
            setFieldError(contactEmail, emailError, 'รูปแบบอีเมลไม่ถูกต้อง (เช่น example@email.com)');
            isValid = false;
        } else {
            setFieldError(contactEmail, emailError, '');
        }

        // 3. ตรวจสอบข้อความ
        if (!messageVal) {
            setFieldError(contactMessage, messageError, 'กรุณากรอกข้อความที่ต้องการติดต่อ');
            isValid = false;
        } else if (messageVal.length < 5) {
            setFieldError(contactMessage, messageError, 'ข้อความต้องมีความยาวอย่างน้อย 5 ตัวอักษร');
            isValid = false;
        } else {
            setFieldError(contactMessage, messageError, '');
        }

        // หากข้อมูลไม่ถูกต้อง
        if (!isValid) {
            showContactAlert(
                'error',
                'กรุณาตรวจสอบข้อมูล',
                'โปรดตรวจสอบช่องที่แสดงข้อความสีแดงและกรอกข้อมูลให้ถูกต้องครบถ้วน'
            );

            // โฟกัสไปที่ input ตัวแรกที่ผิดพลาด
            if (contactName && contactName.classList.contains('is-invalid')) {
                contactName.focus();
            } else if (contactEmail && contactEmail.classList.contains('is-invalid')) {
                contactEmail.focus();
            } else if (contactMessage && contactMessage.classList.contains('is-invalid')) {
                contactMessage.focus();
            }
            return;
        }

        // หากข้อมูลถูกต้องครบถ้วน: แสดงการแจ้งเตือนสำเร็จ (จำลองการส่งข้อความ)
        showContactAlert(
            'success',
            `ส่งข้อความสำเร็จ! ขอบคุณคุณ ${nameVal}`,
            `เราได้รับข้อความของคุณเรียบร้อยแล้ว และจะติดต่อกลับไปยัง ${emailVal} โดยเร็วที่สุด (จำลองการส่งข้อมูลเสร็จสมบูรณ์)`
        );

        // แสดง Browser Alert เพื่อการแจ้งเตือนที่ชัดเจน
        alert(`ส่งข้อความสำเร็จเรียบร้อยแล้ว!\nขอบคุณคุณ ${nameVal} ที่ติดต่อเข้ามา เราได้รับข้อความของคุณแล้ว`);

        // ล้างข้อมูลในแบบฟอร์ม
        contactForm.reset();
        if (contactName) contactName.classList.remove('is-invalid');
        if (contactEmail) contactEmail.classList.remove('is-invalid');
        if (contactMessage) contactMessage.classList.remove('is-invalid');
    });
}
