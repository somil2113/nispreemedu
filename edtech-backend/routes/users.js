const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/enrolled-courses', authMiddleware, userController.getEnrolledCourses);
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.post('/wishlist/add', authMiddleware, userController.addToWishlist);
router.post('/wishlist/remove', authMiddleware, userController.removeFromWishlist);
router.put('/course-progress', authMiddleware, userController.updateCourseProgress);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, adminMiddleware, userController.getUserById);

module.exports = router;
