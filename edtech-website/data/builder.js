
const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../../edtech-backend/seed.js');
const outputPath = path.join(__dirname, 'courses_data.js');

let content = fs.readFileSync(seedPath, 'utf8');

// 1. Remove requires
content = content.replace(/require\(.*?\);/g, '');

// 2. Remove the seedDatabase function call and definition at the bottom
// We look for where "async function seedDatabase" starts and cut everything after
const funcStart = content.indexOf('async function seedDatabase');
if (funcStart !== -1) {
    content = content.substring(0, funcStart);
}

// 3. Remove "const courses =" declaration to just get the array
// We'll wrap it ourselves later
content = content.replace('const courses =', 'const RAW_COURSES =');

// 4. Construct various IDs
const finalContent = `
${content}

// Add IDs to courses
const MOCK_COURSES = RAW_COURSES.map((c, i) => ({
    ...c,
    _id: "course_" + (i + 1).toString().padStart(3, '0')
}));
`;

fs.writeFileSync(outputPath, finalContent);
console.log('Successfully generated courses_data.js from seed.js');
