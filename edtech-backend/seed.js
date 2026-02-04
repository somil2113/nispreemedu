require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const courses = [
    {
        title: "Generative AI & Machine Learning Engineer",
        category: "ai-ml",
        duration: "12 Weeks",
        students: "4K",
        price: 89500,
        description: "Master the fundamentals and advanced concepts of AI and ML with hands-on projects and real-world applications.",
        image: "https://plus.unsplash.com/premium_photo-1726672903451-187695204aaf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Dr. AI Expert",
        modules: [
            { title: "AI Fundamentals", lessons: ["Introduction to AI", "Machine Learning Basics", "Deep Learning"] },
            { title: "Advanced Concepts", lessons: ["Neural Networks", "NLP", "Computer Vision"] }
        ],
        requirements: ["Python", "Linear Algebra", "Basic Statistics"],
        learningPoints: ["Understand AI/ML concepts", "Build ML models", "Deploy ML applications"]
    },
    {
        title: "Full Stack Web Development",
        category: "web-development",
        duration: "8 Weeks",
        students: "3.5K",
        price: 49999,
        description: "Learn to build complete web applications using modern technologies like React, Node.js, and MongoDB.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        instructor: "Web Dev Master",
        modules: [
            { title: "Frontend Development", lessons: ["HTML/CSS", "JavaScript", "React"] },
            { title: "Backend Development", lessons: ["Node.js", "Express", "MongoDB"] }
        ],
        requirements: ["JavaScript", "Command Line", "Git"],
        learningPoints: ["Build responsive websites", "Create REST APIs", "Deploy applications"]
    },
    {
        title: "Data Science With Python",
        category: "data-science",
        duration: "10 Weeks",
        students: "5K",
        price: 59999,
        description: "Comprehensive data science course covering statistics, data visualization, and machine learning algorithms.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        instructor: "Data Scientist Pro",
        modules: [
            { title: "Data Analysis", lessons: ["Pandas", "NumPy", "Data Cleaning"] },
            { title: "Visualization", lessons: ["Matplotlib", "Seaborn", "Plotly"] }
        ],
        requirements: ["Python", "Statistics", "SQL"],
        learningPoints: ["Analyze data sets", "Create visualizations", "Build predictive models"]
    },
    {
        title: "Cloud & AWS DevOps Engineer",
        category: "cloud",
        duration: "9 Weeks",
        students: "2.8K",
        price: 69999,
        description: "Learn to deploy, manage, and scale applications on AWS cloud with CI/CD pipelines.",
        image: "https://images.unsplash.com/vector-1742999621152-286e6c68c770?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Cloud Architect",
        modules: [
            { title: "AWS Basics", lessons: ["EC2", "S3", "RDS"] },
            { title: "DevOps", lessons: ["Docker", "CI/CD", "Infrastructure as Code"] }
        ],
        requirements: ["Linux", "Networking", "Basic Programming"],
        learningPoints: ["Deploy on AWS", "Set up CI/CD", "Manage cloud infrastructure"]
    },
    {
        title: "AI Agent Development",
        category: "ai-ml",
        duration: "6 Weeks",
        students: "2K",
        price: 55000,
        description: "Build intelligent AI agents using LLMs and autonomous systems for real-world problems.",
        image: "https://plus.unsplash.com/premium_vector-1725757196726-2d35ab7d4477?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "AI Specialist",
        modules: [
            { title: "LLM Fundamentals", lessons: ["Transformers", "Fine-tuning", "Prompt Engineering"] },
            { title: "Agent Building", lessons: ["Agent Architecture", "Memory", "Tool Integration"] }
        ],
        requirements: ["Python", "NLP Knowledge", "ML Basics"],
        learningPoints: ["Build AI agents", "Use LLMs", "Create autonomous systems"]
    },
    {
        title: "React Advanced Concepts",
        category: "web-development",
        duration: "6 Weeks",
        students: "3K",
        price: 39999,
        description: "Deep dive into advanced React patterns, hooks, context API, and performance optimization.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "React Expert",
        modules: [
            { title: "Hooks & State", lessons: ["useState", "useEffect", "useContext"] },
            { title: "Performance", lessons: ["Optimization", "Code Splitting", "Lazy Loading"] }
        ],
        requirements: ["React Basics", "JavaScript ES6", "Components"],
        learningPoints: ["Master React hooks", "Optimize performance", "Build scalable apps"]
    },
    {
        title: "Data Engineering with Spark",
        category: "data-science",
        duration: "8 Weeks",
        students: "1.5K",
        price: 65000,
        description: "Learn to build scalable data pipelines using Apache Spark, Hadoop, and distributed systems.",
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop",
        instructor: "Data Engineer",
        modules: [
            { title: "Spark Basics", lessons: ["RDD", "DataFrames", "SQL"] },
            { title: "Pipelines", lessons: ["ETL", "Data Warehousing", "Stream Processing"] }
        ],
        requirements: ["Scala/Python", "SQL", "Distributed Systems"],
        learningPoints: ["Build data pipelines", "Process big data", "Optimize queries"]
    },
    {
        title: "Kubernetes & Docker",
        category: "cloud",
        duration: "7 Weeks",
        students: "2.2K",
        price: 49999,
        description: "Master containerization and orchestration with Docker and Kubernetes for microservices.",
        image: "https://images.unsplash.com/photo-1646627927863-19874c27316b?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Container Expert",
        modules: [
            { title: "Docker", lessons: ["Containers", "Images", "Docker Compose"] },
            { title: "Kubernetes", lessons: ["Pods", "Services", "Deployments"] }
        ],
        requirements: ["Linux", "Networking", "Application Architecture"],
        learningPoints: ["Containerize apps", "Orchestrate containers", "Deploy microservices"]
    },
    {
        title: "Natural Language Processing",
        category: "ai-ml",
        duration: "8 Weeks",
        students: "1.8K",
        price: 75000,
        description: "Explore NLP techniques, transformers, and build chatbots and text processing applications.",
        image: "https://plus.unsplash.com/premium_photo-1733317429945-a3688f50430b?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "NLP Specialist",
        modules: [
            { title: "NLP Basics", lessons: ["Tokenization", "Embeddings", "Word2Vec"] },
            { title: "Advanced", lessons: ["Transformers", "BERT", "GPT", "Chatbots"] }
        ],
        requirements: ["Python", "ML Basics", "Linear Algebra"],
        learningPoints: ["Process text", "Build chatbots", "Sentiment analysis"]
    },
    {
        title: "Next.js Full Stack",
        category: "web-development",
        duration: "7 Weeks",
        students: "2.5K",
        price: 44999,
        description: "Build modern full-stack applications with Next.js, handling both frontend and backend seamlessly.",
        image: "https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Next.js Developer",
        modules: [
            { title: "Next.js Basics", lessons: ["Routing", "Static Generation", "Server-Side Rendering"] },
            { title: "Full Stack", lessons: ["API Routes", "Database", "Deployment"] }
        ],
        requirements: ["React", "JavaScript", "Node.js"],
        learningPoints: ["Build full-stack apps", "Optimize performance", "Deploy with Vercel"]
    },
    {
        title: "Analytics & Business Intelligence",
        category: "data-science",
        duration: "6 Weeks",
        students: "2.3K",
        price: 45000,
        description: "Learn to create powerful dashboards and insights using Tableau, Power BI, and SQL.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "BI Analyst",
        modules: [
            { title: "SQL", lessons: ["Queries", "Aggregation", "Joins"] },
            { title: "BI Tools", lessons: ["Tableau", "Power BI", "Dashboards"] }
        ],
        requirements: ["SQL", "Statistics", "Data Analysis"],
        learningPoints: ["Create dashboards", "Extract insights", "Present data"]
    },
    {
        title: "Azure Cloud Solutions",
        category: "cloud",
        duration: "8 Weeks",
        students: "1.9K",
        price: 59999,
        description: "Become an Azure Solutions Architect and deploy enterprise-scale applications on Microsoft Azure.",
        image: "https://images.unsplash.com/photo-1662052955282-da15376f3919?q=80&w=1724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Azure Expert",
        modules: [
            { title: "Azure Basics", lessons: ["VMs", "App Services", "Databases"] },
            { title: "Advanced", lessons: ["AI/ML", "IoT", "Enterprise Integration"] }
        ],
        requirements: ["Cloud Basics", "Networking", "Windows/Linux"],
        learningPoints: ["Deploy on Azure", "Design solutions", "Manage resources"]
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edtech');
        console.log('Connected to MongoDB');

        // Clear existing courses
        await Course.deleteMany({});
        console.log('Cleared existing courses');

        // Insert new courses
        const insertedCourses = await Course.insertMany(courses);
        console.log(`Seeded ${insertedCourses.length} courses successfully`);

        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
