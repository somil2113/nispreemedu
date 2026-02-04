const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['web-development', 'data-science', 'cloud', 'ai-ml'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    students: {
        type: String,
        default: '0',
    },
    image: {
        type: String,
        default: '',
    },
    instructor: {
        type: String,
        default: 'Gurukul Instructor',
    },
    modules: [{
        title: String,
        lessons: [String],
    }],
    requirements: [String],
    learningPoints: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Course', courseSchema);
