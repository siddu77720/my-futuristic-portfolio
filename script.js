document.addEventListener('DOMContentLoaded', () => {

    // 0. Loading Splash Screen (time-based smooth easing, zero main-thread stutter)
    const splashScreen = document.getElementById('splash-screen');
    const splashBarFill = document.getElementById('splash-bar-fill');
    const splashStatus = document.getElementById('splash-status');

    if (splashScreen) {
        let splashDismissed = false;
        let isLoaded = document.readyState === 'complete';
        let progress = 0;
        const startTime = performance.now();
        let lastTime = startTime;
        const durationMs = 1100;

        const finishSplash = () => {
            if (splashDismissed) return;
            splashDismissed = true;
            if (splashBarFill) splashBarFill.style.transform = 'scaleX(1)';
            if (splashStatus) splashStatus.textContent = 'Ready';
            setTimeout(() => {
                splashScreen.classList.add('fade-out');
                splashScreen.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('splash-active');
            }, 140);
        };

        const tick = (now) => {
            if (splashDismissed) return;
            const elapsed = now - startTime;
            const dt = Math.min(50, now - lastTime);
            lastTime = now;

            const t = Math.min(1, elapsed / durationMs);
            // Smooth cubic ease-out curve from 0 -> 1 without stalling
            const eased = 1 - Math.pow(1 - t, 3);
            const target = isLoaded ? eased : Math.min(0.92, eased * 0.92);

            const factor = 1 - Math.exp(-dt * 0.018);
            progress += (target - progress) * factor;
            if (splashBarFill) {
                splashBarFill.style.transform = `scaleX(${Math.min(1, progress).toFixed(4)})`;
            }

            if (isLoaded && t >= 1 && progress >= 0.992) {
                finishSplash();
                return;
            }
            requestAnimationFrame(tick);
        };

        window.addEventListener('load', () => {
            isLoaded = true;
        });

        requestAnimationFrame(tick);
        setTimeout(finishSplash, 2000);
    }

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // 2. Navbar Background on Scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Typewriter Effect
    const roles = [
        "AIML & Full Stack Developer",
        "AI-Powered App Builder",
        "Python & JavaScript Developer",
        "MERN Stack Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    const typewriterElement = document.querySelector('.typewriter');

    function type() {
        if (!typewriterElement) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = newTextDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (roles.length) {
        setTimeout(type, 1000);
    }

    // 4. Protected View-Only Certificate Gallery (All 30 Certificates)
    const certificates = [
        { id: 'synapse-2-0', title: 'Synapse 2.0 – 24-Hour National-Level Hackathon', issuer: 'Jain College of Engineering • Nov 2026', icon: 'fas fa-trophy text-cyan', photo: 'certificates/3rd-year-hackthon-certificate-synapse-2-0-hackthon-participation-certificate.jpeg' },
        { id: 'veloop-lor', title: 'Letter of Recommendation – Full Stack Developer', issuer: 'VELoop Rewards • Sep 2026', icon: 'fas fa-award text-purple', photo: 'certificates/2nd-year-intership-lor-certificate.jpg' },
        { id: 'veloop-internship', title: 'Full Stack Development Internship Certificate', issuer: 'VELoop Rewards • Aug 2026 – Sep 2026', icon: 'fas fa-briefcase text-neon', photo: 'certificates/2nd-year-intership-full-stack-development-intership-certificate.jpg' },
        { id: 'emertxe-internship', title: 'MERN Stack Internship Certificate', issuer: 'Emertxe Information Technologies • Aug 2026 – Sep 2026', icon: 'fas fa-layer-group text-cyan', photo: 'certificates/2nd-year-intership-mern-stack-internship-certificate.jpg' },
        { id: 'innovate-x-2k26', title: 'INNOVATE-X 2K26 – Certificate of Participation', issuer: 'KLS Gogte Institute of Technology • Aug 2026', icon: 'fas fa-rocket text-purple', photo: 'certificates/2nd-year-hackthon-certificate-innovate-x-2k26.jpg' },
        { id: 'ethical-hacking-masterclass', title: 'Ethical Hacking Masterclass', issuer: 'Cydenium • Jul 2026', icon: 'fas fa-user-secret text-neon', photo: 'certificates/2nd-year-ethical-hacking-masterclass.jpg' },
        { id: 'hackwave-lpu', title: 'HackWave 1.0 – Certificate of Participation', issuer: 'Lovely Professional University (LPU)', icon: 'fas fa-code text-cyan', photo: 'certificates/2nd-year-hackthon-certificate-hackwave-1-0-lpu-certificate-of-participation.jpg' },
        { id: 'hackhive-2k26', title: 'HACKHIVE-2K26 – National Level Hackathon', issuer: 'Angadi Institute of Technology & Management • May 2026', icon: 'fas fa-laptop-code text-purple', photo: 'certificates/2nd-year-hackthon-certificate-hackhive-2k26.jpg' },
        { id: 'claude-101', title: 'Certificate of Completion: Claude 101', issuer: 'Anthropic • May 2026', icon: 'fas fa-robot text-neon', photo: 'certificates/2nd-year-claude-101.jpg' },
        { id: 'claude-code-101', title: 'Claude Code 101', issuer: 'Anthropic • May 2026', icon: 'fas fa-terminal text-cyan', photo: 'certificates/2nd-year-claude-code-101.jpg' },
        { id: 'js-react-dlithe', title: 'Web Development using JavaScript & React JS', issuer: 'DLithe • May 2026', icon: 'fab fa-react text-purple', photo: 'certificates/2nd-year-web-development-using-react-and-javascript.jpg' },
        { id: 'ai-assisted-coding', title: 'AI Assisted Coding for Beginners', issuer: 'AZ Career Link • Apr 2026', icon: 'fas fa-code text-neon', photo: 'certificates/2nd-year-ai-assisted-coding-webinar-by-az-career-link.png' },
        { id: 'cyber-defense-ai-era', title: 'Mastering Cyber Defense In The AI Era', issuer: 'WsCube Tech • Apr 2026', icon: 'fas fa-shield-alt text-cyan', photo: 'certificates/2nd-year-mastering-cyber-defense-in-the-al-era.jpg' },
        { id: 'ethical-hacking', title: 'Ethical Hacking for Beginners', issuer: 'AZ Career Link • Apr 2026', icon: 'fas fa-user-secret text-purple', photo: 'certificates/2nd-year-ethical-hacking-webinar-by-az-career-link.jpg' },
        { id: 'prompt-engineering-masterclass', title: 'Prompt Engineering Masterclass', issuer: 'Great Learning • Mar 2026', icon: 'fas fa-magic text-neon', photo: 'certificates/2nd-year-prompt-engineering-masterclass.jpg' },
        { id: 'methods-of-ai-achievement', title: 'Methods of AI I – Record of Achievement (98.45%)', issuer: 'AI Campus • Mar 2026', icon: 'fas fa-medal text-cyan', photo: 'certificates/2nd-year-record-of-achievement.jpg' },
        { id: 'methods-of-ai-agents', title: 'Methods of AI I – Intelligent Agents', issuer: 'AI Campus • Mar 2026', icon: 'fas fa-brain text-purple', photo: 'certificates/2nd-year-confirmation-of-participation.jpg' },
        { id: 'cloud-devops-2026', title: 'Cloud DevOps Roadmap for 2026', issuer: 'HCL GUVI • Jan 2026', icon: 'fas fa-cloud text-neon', photo: 'certificates/2nd-year-devops-roadmap-session-participation-certificate.jpg' },
        { id: 'technofest-2025', title: 'TechnoFest 2025 (One-Day Hackathon)', issuer: 'DLithe • Oct 2025', icon: 'fas fa-code text-cyan', photo: 'certificates/2nd-year-hackthon-certificate-dlithe-hackthon-participation-certificate.jpeg' },
        { id: 'generative-ai-mastermind', title: 'Generative AI Mastermind', issuer: 'Outskill • Oct 2025', icon: 'fas fa-microchip text-purple', photo: 'certificates/2nd-year-generative-ai-mastermind-completion-certificate.jpg' },
        { id: 'freedom-with-ai', title: 'Freedom with AI Masterclass', issuer: 'Freedom With AI • Sep 2025', icon: 'fas fa-robot text-neon', photo: 'certificates/2nd-year-ai-masterclass-completion-certificate.jpg' },
        { id: 'full-stack-workshop', title: 'Full Stack Development – 2 Days Workshop', issuer: 'Techzonce IT Solution LLP • Aug 2025', icon: 'fas fa-laptop-code text-cyan', photo: 'certificates/1st-year-full-stack-development-2-days-workshop.jpg' },
        { id: 'codtech-internship', title: 'C Programming Internship Certificate', issuer: 'CODTECH IT SOLUTIONS • May 2025 – Jun 2025', icon: 'fas fa-cogs text-purple', photo: 'certificates/1st-year-internships-codtech-c-programming-intership.jpg' },
        { id: 'python-foundation-codesignal', title: 'Programming Foundation with Python', issuer: 'CodeSignal • May 2025', icon: 'fab fa-python text-neon', photo: 'certificates/1st-year-programming-foundations-with-python-completion-certificate.jpg' },
        { id: 'prompt-engineering-copilot', title: 'Prompt Engineering with GitHub Copilot', issuer: 'Simplilearn • May 2025', icon: 'fab fa-github text-cyan', photo: 'certificates/1st-year-prompt-engineering-completion-certificate.jpg' },
        { id: 'azure-fundamentals', title: 'Microsoft Certified: Azure Fundamentals', issuer: 'Simplilearn • May 2025', icon: 'fas fa-cloud-upload-alt text-purple', photo: 'certificates/1st-year-azure-fundamentals-completion-certificate.jpg' },
        { id: 'google-analytics', title: 'Google Analytics Certification', issuer: 'United Latino Students Association • May 2025', icon: 'fas fa-chart-line text-neon', photo: 'certificates/1st-year-google-analytics-completion-certificate.jpg' },
        { id: 'build-generative-ai-model', title: 'Build Your Own Generative AI Model', issuer: 'NxtWave • May 2025', icon: 'fas fa-brain text-cyan', photo: 'certificates/1st-year-generative-ai-model-completion-certificate.jpg' },
        { id: 'aws-solutions-architecture', title: 'AWS APAC – Solutions Architecture Job Simulation', issuer: 'Forage • May 2025', icon: 'fab fa-aws text-purple', photo: 'certificates/1st-year-aws-completion-certificate.jpg' },
        { id: 'hp-life-design-thinking', title: 'HP Life Design Thinking', issuer: 'HP LIFE • Apr 2025', icon: 'fas fa-lightbulb text-neon', photo: 'certificates/1st-year-designthinking-completion-certificate.jpg' }
    ];

    const certsGrid = document.getElementById('certs-grid');
    const certModal = document.getElementById('cert-modal');
    const certModalBackdrop = document.getElementById('cert-modal-backdrop');
    const certModalClose = document.getElementById('cert-modal-close');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certModalIssuer = document.getElementById('cert-modal-issuer');
    const certCanvasStage = document.getElementById('cert-canvas-stage');
    const certModalCanvas = document.getElementById('cert-modal-canvas');
    const certModalEmpty = document.getElementById('cert-modal-empty');
    const certPrevBtn = document.getElementById('cert-prev-btn');
    const certNextBtn = document.getElementById('cert-next-btn');
    const certCounter = document.getElementById('cert-counter');

    let currentCertIndex = 0;

    function drawProtectedCanvas(canvas, img) {
        if (!canvas || !img) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    if (certsGrid) {
        const thumbObserver = 'IntersectionObserver' in window
            ? new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const card = entry.target;
                    const photo = card.dataset.certPhoto;
                    const previewBox = card.querySelector('.cert-preview-box');
                    const thumbCanvas = card.querySelector('.cert-thumb-canvas');
                    if (photo && previewBox && thumbCanvas) {
                        const img = new Image();
                        img.onload = () => {
                            drawProtectedCanvas(thumbCanvas, img);
                            previewBox.classList.add('has-image');
                        };
                        img.src = photo;
                    }
                    observer.unobserve(card);
                });
            }, { rootMargin: '350px 0px' })
            : null;

        certificates.forEach((cert, index) => {
            const delayClass = index % 4 === 0 ? '' : ` delay-${index % 4}`;
            const card = document.createElement('div');
            card.className = `cert-item fade-in${delayClass}`;
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View ${cert.title} certificate`);
            card.dataset.certId = cert.id;
            card.dataset.certPhoto = cert.photo || '';

            card.innerHTML = `
                <div class="cert-card-top">
                    <div class="cert-icon"><i class="${cert.icon}"></i></div>
                    <div class="cert-info">
                        <h4></h4>
                        <span></span>
                    </div>
                </div>
                <div class="cert-preview-box">
                    <canvas class="cert-thumb-canvas" aria-hidden="true"></canvas>
                    <div class="cert-shield" aria-hidden="true"></div>
                    <span class="cert-view-pill"><i class="fas fa-eye"></i> View</span>
                </div>
            `;

            card.querySelector('h4').textContent = cert.title;
            card.querySelector('.cert-info span').textContent = cert.issuer;

            if (thumbObserver) {
                thumbObserver.observe(card);
            } else if (cert.photo) {
                const previewBox = card.querySelector('.cert-preview-box');
                const thumbCanvas = card.querySelector('.cert-thumb-canvas');
                const img = new Image();
                img.onload = () => {
                    drawProtectedCanvas(thumbCanvas, img);
                    previewBox.classList.add('has-image');
                };
                img.src = cert.photo;
            }

            card.addEventListener('contextmenu', e => e.preventDefault());
            card.addEventListener('dragstart', e => e.preventDefault());
            card.addEventListener('click', () => openCertModal(index));
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCertModal(index);
                }
            });

            certsGrid.appendChild(card);
        });
    }

    function renderModalCertificate(index) {
        if (!certificates.length) return;
        currentCertIndex = (index + certificates.length) % certificates.length;
        const cert = certificates[currentCertIndex];

        certModalTitle.textContent = cert.title;
        certModalIssuer.textContent = cert.issuer;
        certCounter.textContent = `${currentCertIndex + 1} / ${certificates.length}`;

        if (cert.photo) {
            const img = new Image();
            img.onload = () => {
                drawProtectedCanvas(certModalCanvas, img);
                certCanvasStage.classList.add('active');
                certModalEmpty.classList.add('hidden');
            };
            img.onerror = () => {
                certCanvasStage.classList.remove('active');
                certModalEmpty.classList.remove('hidden');
            };
            img.src = cert.photo;
        } else {
            certCanvasStage.classList.remove('active');
            certModalEmpty.classList.remove('hidden');
        }
    }

    function openCertModal(index) {
        if (!certModal) return;
        renderModalCertificate(index);
        certModal.classList.add('open');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove('open');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (certModal) {
        certModal.addEventListener('contextmenu', e => e.preventDefault());
        certModal.addEventListener('dragstart', e => e.preventDefault());
        certModalBackdrop?.addEventListener('click', closeCertModal);
        certModalClose?.addEventListener('click', closeCertModal);
        certPrevBtn?.addEventListener('click', () => renderModalCertificate(currentCertIndex - 1));
        certNextBtn?.addEventListener('click', () => renderModalCertificate(currentCertIndex + 1));

        document.addEventListener('keydown', e => {
            if (!certModal.classList.contains('open')) return;
            if (e.key === 'Escape') closeCertModal();
            if (e.key === 'ArrowLeft') renderModalCertificate(currentCertIndex - 1);
            if (e.key === 'ArrowRight') renderModalCertificate(currentCertIndex + 1);
            if ((e.ctrlKey || e.metaKey) && ['s', 'p', 'u'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });
    }

    // 5. Scroll Reveal Animation (after dynamic cards are mounted)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 6. Update Footer Year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // 7. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = nav.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
