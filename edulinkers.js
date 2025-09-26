// Career Assessment Questions Data
const assessmentQuestions = [
    {
        id: 1,
        question: "What type of work environment do you prefer?",
        options: [
            "Office setting with structured routines",
            "Dynamic outdoor or field work",
            "Creative studio or flexible workspace",
            "Remote or work-from-home setup"
        ]
    },
    {
        id: 2,
        question: "Which activity appeals to you most?",
        options: [
            "Analyzing data and solving problems",
            "Working with people and helping others",
            "Creating and designing new things",
            "Leading teams and making decisions"
        ]
    },
    {
        id: 3,
        question: "What motivates you most in work?",
        options: [
            "Financial stability and growth",
            "Making a positive impact on society",
            "Personal creativity and expression",
            "Recognition and advancement opportunities"
        ]
    }
];

// Application State
let currentQuestion = 0;
let answers = {};
let isCompleted = false;

// DOM Elements
const assessmentCard = document.getElementById('assessmentCard');
const resultsCard = document.getElementById('resultsCard');
const questionCounter = document.getElementById('questionCounter');
const progressPercentage = document.getElementById('progressPercentage');
const progressFill = document.getElementById('progressFill');
const questionTitle = document.getElementById('questionTitle');
const radioGroup = document.getElementById('radioGroup');
const nextBtn = document.getElementById('nextBtn');
const nextBtnText = document.getElementById('nextBtnText');
const retakeBtn = document.getElementById('retakeBtn');
const exploreBtn = document.getElementById('exploreBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

// Initialize the assessment
function initializeAssessment() {
    currentQuestion = 0;
    answers = {};
    isCompleted = false;
    updateQuestionDisplay();
    showAssessmentCard();
}

// Update the question display
function updateQuestionDisplay() {
    const question = assessmentQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
    
    // Update progress info
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${assessmentQuestions.length}`;
    progressPercentage.textContent = `${Math.round(progress)}% Complete`;
    progressFill.style.width = `${progress}%`;
    
    // Update question title
    questionTitle.textContent = question.question;
    
    // Update radio options
    radioGroup.innerHTML = '';
    question.options.forEach((option, index) => {
        const radioOption = document.createElement('div');
        radioOption.className = 'radio-option';
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'answer';
        radioInput.value = option;
        radioInput.id = `option${index}`;
        radioInput.className = 'radio-input';
        
        const radioLabel = document.createElement('label');
        radioLabel.htmlFor = `option${index}`;
        radioLabel.className = 'radio-label';
        radioLabel.textContent = option;
        
        radioOption.appendChild(radioInput);
        radioOption.appendChild(radioLabel);
        radioGroup.appendChild(radioOption);
        
        // Add event listener for radio input
        radioInput.addEventListener('change', handleAnswerSelection);
    });
    
    // Reset next button state
    nextBtn.disabled = true;
    
    // Update next button text
    if (currentQuestion === assessmentQuestions.length - 1) {
        nextBtnText.textContent = 'Complete';
    } else {
        nextBtnText.textContent = 'Next';
    }
}

// Handle answer selection
function handleAnswerSelection(event) {
    answers[currentQuestion] = event.target.value;
    nextBtn.disabled = false;
}

// Handle next button click
function handleNext() {
    if (!answers[currentQuestion]) return;
    
    if (currentQuestion < assessmentQuestions.length - 1) {
        currentQuestion++;
        updateQuestionDisplay();
    } else {
        completeAssessment();
    }
}

// Complete the assessment and show results
function completeAssessment() {
    isCompleted = true;
    showResultsCard();
}

// Show assessment card
function showAssessmentCard() {
    if (assessmentCard) {
        assessmentCard.classList.remove('hidden');
    }
    if (resultsCard) {
        resultsCard.classList.add('hidden');
    }
}

// Show results card
function showResultsCard() {
    if (assessmentCard) {
        assessmentCard.classList.add('hidden');
    }
    if (resultsCard) {
        resultsCard.classList.remove('hidden');
    }
}

// Reset assessment
function resetAssessment() {
    initializeAssessment();
}

// Handle explore careers button
function handleExploreCareers() {
    // Scroll to careers section
    const careersSection = document.getElementById('careers');
    if (careersSection) {
        careersSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const isOpen = !mobileNav.classList.contains('hidden');
    
    if (isOpen) {
        // Close menu
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        // Open menu
        mobileNav.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    if (mobileNav) {
        mobileNav.classList.add('hidden');
    }
    if (menuIcon) {
        menuIcon.classList.remove('hidden');
    }
    if (closeIcon) {
        closeIcon.classList.add('hidden');
    }
}

// Smooth scroll function
function smoothScroll(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle hero CTA buttons
function handleTakeAssessment() {
    const assessmentSection = document.getElementById('assessment');
    if (assessmentSection) {
        assessmentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function handleExploreCareersFromHero() {
    const careersSection = document.getElementById('careers');
    if (careersSection) {
        careersSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle career field card clicks
function handleCareerFieldClick(fieldName) {
    console.log(`Exploring ${fieldName} careers`);
    // In a real application, this would navigate to a detailed career page
    alert(`This would show detailed information about ${fieldName} careers!`);
}

// Handle resource card clicks
function handleResourceClick(resourceTitle) {
    console.log(`Accessing resource: ${resourceTitle}`);
    // In a real application, this would open/download the resource
    alert(`This would open/download: ${resourceTitle}`);
}

// Handle newsletter subscription
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        console.log(`Newsletter subscription for: ${email}`);
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle book session button
function handleBookSession() {
    console.log('Booking career counseling session');
    alert('This would open a calendar booking system for career counseling sessions!');
}

// Handle join study group button
function handleJoinStudyGroup() {
    console.log('Joining study group');
    alert('This would show available study groups and allow you to join one!');
}

// Analytics tracking (mock implementation)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // In a real implementation, you would send this to your analytics service
}

// Initialize event listeners
function initializeEventListeners() {
    // Assessment functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', handleNext);
    }
    
    if (retakeBtn) {
        retakeBtn.addEventListener('click', resetAssessment);
    }
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', handleExploreCareers);
    }
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                smoothScroll(href);
            }
            closeMobileMenu();
        });
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });
    
    const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            smoothScroll(href);
        });
    });
    
    // Hero CTA buttons
    const heroCtaButtons = document.querySelectorAll('.hero-actions .btn-primary');
    heroCtaButtons.forEach(button => {
        if (button.textContent.includes('Take Career Assessment')) {
            button.addEventListener('click', handleTakeAssessment);
        }
    });
    
    const heroExploreButtons = document.querySelectorAll('.hero-actions .btn-outline');
    heroExploreButtons.forEach(button => {
        if (button.textContent.includes('Explore Careers')) {
            button.addEventListener('click', handleExploreCareersFromHero);
        }
    });
    
    // Career field cards
    const careerFieldCards = document.querySelectorAll('.career-field-card');
    careerFieldCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.career-field-title').textContent;
            handleCareerFieldClick(title);
            trackEvent('career_field_clicked', { field: title });
        });
    });
    
    // Resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.resource-title').textContent;
            handleResourceClick(title);
            trackEvent('resource_clicked', { resource: title });
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Book session and join study group buttons
    const bookSessionBtns = document.querySelectorAll('button');
    bookSessionBtns.forEach(btn => {
        if (btn.textContent.includes('Book a Session')) {
            btn.addEventListener('click', handleBookSession);
        }
        if (btn.textContent.includes('Join Study Group')) {
            btn.addEventListener('click', handleJoinStudyGroup);
        }
    });
    
    // View all events button
    const viewAllEventsBtn = document.querySelector('.sidebar-card button');
    if (viewAllEventsBtn && viewAllEventsBtn.textContent.includes('View All Events')) {
        viewAllEventsBtn.addEventListener('click', function() {
            console.log('Viewing all events');
            alert('This would show a comprehensive events calendar!');
        });
    }
    
    // View all career fields button
    const viewAllCareersBtn = document.querySelector('.section-footer .btn-primary');
    if (viewAllCareersBtn && viewAllCareersBtn.textContent.includes('View All Career Fields')) {
        viewAllCareersBtn.addEventListener('click', function() {
            console.log('Viewing all career fields');
            alert('This would show a comprehensive career fields directory!');
        });
    }
}

// Handle window resize for responsive design
function handleWindowResize() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
}

// Handle keyboard navigation
function handleKeydown(e) {
    // Close mobile menu on escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Handle enter key on radio options
    if (e.key === 'Enter' && e.target.classList.contains('radio-input')) {
        e.target.checked = true;
        handleAnswerSelection({ target: e.target });
    }
    
    // Handle enter key on next button
    if (e.key === 'Enter' && e.target === nextBtn && !nextBtn.disabled) {
        handleNext();
    }
}

// Add focus management for accessibility
function manageFocus() {
    const radioInputs = document.querySelectorAll('.radio-input');
    radioInputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                let nextIndex;
                if (e.key === 'ArrowDown') {
                    nextIndex = (index + 1) % radioInputs.length;
                } else {
                    nextIndex = (index - 1 + radioInputs.length) % radioInputs.length;
                }
                radioInputs[nextIndex].focus();
            }
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .career-field-card, .resource-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Edulinkers website loaded');
    
    // Initialize the assessment
    initializeAssessment();
    
    // Initialize all event listeners
    initializeEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Track page load
    trackEvent('page_loaded', { page: 'home' });
});

// Add window event listeners
window.addEventListener('resize', handleWindowResize);
window.addEventListener('keydown', handleKeydown);

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(target) {
        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override the smoothScroll function for older browsers
    smoothScroll = function(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            smoothScrollPolyfill(target);
        }
    };
}

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAssessment,
        handleNext,
        resetAssessment,
        smoothScroll,
        trackEvent
    };
}