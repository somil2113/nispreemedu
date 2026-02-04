const Order = require('../models/Order');
const User = require('../models/User');
const Course = require('../models/Course');

// Create order
exports.createOrder = async (req, res) => {
    try {
        const { courseId, amount, discount, tax, paymentMethod, billingInfo, promoCode } = req.body;

        // Validate input
        if (!courseId || !amount || !paymentMethod || !billingInfo) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Create order
        const order = new Order({
            userId: req.user.id,
            courseId,
            amount,
            discount: discount || 0,
            tax: tax || 0,
            totalAmount: amount - (discount || 0) + (tax || 0),
            paymentMethod,
            billingInfo,
            promoCode: promoCode || null,
            paymentStatus: 'completed', // In real scenario, integrate with payment gateway
        });

        await order.save();

        // Enroll user in course
        const user = await User.findById(req.user.id);
        if (!user.enrolledCourses.some(e => e.courseId.toString() === courseId)) {
            user.enrolledCourses.push({ courseId, progress: 0 });
        }
        await user.save();

        res.status(201).json({ 
            message: 'Order created successfully', 
            order,
            enrolled: true 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate('courseId')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .populate('courseId', 'title price')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId')
            .populate('courseId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if user is owner or admin
        if (order.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
