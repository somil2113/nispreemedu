const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const { category } = req.query;
        
        let filter = {};
        if (category) {
            filter.category = category;
        }

        const courses = await Course.find(filter);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new course (admin only)
exports.createCourse = async (req, res) => {
    try {
        const { title, description, category, price, duration, image, instructor } = req.body;

        // Validate input
        if (!title || !description || !category || !price || !duration) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const course = new Course({
            title,
            description,
            category,
            price,
            duration,
            image: image || '',
            instructor: instructor || 'Gurukul Instructor',
        });

        await course.save();
        res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update course (admin only)
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete course (admin only)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
