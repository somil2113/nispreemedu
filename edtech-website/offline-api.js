// ============================================
// MOCK DATA HANDLING (Replaces Backend API)
// ============================================

// Key for LocalStorage
const STORAGE_KEYS = {
    USERS: 'gurukul_users',
    CURRENT_USER: 'gurukul_current_user',
    AUTH_TOKEN: 'gurukul_auth_token',
    ORDERS: 'gurukul_orders',
    COURSES: 'gurukul_courses' // Only needed if we allow creating courses offline
};

// Initialize Mock Data if empty
function initializeMockData() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        // Create a default admin user
        const adminUser = {
            _id: 'user_admin_001',
            name: 'Admin User',
            email: 'admin@gurukul.com',
            password: 'password123', // In a real app this would be hashed
            role: 'admin',
            enrolledCourses: [],
            wishlist: []
        };
        const studentUser = {
            _id: 'user_student_001', 
            name: 'Student User',
            email: 'student@gurukul.com',
            password: 'password123',
            role: 'student',
            enrolledCourses: [],
            wishlist: []
        };
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([adminUser, studentUser]));
    }
    
    // Use the static MOCK_COURSES from courses_data.js as our "Database"
    // We don't necessarily need to persist them to localStorage unless we edit them
}

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// AUTHENTICATION SUBSTITUTES
// ============================================

function getCurrentUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userStr ? JSON.parse(userStr) : null;
}

function isUserLoggedIn() {
    return !!localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
}

function isUserAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN); // Just a dummy token now
}

async function registerUser(name, email, password, role = 'student') {
    await delay(500); // Simulate network
    
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    if (users.find(u => u.email === email)) {
        return { success: false, error: 'User already exists' };
    }
    
    const newUser = {
        _id: 'user_' + Date.now(),
        name,
        email,
        password, // storing plain text for this local-only demo
        role,
        enrolledCourses: [],
        wishlist: []
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Auto-login
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock-jwt-token-' + Date.now());
    
    return { success: true, data: { user: newUser, token: 'mock-token' } };
}

async function loginUser(email, password) {
    await delay(500);
    
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return { success: false, error: 'Invalid credentials' };
    }
    
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock-jwt-token-' + Date.now());
    
    return { success: true, data: { user, token: 'mock-token' } };
}

function logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem('selectedCourse');
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutItems');
    window.location.href = 'index.html';
}

async function fetchUserProfile() {
    // In local mode, the current user in storage IS the profile
    return getCurrentUser(); 
}

// ============================================
// COURSE FUNCTIONS
// ============================================

// Global variables for frontend display logic
let courses = [];
let currentPage = 1;
const coursesPerPage = 10;

async function fetchCourses(category = 'all', page = 1) {
    await delay(300);
    
    // Filter by category
    let filteredCourses = MOCK_COURSES;
    if (category && category !== 'all') {
        filteredCourses = MOCK_COURSES.filter(c => c.category === category);
    }
    
    // Pagination logic
    const totalCourses = filteredCourses.length;
    const totalPages = Math.ceil(totalCourses / coursesPerPage);
    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
    
    courses = paginatedCourses; // Update global variable used by UI
    
    return {
        courses: paginatedCourses,
        totalPages,
        currentPage: page,
        totalCourses
    };
}

async function getCourseById(courseId) {
    await delay(200);
    return MOCK_COURSES.find(c => c._id === courseId);
}

// ============================================
// ORDER & ENROLLMENT FUNCTIONS
// ============================================

async function createOrder(orderData) {
    await delay(800);
    
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, error: 'Not logged in' };
    
    // Create Order Record
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const newOrder = {
        _id: 'order_' + Date.now(),
        user: currentUser._id,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        status: 'completed',
        date: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    
    // Update User Enrollments
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const userIndex = users.findIndex(u => u._id === currentUser._id);
    
    if (userIndex !== -1) {
        // Add course IDs to user's enrolled list
        const courseIds = orderData.items.map(item => item.course);
        const currentEnrollments = users[userIndex].enrolledCourses || [];
        
        // Avoid duplicates
        const newEnrollments = [...new Set([...currentEnrollments, ...courseIds])];
        users[userIndex].enrolledCourses = newEnrollments;
        
        // Save back to storage
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        
        // Update current session user
        currentUser.enrolledCourses = newEnrollments;
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
        
        return { success: true, data: { order: newOrder, user: currentUser } };
    }
    return { success: false, error: 'User not found' };
}

// ============================================
// INITIALIZATION
// ============================================

// Run on load
initializeMockData();
console.log('✓ offline-api.js loaded - Running in Offline/Local Mode');
