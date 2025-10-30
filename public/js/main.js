// MNN官网主JavaScript文件

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到锚点
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEachEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.card-hover, .bg-white');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 显示加载状态
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> 提交中...';
            submitBtn.disabled = true;
            
            // 模拟API调用
            setTimeout(() => {
                alert('感谢您的反馈！我们会尽快回复您。');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 动态加载内容
    loadLatestNews();
    loadDemoData();
});

// 加载最新动态
async function loadLatestNews() {
    try {
        // 模拟API调用
        const newsData = [
            {
                title: "MNN 2.0版本发布 - 性能提升50%",
                date: "2024-10-28",
                summary: "全新架构设计，带来更高效的推理性能"
            },
            {
                title: "MNN工作台新增模型压缩功能",
                date: "2024-10-25",
                summary: "一键压缩模型，减少部署体积"
            },
            {
                title: "MNN社区突破10000星",
                date: "2024-10-20",
                summary: "感谢社区的支持与贡献"
            }
        ];
        
        // 这里可以实际调用API
        console.log('最新动态已加载');
    } catch (error) {
        console.error('加载最新动态失败:', error);
    }
}

// 加载Demo数据
async function loadDemoData() {
    try {
        // 模拟API调用
        const demoData = {
            yolo: { accuracy: 95.2, speed: 15 },
            mobilenet: { accuracy: 87.6, speed: 8 },
            facedetection: { accuracy: 92.1, speed: 12 },
            posenet: { accuracy: 89.3, speed: 20 }
        };
        
        // 这里可以实际调用API
        console.log('Demo数据已加载');
    } catch (error) {
        console.error('加载Demo数据失败:', error);
    }
}

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出到全局作用域
window.MNN = {
    loadLatestNews,
    loadDemoData
}