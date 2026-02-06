// API Configuration
const API_URL = 'http://localhost:5001/api';

console.log('✓ script-api.js loaded');
console.log(`API URL: ${API_URL}`);
console.log('Waiting for DOMContentLoaded event...');

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

function isUserLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

function isUserAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

async function registerUser(name, email, password, role = 'student') {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        // Store auth token and user
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        // Store auth token and user
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedCourse');
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutItems');
}

async function fetchUserProfile() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch profile');
        
        const data = await response.json();
        // Update local storage
        if (data.user) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
        }
        return data.user;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}

// ============================================
// COURSE FUNCTIONS
// ============================================

let courses = [];

async function fetchCourses(category = 'all') {
    try {
        let url = `${API_URL}/courses`;
        if (category && category !== 'all') {
            url += `?category=${category}`;
        }
        
        console.log(`Fetching courses from: ${url}`);
        const response = await fetch(url);
        console.log(`Fetch response status: ${response.status}`);
        
        if (!response.ok) throw new Error('Failed to fetch courses');
        
        courses = await response.json();
        console.log(`✓ Fetched ${courses.length} courses`);
        return courses;
    } catch (error) {
        console.error('✗ Error fetching courses:', error);
        return [];
    }
}

async function getCourseById(courseId) {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}`);
        if (!response.ok) throw new Error('Course not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching course:', error);
        return null;
    }
}

async function createCourse(courseData) {
    try {
        const response = await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(courseData)
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        // Refresh courses list
        await fetchCourses();
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function deleteCourse(courseId) {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        // Refresh courses list
        await fetchCourses();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// ORDER & ENROLLMENT FUNCTIONS
// ============================================

async function createOrder(orderData) {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(orderData)
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        // Update current user with new enrollments
        const user = getCurrentUser();
        if (data.user) {
            user.enrolledCourses = data.user.enrolledCourses;
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch orders');
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// ============================================
// WISHLIST FUNCTIONS
// ============================================

async function addToWishlist(courseId) {
    try {
        const response = await fetch(`${API_URL}/users/wishlist/${courseId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        // Update current user
        const user = getCurrentUser();
        user.wishlist = data.wishlist;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function removeFromWishlist(courseId) {
    try {
        const response = await fetch(`${API_URL}/users/wishlist/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        // Update current user
        const user = getCurrentUser();
        user.wishlist = data.wishlist;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// FRONTEND DISPLAY FUNCTIONS
// ============================================

// Display Courses
async function displayCourses(filter = 'all') {
    const coursesGrid = document.getElementById('coursesGrid');
    console.log(`displayCourses called with filter: ${filter}`);
    console.log(`coursesGrid element found: ${coursesGrid !== null}`);
    
    if (!coursesGrid) {
        console.error('✗ coursesGrid element not found!');
        return;
    }
    
    coursesGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Loading courses...</p>';
    
    // Fetch courses from API
    console.log('Calling fetchCourses...');
    const fetchedCourses = await fetchCourses(filter);
    console.log(`Received ${fetchedCourses.length} courses from API`);
    
    courses = fetchedCourses;
    
    coursesGrid.innerHTML = '';

    if (courses.length === 0) {
        console.warn('⚠️ No courses found');
        coursesGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No courses found</p>';
        return;
    }

    console.log(`Rendering ${courses.length} course cards...`);
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
    
    console.log(`✓ Successfully displayed ${courses.length} courses`);
}

// Create Course Card
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.style.cursor = 'pointer';
    card.innerHTML = `
        <div class="course-image" style="background-image: url('${course.image}'); background-size: cover; background-position: center;">
        </div>
        <div class="course-content">
            <span class="course-badge">${getCategoryLabel(course.category)}</span>
            <h3>${course.title}</h3>
            <div class="course-info">
                <p>⏱️ ${course.duration}</p>
                <p>👥 ${course.students} Students Enrolled</p>
            </div>
            <div class="course-footer">
                <span class="course-price">₹${course.price.toLocaleString()}</span>
                <button class="course-btn" onclick="event.stopPropagation(); buyNow('${course._id}')">Buy Now</button>
            </div>
        </div>
    `;
    card.addEventListener('click', function() {
        window.location.href = `course-details.html?id=${course._id}`;
    });
    return card;
}

// Display Categories
function displayCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    const categories = [
        { name: "Web Development", icon: "🌐" },
        { name: "Data Science", icon: "📊" },
        { name: "Cloud & DevOps", icon: "☁️" },
        { name: "AI & ML", icon: "🤖" },
        { name: "Mobile Dev", icon: "📱" },
        { name: "Cybersecurity", icon: "🔒" }
    ];
    
    categoriesGrid.innerHTML = '';
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div style="font-size: 2.5rem;">${category.icon}</div>
            <h3>${category.name}</h3>
        `;
        categoryCard.onclick = () => filterCourses(getCategoryFilter(category.name));
        categoriesGrid.appendChild(categoryCard);
    });
}

// Get Category Label
function getCategoryLabel(category) {
    const labelMap = {
        'web-development': 'Web Development',
        'data-science': 'Data Science',
        'cloud': 'Cloud & DevOps',
        'ai-ml': 'AI & ML'
    };
    return labelMap[category] || 'Course';
}

// Get Category Filter
function getCategoryFilter(categoryName) {
    const filterMap = {
        'Web Development': 'web-development',
        'Data Science': 'data-science',
        'Cloud & DevOps': 'cloud',
        'AI & ML': 'ai-ml',
        'Mobile Dev': 'mobile',
        'Cybersecurity': 'security'
    };
    return filterMap[categoryName] || 'all';
}

// Filter Courses
async function filterCourses(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    if (category === 'all') {
        filterBtns[0]?.classList.add('active');
    } else {
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            }
        });
    }

    await displayCourses(category);
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterCourses(this.dataset.filter);
        });
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks?.classList.remove('active');
        });
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing!');
            this.reset();
        });
    }

    // Explore Courses button
    const exploreBtn = document.querySelector('.btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const coursesSection = document.getElementById('courses');
            if (coursesSection) {
                coursesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Modal close button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('courseModal');
        if (modal && e.target === modal) {
            closeModal();
        }
    });
}

// Modal Functions
function openModal(courseId) {
    const course = courses.find(c => c._id === courseId);
    if (!course) return;

    const modal = document.getElementById('courseModal');
    if (!modal) return;

    const titleEl = document.getElementById('modalTitle');
    const descEl = document.getElementById('modalDescription');
    const durationEl = document.getElementById('modalDuration');
    const studentsEl = document.getElementById('modalStudents');
    const priceEl = document.getElementById('modalPrice');

    if (titleEl) titleEl.textContent = course.title;
    if (descEl) descEl.textContent = course.description;
    if (durationEl) durationEl.textContent = course.duration;
    if (studentsEl) studentsEl.textContent = course.students;
    if (priceEl) priceEl.textContent = course.price;

    modal.style.display = 'block';

    const enrollBtn = document.getElementById('enrollBtn');
    if (enrollBtn) {
        enrollBtn.onclick = function() {
            alert(`You have enrolled in ${course.title}!`);
            closeModal();
        };
    }
}

function closeModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Buy Now Function
async function buyNow(courseId) {
    if (!isUserLoggedIn()) {
        if (confirm('You need to login to purchase courses. Redirect to login?')) {
            window.location.href = 'login.html';
        }
        return;
    }

    const course = courses.find(c => c._id === courseId);
    if (!course) return;
    
    localStorage.setItem('selectedCourse', JSON.stringify({
        id: course._id,
        title: course.title,
        price: course.price
    }));
    window.location.href = 'checkout.html';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
