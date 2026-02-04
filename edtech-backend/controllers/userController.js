const User = require('../models/User');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name: name || undefined, email: email || undefined },
            { new: true }
        ).select('-password');

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add course to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { courseId } = req.body;

        const user = await User.findById(req.user.id);
        
        // Check if course is already in wishlist
        if (user.wishlist.includes(courseId)) {
            return res.status(400).json({ message: 'Course already in wishlist' });
        }

        user.wishlist.push(courseId);
        await user.save();

        res.json({ message: 'Added to wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove course from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { courseId } = req.body;

        const user = await User.findById(req.user.id);
        user.wishlist = user.wishlist.filter(id => id.toString() !== courseId);
        await user.save();

        res.json({ message: 'Removed from wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('enrolledCourses.courseId');
        res.json(user.enrolledCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update course progress
exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, progress } = req.body;

        const user = await User.findById(req.user.id);
        const enrolledCourse = user.enrolledCourses.find(e => e.courseId.toString() === courseId);

        if (!enrolledCourse) {
            return res.status(404).json({ message: 'Course not enrolled' });
        }

        enrolledCourse.progress = Math.min(progress, 100);
        await user.save();

        res.json({ message: 'Progress updated', progress: enrolledCourse.progress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
