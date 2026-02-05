require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const courses = [
    // ============= EXISTING COURSES (AI-ML, Web, Data Science, Cloud) =============
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
    },

    // ============= MUSIC & CREATIVE ARTS =============
    {
        title: "Music Theory for Modern Producers",
        category: "music-creative",
        duration: "8 Weeks",
        students: "1.2K",
        price: 29999,
        description: "Mastering scales, chords, and melody for modern music production.",
        image: "https://plus.unsplash.com/premium_photo-1723618909795-f5ee30cf5697?q=80&w=1678&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Music Theorist",
        modules: [
            { title: "Music Fundamentals", lessons: ["Scales", "Chords", "Progressions"] },
            { title: "Composition", lessons: ["Melody Writing", "Harmony", "Arrangement"] }
        ],
        requirements: ["Basic Music Knowledge", "Piano/DAW"],
        learningPoints: ["Understand music theory", "Write compositions", "Produce melodies"]
    },
    {
        title: "Indian Classical Foundations: Raga & Rhythm",
        category: "music-creative",
        duration: "10 Weeks",
        students: "800",
        price: 35000,
        description: "Understanding the soul of Indian music through Raga and Taal.",
        image: "https://images.unsplash.com/photo-1633411988188-6e63354a9019?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Classical Maestro",
        modules: [
            { title: "Raga System", lessons: ["Raga Theory", "Classification", "Performance"] },
            { title: "Rhythm", lessons: ["Taal", "Laya", "Complex Rhythms"] }
        ],
        requirements: ["Music Interest", "Patience"],
        learningPoints: ["Master Ragas", "Understand Taal", "Perform classical music"]
    },
    {
        title: "The Business of Music",
        category: "music-creative",
        duration: "6 Weeks",
        students: "950",
        price: 24999,
        description: "Licensing, distribution, and royalties in the modern music industry.",
        image: "https://images.unsplash.com/photo-1593697972646-2f348871bd56?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Music Exec",
        modules: [
            { title: "Distribution", lessons: ["Platforms", "Royalties", "Licensing"] },
            { title: "Artist Management", lessons: ["Contracts", "Promotion", "Revenue Streams"] }
        ],
        requirements: ["Music Knowledge", "Business Basics"],
        learningPoints: ["Monetize music", "Understand licenses", "Manage careers"]
    },
    {
        title: "Logic Pro for Advanced Sound Design",
        category: "music-creative",
        duration: "7 Weeks",
        students: "1.1K",
        price: 32999,
        description: "Creating unique synth patches and textures with Logic Pro.",
        image: "https://images.unsplash.com/photo-1703117104853-31800b2e2a70?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Sound Designer",
        modules: [
            { title: "Logic Basics", lessons: ["Interface", "Workflow", "Plugins"] },
            { title: "Sound Design", lessons: ["Synthesis", "Effects", "Textures"] }
        ],
        requirements: ["Logic Pro", "Audio Basics"],
        learningPoints: ["Create synths", "Design sounds", "Produce music"]
    },
    {
        title: "Vocal Performance & Breath Control",
        category: "music-creative",
        duration: "8 Weeks",
        students: "1.4K",
        price: 27999,
        description: "Professional techniques for aspiring singers and performers.",
        image: "https://images.unsplash.com/photo-1595422656857-ced3a4a0ce25?q=80&w=816&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Vocal Coach",
        modules: [
            { title: "Fundamentals", lessons: ["Breathing", "Posture", "Warm-ups"] },
            { title: "Performance", lessons: ["Projection", "Expression", "Stamina"] }
        ],
        requirements: ["Passion for Singing"],
        learningPoints: ["Improve vocal quality", "Control breathing", "Perform confidently"]
    },
    {
        title: "Songwriting: From Lyrics to Hook",
        category: "music-creative",
        duration: "6 Weeks",
        students: "1.3K",
        price: 25999,
        description: "Crafting radio-ready songs with compelling lyrics and hooks.",
        image: "https://plus.unsplash.com/premium_photo-1726848367163-e16a527ddd84?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Hit Songwriter",
        modules: [
            { title: "Songcraft", lessons: ["Song Structure", "Lyrics", "Melodies"] },
            { title: "Production", lessons: ["Arrangement", "Hooks", "Mixing"] }
        ],
        requirements: ["Music Basics", "Creativity"],
        learningPoints: ["Write hit songs", "Create hooks", "Tell stories"]
    },
    {
        title: "The Art of Foley: Sound Effects for Film",
        category: "music-creative",
        duration: "7 Weeks",
        students: "680",
        price: 33999,
        description: "Creating realistic sound effects for visual media.",
        image: "https://images.unsplash.com/photo-1763627516727-2ca3e324fa59?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Foley Artist",
        modules: [
            { title: "Foley Basics", lessons: ["Tools", "Techniques", "Recording"] },
            { title: "Film Sync", lessons: ["Timing", "Editing", "Mixing"] }
        ],
        requirements: ["Audio Equipment", "Film Knowledge"],
        learningPoints: ["Create Foley effects", "Sync to video", "Enhance storytelling"]
    },
    {
        title: "Digital Cinematography for Music Videos",
        category: "music-creative",
        duration: "8 Weeks",
        students: "920",
        price: 39999,
        description: "Visual storytelling for music videos on a budget.",
        image: "https://plus.unsplash.com/premium_photo-1682146749338-f380c93c8dec?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Music Video Director",
        modules: [
            { title: "Cinematography", lessons: ["Camera Techniques", "Lighting", "Composition"] },
            { title: "Editing", lessons: ["Video Editing", "Color Grading", "Effects"] }
        ],
        requirements: ["Camera", "Video Editing Software"],
        learningPoints: ["Direct music videos", "Tell visual stories", "Create compelling content"]
    },
    {
        title: "History of Western Music: Bach to Billie Eilish",
        category: "music-creative",
        duration: "9 Weeks",
        students: "1.5K",
        price: 22999,
        description: "A journey through musical genres and their evolution.",
        image: "https://images.unsplash.com/photo-1583331083321-0d4fd2b03cc5?q=80&w=1560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Music Historian",
        modules: [
            { title: "Classical Era", lessons: ["Bach", "Mozart", "Beethoven"] },
            { title: "Modern Music", lessons: ["Jazz", "Rock", "Contemporary"] }
        ],
        requirements: ["Music Interest"],
        learningPoints: ["Understand music history", "Appreciate genres", "Trace evolution"]
    },
    {
        title: "Jazz Improvisation for Beginners",
        category: "music-creative",
        duration: "8 Weeks",
        students: "850",
        price: 31999,
        description: "Breaking the rules of conventional music through jazz improvisation.",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        instructor: "Jazz Musician",
        modules: [
            { title: "Jazz Basics", lessons: ["Standards", "Scales", "Chords"] },
            { title: "Improvisation", lessons: ["Solo Skills", "Listening", "Interaction"] }
        ],
        requirements: ["Musical Instrument", "Jazz Interest"],
        learningPoints: ["Improvise confidently", "Play jazz standards", "Interact with musicians"]
    },

    // ============= SOCIAL SCIENCES & HUMANITIES =============
    {
        title: "Introduction to Social Psychology",
        category: "social-humanities",
        duration: "6 Weeks",
        students: "2.1K",
        price: 19999,
        description: "Why humans behave the way they do in groups and society.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        instructor: "Social Psychologist",
        modules: [
            { title: "Core Concepts", lessons: ["Attitudes", "Influence", "Groups"] },
            { title: "Applications", lessons: ["Behavior", "Culture", "Prejudice"] }
        ],
        requirements: ["Psychology Interest"],
        learningPoints: ["Understand behavior", "Analyze group dynamics", "Apply psychology"]
    },
    {
        title: "Criminology: Understanding the Criminal Mind",
        category: "social-humanities",
        duration: "8 Weeks",
        students: "1.8K",
        price: 28999,
        description: "A dive into behavioral science and criminal behavior.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
        instructor: "Criminologist",
        modules: [
            { title: "Crime Theories", lessons: ["Criminological Theories", "Deviance", "Etiology"] },
            { title: "Analysis", lessons: ["Offender Psychology", "Justice System", "Prevention"] }
        ],
        requirements: ["Psychology/Sociology Basics"],
        learningPoints: ["Understand crime", "Analyze behavior", "Study justice"]
    },
    {
        title: "Modern Political Systems & Governance",
        category: "social-humanities",
        duration: "7 Weeks",
        students: "2.3K",
        price: 24999,
        description: "How different nations are ruled and governed.",
        image: "https://images.unsplash.com/photo-1577270797237-7a0ee3a76565?w=600&h=400&fit=crop",
        instructor: "Political Scientist",
        modules: [
            { title: "Government Types", lessons: ["Democracy", "Autocracy", "Hybrid Systems"] },
            { title: "Global Politics", lessons: ["International Relations", "Policy", "Law"] }
        ],
        requirements: ["Politics Interest"],
        learningPoints: ["Understand governance", "Compare systems", "Analyze policy"]
    },
    {
        title: "Classical Sociological Theory",
        category: "social-humanities",
        duration: "9 Weeks",
        students: "1.2K",
        price: 21999,
        description: "Marx, Durkheim, and Weber in the 21st century context.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        instructor: "Sociologist",
        modules: [
            { title: "Classical Theorists", lessons: ["Marx", "Durkheim", "Weber"] },
            { title: "Modern Application", lessons: ["Society", "Class", "Culture"] }
        ],
        requirements: ["Sociology Basics"],
        learningPoints: ["Master classical theories", "Apply to modern society", "Critique systems"]
    },
    {
        title: "Cultural Anthropology: Exploring Human Diversity",
        category: "social-humanities",
        duration: "8 Weeks",
        students: "1.6K",
        price: 23999,
        description: "Studying global traditions and cultural practices.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
        instructor: "Anthropologist",
        modules: [
            { title: "Cultures", lessons: ["Ethnography", "Customs", "Traditions"] },
            { title: "Diversity", lessons: ["Language", "Religion", "Values"] }
        ],
        requirements: ["Cultural Interest"],
        learningPoints: ["Understand cultures", "Appreciate diversity", "Study traditions"]
    },
    {
        title: "Ethical Philosophy: Right vs. Wrong",
        category: "social-humanities",
        duration: "7 Weeks",
        students: "1.4K",
        price: 20999,
        description: "Exploring moral dilemmas and ethical theories.",
        image: "https://images.unsplash.com/photo-1545985542349-192a993e8816?w=600&h=400&fit=crop",
        instructor: "Ethicist",
        modules: [
            { title: "Ethics Basics", lessons: ["Virtue Ethics", "Deontology", "Consequentialism"] },
            { title: "Dilemmas", lessons: ["Moral Issues", "Debates", "Application"] }
        ],
        requirements: ["Philosophy Interest"],
        learningPoints: ["Analyze ethics", "Solve dilemmas", "Think critically"]
    },
    {
        title: "International Relations & Global Diplomacy",
        category: "social-humanities",
        duration: "8 Weeks",
        students: "1.7K",
        price: 26999,
        description: "How countries interact, cooperate, and conflict.",
        image: "https://images.unsplash.com/photo-1577720643272-265f434a31a4?w=600&h=400&fit=crop",
        instructor: "Diplomat",
        modules: [
            { title: "International Systems", lessons: ["Diplomacy", "Treaties", "Organizations"] },
            { title: "Global Issues", lessons: ["Trade", "Security", "Cooperation"] }
        ],
        requirements: ["Political Interest"],
        learningPoints: ["Understand diplomacy", "Analyze conflicts", "Study cooperation"]
    },
    {
        title: "Women's Studies: History & Impact",
        category: "social-humanities",
        duration: "7 Weeks",
        students: "1.9K",
        price: 22999,
        description: "The evolution of gender roles and women's impact on society.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        instructor: "Gender Scholar",
        modules: [
            { title: "History", lessons: ["Women's Rights", "Feminism", "Movements"] },
            { title: "Contemporary", lessons: ["Gender Issues", "Equality", "Culture"] }
        ],
        requirements: ["History/Sociology Interest"],
        learningPoints: ["Understand women's history", "Analyze gender", "Study impact"]
    },
    {
        title: "Digital Sociology: Life in the Age of Algorithms",
        category: "social-humanities",
        duration: "6 Weeks",
        students: "1.5K",
        price: 25999,
        description: "How the internet and algorithms reshape society.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
        instructor: "Digital Sociologist",
        modules: [
            { title: "Digital Cultures", lessons: ["Social Media", "Online Identity", "Community"] },
            { title: "Algorithms & Society", lessons: ["Data", "Privacy", "Impact"] }
        ],
        requirements: ["Technology Interest", "Sociology Basics"],
        learningPoints: ["Understand digital culture", "Analyze algorithms", "Study impact"]
    },
    {
        title: "Environmental Ethics & Sustainability",
        category: "social-humanities",
        duration: "7 Weeks",
        students: "1.8K",
        price: 23999,
        description: "The philosophy of protecting the planet.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
        instructor: "Environmental Ethicist",
        modules: [
            { title: "Environmental Ethics", lessons: ["Philosophy", "Values", "Responsibility"] },
            { title: "Sustainability", lessons: ["Green Practice", "Policy", "Solutions"] }
        ],
        requirements: ["Environmental Interest", "Ethics Basics"],
        learningPoints: ["Understand environmental ethics", "Develop sustainable practices", "Lead change"]
    },

    // ============= PURE SCIENCES =============
    {
        title: "Astrophysics: Understanding the Universe",
        category: "pure-sciences",
        duration: "10 Weeks",
        students: "1.3K",
        price: 34999,
        description: "From black holes to the Big Bang - understanding cosmic phenomena.",
        image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop",
        instructor: "Astrophysicist",
        modules: [
            { title: "Cosmology", lessons: ["Big Bang", "Expansion", "Universe Structure"] },
            { title: "Stellar Objects", lessons: ["Stars", "Black Holes", "Galaxies"] }
        ],
        requirements: ["Physics Basics", "Math"],
        learningPoints: ["Understand universe", "Study cosmic objects", "Solve astrophysics problems"]
    },
    {
        title: "The Science of Well-being",
        category: "pure-sciences",
        duration: "6 Weeks",
        students: "2.2K",
        price: 21999,
        description: "The biology and psychology behind happiness and well-being.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3cff08e7?w=600&h=400&fit=crop",
        instructor: "Positive Psychologist",
        modules: [
            { title: "Well-being Science", lessons: ["Brain", "Happiness", "Health"] },
            { title: "Practices", lessons: ["Mindfulness", "Exercise", "Relationships"] }
        ],
        requirements: ["Psychology/Biology Interest"],
        learningPoints: ["Understand well-being", "Improve happiness", "Healthy living"]
    },
    {
        title: "Molecular Biology & Genetics",
        category: "pure-sciences",
        duration: "9 Weeks",
        students: "1.6K",
        price: 32999,
        description: "Exploring the building blocks of life and heredity.",
        image: "https://images.unsplash.com/photo-1576091160550-112173e7f869?w=600&h=400&fit=crop",
        instructor: "Geneticist",
        modules: [
            { title: "Molecular Biology", lessons: ["DNA", "RNA", "Protein Synthesis"] },
            { title: "Genetics", lessons: ["Inheritance", "Mutations", "Expression"] }
        ],
        requirements: ["Biology Basics", "Chemistry"],
        learningPoints: ["Understand genetics", "Study molecular biology", "Genetic research"]
    },
    {
        title: "Sustainable Chemistry: Green Solutions",
        category: "pure-sciences",
        duration: "7 Weeks",
        students: "1.1K",
        price: 26999,
        description: "Chemistry for reducing environmental impact.",
        image: "https://images.unsplash.com/photo-1585968946966-54fe64f46e7a?w=600&h=400&fit=crop",
        instructor: "Green Chemist",
        modules: [
            { title: "Green Chemistry", lessons: ["Principles", "Materials", "Processes"] },
            { title: "Applications", lessons: ["Energy", "Manufacturing", "Waste"] }
        ],
        requirements: ["Chemistry Basics"],
        learningPoints: ["Design sustainable solutions", "Reduce waste", "Green manufacturing"]
    },
    {
        title: "Neuroscience: How the Brain Works",
        category: "pure-sciences",
        duration: "9 Weeks",
        students: "1.9K",
        price: 35999,
        description: "Mapping the human mind and understanding neurological processes.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
        instructor: "Neuroscientist",
        modules: [
            { title: "Brain Basics", lessons: ["Anatomy", "Neurons", "Neurotransmitters"] },
            { title: "Cognition", lessons: ["Memory", "Learning", "Consciousness"] }
        ],
        requirements: ["Biology Basics"],
        learningPoints: ["Understand brain", "Study neuroscience", "Neurological research"]
    },
    {
        title: "Forensic Science & Crime Scene Investigation",
        category: "pure-sciences",
        duration: "8 Weeks",
        students: "1.7K",
        price: 31999,
        description: "The science behind forensic analysis and criminal investigation.",
        image: "https://images.unsplash.com/photo-1576091160688-112199c87b10?w=600&h=400&fit=crop",
        instructor: "Forensic Scientist",
        modules: [
            { title: "Forensic Methods", lessons: ["DNA Analysis", "Evidence", "Collection"] },
            { title: "Investigation", lessons: ["Crime Scene", "Analysis", "Testimony"] }
        ],
        requirements: ["Biology/Chemistry Basics"],
        learningPoints: ["Analyze evidence", "Investigate crimes", "Apply science to justice"]
    },
    {
        title: "Evolutionary Biology: The Origin of Species",
        category: "pure-sciences",
        duration: "8 Weeks",
        students: "1.4K",
        price: 28999,
        description: "Tracking life's journey through evolution.",
        image: "https://images.unsplash.com/photo-1532619927891-8a373008e6f3?w=600&h=400&fit=crop",
        instructor: "Evolutionary Biologist",
        modules: [
            { title: "Evolution Theory", lessons: ["Natural Selection", "Adaptation", "Speciation"] },
            { title: "Evidence", lessons: ["Fossils", "Genetics", "Comparative Biology"] }
        ],
        requirements: ["Biology Basics"],
        learningPoints: ["Understand evolution", "Analyze evidence", "Study adaptation"]
    },
    {
        title: "Quantum Mechanics for Non-Physicists",
        category: "pure-sciences",
        duration: "9 Weeks",
        students: "1.2K",
        price: 33999,
        description: "Understanding the subatomic world and quantum phenomena.",
        image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=400&fit=crop",
        instructor: "Quantum Physicist",
        modules: [
            { title: "Quantum Basics", lessons: ["Particles", "Waves", "Uncertainty"] },
            { title: "Applications", lessons: ["Quantum Computing", "Teleportation", "Entanglement"] }
        ],
        requirements: ["Physics Basics", "Math"],
        learningPoints: ["Understand quantum mechanics", "Study subatomic world", "Learn applications"]
    },
    {
        title: "Epidemiology: How Diseases Spread",
        category: "pure-sciences",
        duration: "7 Weeks",
        students: "1.5K",
        price: 27999,
        description: "Lessons from epidemiology and pandemic response.",
        image: "https://images.unsplash.com/photo-1576091160550-112173e7f869?w=600&h=400&fit=crop",
        instructor: "Epidemiologist",
        modules: [
            { title: "Disease Dynamics", lessons: ["Transmission", "Models", "Outbreaks"] },
            { title: "Public Health", lessons: ["Prevention", "Response", "Policy"] }
        ],
        requirements: ["Biology/Math Basics"],
        learningPoints: ["Understand disease spread", "Study epidemiology", "Pandemic preparedness"]
    },
    {
        title: "Bioinformatics: Where Biology Meets Data",
        category: "pure-sciences",
        duration: "8 Weeks",
        students: "1.1K",
        price: 38999,
        description: "Combining biological science with data science and programming.",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop",
        instructor: "Bioinformatician",
        modules: [
            { title: "Bioinformatics Basics", lessons: ["Sequences", "Databases", "Tools"] },
            { title: "Applications", lessons: ["Genomics", "Protein Analysis", "Drug Discovery"] }
        ],
        requirements: ["Biology Basics", "Programming", "Data Science"],
        learningPoints: ["Analyze biological data", "Genomic research", "Discover drugs"]
    },

    // ============= MATHEMATICS & LOGIC =============
    {
        title: "Advanced Calculus & Differential Equations",
        category: "mathematics-logic",
        duration: "10 Weeks",
        students: "1.3K",
        price: 29999,
        description: "Essential calculus concepts for engineering and science.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f70504eeb?w=600&h=400&fit=crop",
        instructor: "Math Professor",
        modules: [
            { title: "Calculus", lessons: ["Derivatives", "Integrals", "Series"] },
            { title: "Differential Equations", lessons: ["First Order", "Higher Order", "Systems"] }
        ],
        requirements: ["Precalculus", "Calculus I & II"],
        learningPoints: ["Master advanced calculus", "Solve differential equations", "Apply to engineering"]
    },
    {
        title: "Linear Algebra for Real-World Apps",
        category: "mathematics-logic",
        duration: "8 Weeks",
        students: "1.8K",
        price: 25999,
        description: "Essential foundation for AI, ML, and data science.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        instructor: "Math Specialist",
        modules: [
            { title: "Linear Algebra", lessons: ["Vectors", "Matrices", "Eigenvalues"] },
            { title: "Applications", lessons: ["Computer Graphics", "ML", "Data Analysis"] }
        ],
        requirements: ["Algebra Basics"],
        learningPoints: ["Master linear algebra", "Apply to AI/ML", "Solve real problems"]
    },
    {
        title: "The Power of Mathematical Logic",
        category: "mathematics-logic",
        duration: "7 Weeks",
        students: "900",
        price: 21999,
        description: "Deductive reasoning, proofs, and logical foundations.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
        instructor: "Logic Expert",
        modules: [
            { title: "Logic Basics", lessons: ["Propositions", "Inference", "Proofs"] },
            { title: "Applications", lessons: ["Set Theory", "Computability", "Philosophy"] }
        ],
        requirements: ["Math Basics"],
        learningPoints: ["Master logical reasoning", "Build proofs", "Apply logic"]
    },
    {
        title: "Game Theory: Strategic Decision Making",
        category: "mathematics-logic",
        duration: "7 Weeks",
        students: "1.2K",
        price: 27999,
        description: "Math applied to economics, strategy, and decision making.",
        image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop",
        instructor: "Game Theorist",
        modules: [
            { title: "Game Basics", lessons: ["Nash Equilibrium", "Strategy", "Payoffs"] },
            { title: "Applications", lessons: ["Economics", "Evolution", "Politics"] }
        ],
        requirements: ["Math Basics", "Economics Interest"],
        learningPoints: ["Understand game theory", "Analyze strategies", "Make decisions"]
    },
    {
        title: "Discrete Mathematics for Computer Science",
        category: "mathematics-logic",
        duration: "8 Weeks",
        students: "1.1K",
        price: 26999,
        description: "Algorithms, graph theory, and computational foundations.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
        instructor: "CS Mathematician",
        modules: [
            { title: "Discrete Math", lessons: ["Sets", "Logic", "Graph Theory"] },
            { title: "Algorithms", lessons: ["Complexity", "Sorting", "Dynamic Programming"] }
        ],
        requirements: ["Math Basics", "Programming"],
        learningPoints: ["Master discrete math", "Design algorithms", "Analyze complexity"]
    },
    {
        title: "Probability: The Science of Uncertainty",
        category: "mathematics-logic",
        duration: "7 Weeks",
        students: "1.4K",
        price: 24999,
        description: "Making predictions and decisions with probability.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        instructor: "Statistician",
        modules: [
            { title: "Probability Theory", lessons: ["Distributions", "Bayes", "Inference"] },
            { title: "Applications", lessons: ["Statistics", "Machine Learning", "Decision Making"] }
        ],
        requirements: ["Algebra Basics", "Math"],
        learningPoints: ["Understand probability", "Apply statistics", "Make predictions"]
    },
    {
        title: "Geometry in Art & Architecture",
        category: "mathematics-logic",
        duration: "6 Weeks",
        students: "1.0K",
        price: 20999,
        description: "The math behind beautiful structures and art.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
        instructor: "Geometry Artist",
        modules: [
            { title: "Geometric Principles", lessons: ["Shapes", "Symmetry", "Proportion"] },
            { title: "Applications", lessons: ["Architecture", "Design", "Art"] }
        ],
        requirements: ["Geometry Basics"],
        learningPoints: ["Understand geometric design", "Apply to architecture", "Create beauty"]
    },
    {
        title: "Financial Mathematics: The Logic of Money",
        category: "mathematics-logic",
        duration: "8 Weeks",
        students: "1.5K",
        price: 32999,
        description: "Interest, risk, derivatives, and financial modeling.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        instructor: "Finance Mathematician",
        modules: [
            { title: "Financial Theory", lessons: ["Time Value", "Risk", "Valuation"] },
            { title: "Instruments", lessons: ["Bonds", "Options", "Derivatives"] }
        ],
        requirements: ["Calculus", "Probability", "Finance Basics"],
        learningPoints: ["Understand finance", "Price securities", "Manage risk"]
    },
    {
        title: "Number Theory: The Secrets of Integers",
        category: "mathematics-logic",
        duration: "7 Weeks",
        students: "750",
        price: 23999,
        description: "The math behind encryption and cryptography.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
        instructor: "Number Theorist",
        modules: [
            { title: "Number Theory Basics", lessons: ["Primes", "Modular Arithmetic", "Cryptography"] },
            { title: "Applications", lessons: ["Encryption", "Security", "Codes"] }
        ],
        requirements: ["Algebra Basics"],
        learningPoints: ["Understand number theory", "Learn cryptography", "Secure data"]
    },
    {
        title: "Mathematical Modeling for Beginners",
        category: "mathematics-logic",
        duration: "6 Weeks",
        students: "1.3K",
        price: 22999,
        description: "Turning real problems into mathematical equations.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f70504eeb?w=600&h=400&fit=crop",
        instructor: "Modeling Expert",
        modules: [
            { title: "Modeling Basics", lessons: ["Problem Formulation", "Equations", "Validation"] },
            { title: "Applications", lessons: ["Physics", "Biology", "Engineering"] }
        ],
        requirements: ["Algebra", "Calculus Basics"],
        learningPoints: ["Build models", "Solve problems", "Predict outcomes"]
    },

    // ============= LIBERAL ARTS & PROFESSIONAL GROWTH =============
    {
        title: "Creative Writing: Finding Your Voice",
        category: "liberal-arts",
        duration: "8 Weeks",
        students: "1.6K",
        price: 19999,
        description: "Fiction and non-fiction writing workshops to find your unique voice.",
        image: "https://images.unsplash.com/photo-1457347299847-c09fa4e56af8?w=600&h=400&fit=crop",
        instructor: "Published Author",
        modules: [
            { title: "Writing Fundamentals", lessons: ["Story Structure", "Character Development", "Dialogue"] },
            { title: "Genres", lessons: ["Fiction", "Non-fiction", "Poetry"] }
        ],
        requirements: ["Reading", "Creativity"],
        learningPoints: ["Develop writing skills", "Create compelling stories", "Publish your work"]
    },
    {
        title: "Public Speaking & Persuasion",
        category: "liberal-arts",
        duration: "6 Weeks",
        students: "2.4K",
        price: 21999,
        description: "Mastering the art of presentations and persuasive communication.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        instructor: "Speaking Coach",
        modules: [
            { title: "Public Speaking", lessons: ["Presentation", "Delivery", "Confidence"] },
            { title: "Persuasion", lessons: ["Rhetoric", "Argumentation", "Influence"] }
        ],
        requirements: ["Communication Interest"],
        learningPoints: ["Master speaking", "Persuade audiences", "Lead presentations"]
    },
    {
        title: "World History: The Turning Points",
        category: "liberal-arts",
        duration: "10 Weeks",
        students: "1.8K",
        price: 18999,
        description: "Events that shaped our world and define our present.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
        instructor: "Historian",
        modules: [
            { title: "Ancient to Medieval", lessons: ["Civilizations", "Empires", "Feudalism"] },
            { title: "Modern World", lessons: ["Renaissance", "Industrial Revolution", "20th Century"] }
        ],
        requirements: ["History Interest"],
        learningPoints: ["Understand history", "Analyze turning points", "Context for today"]
    },
    {
        title: "Art History: Renaissance to Modernism",
        category: "liberal-arts",
        duration: "9 Weeks",
        students: "1.4K",
        price: 20999,
        description: "Decoding famous masterpieces and understanding artistic movements.",
        image: "https://images.unsplash.com/photo-1578926078328-123456789012?w=600&h=400&fit=crop",
        instructor: "Art Historian",
        modules: [
            { title: "Art Movements", lessons: ["Renaissance", "Baroque", "Modernism"] },
            { title: "Analysis", lessons: ["Techniques", "Context", "Interpretation"] }
        ],
        requirements: ["Art Interest", "History Interest"],
        learningPoints: ["Understand art history", "Analyze masterpieces", "Appreciate art"]
    },
    {
        title: "Professional Ethics & Integrity",
        category: "liberal-arts",
        duration: "5 Weeks",
        students: "2.2K",
        price: 16999,
        description: "Navigating ethical challenges in the modern workplace.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        instructor: "Ethics Consultant",
        modules: [
            { title: "Ethical Framework", lessons: ["Values", "Principles", "Dilemmas"] },
            { title: "Workplace", lessons: ["Decision Making", "Leadership", "Culture"] }
        ],
        requirements: ["Professional Interest"],
        learningPoints: ["Understand ethics", "Make ethical decisions", "Lead with integrity"]
    },
    {
        title: "Instructional Design: How to Teach Online",
        category: "liberal-arts",
        duration: "7 Weeks",
        students: "1.3K",
        price: 24999,
        description: "A meta-course on designing effective online learning experiences.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
        instructor: "Instructional Designer",
        modules: [
            { title: "Learning Design", lessons: ["ADDIE", "Learning Objectives", "Assessment"] },
            { title: "Online Teaching", lessons: ["LMS", "Engagement", "Effectiveness"] }
        ],
        requirements: ["Teaching Interest", "Online Platforms"],
        learningPoints: ["Design courses", "Teach online", "Engage learners"]
    },
    {
        title: "Mindfulness & Stress Management",
        category: "liberal-arts",
        duration: "6 Weeks",
        students: "2.1K",
        price: 17999,
        description: "Practical tools for mental health and well-being.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
        instructor: "Mindfulness Coach",
        modules: [
            { title: "Mindfulness", lessons: ["Meditation", "Awareness", "Practice"] },
            { title: "Stress Management", lessons: ["Techniques", "Lifestyle", "Prevention"] }
        ],
        requirements: ["Health Interest", "Openness"],
        learningPoints: ["Practice mindfulness", "Reduce stress", "Improve well-being"]
    },
    {
        title: "Critical Thinking & Problem Solving",
        category: "liberal-arts",
        duration: "6 Weeks",
        students: "1.9K",
        price: 19999,
        description: "Tools and frameworks for better decision making.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        instructor: "Critical Thinking Expert",
        modules: [
            { title: "Thinking Skills", lessons: ["Analysis", "Logic", "Creativity"] },
            { title: "Problem Solving", lessons: ["Frameworks", "Tools", "Application"] }
        ],
        requirements: ["Analytical Mind"],
        learningPoints: ["Think critically", "Solve problems", "Make better decisions"]
    },
    {
        title: "Digital Literacy & Online Safety",
        category: "liberal-arts",
        duration: "5 Weeks",
        students: "2.3K",
        price: 14999,
        description: "Protecting your digital identity and staying safe online.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
        instructor: "Cybersecurity Expert",
        modules: [
            { title: "Digital Basics", lessons: ["Internet", "Email", "Browsers"] },
            { title: "Safety", lessons: ["Passwords", "Phishing", "Privacy", "Protection"] }
        ],
        requirements: ["Computer Access"],
        learningPoints: ["Stay safe online", "Protect identity", "Use internet wisely"]
    },
    {
        title: "Intro to Spanish: Language & Culture",
        category: "liberal-arts",
        duration: "10 Weeks",
        students: "1.7K",
        price: 23999,
        description: "Learn Spanish language and explore Hispanic cultures worldwide.",
        image: "https://images.unsplash.com/photo-1543269865-cbdf26effbad?w=600&h=400&fit=crop",
        instructor: "Spanish Teacher",
        modules: [
            { title: "Language Basics", lessons: ["Grammar", "Vocabulary", "Conversation"] },
            { title: "Culture", lessons: ["Customs", "History", "Literature"] }
        ],
        requirements: ["Dedication", "Time Commitment"],
        learningPoints: ["Speak Spanish", "Understand culture", "Travel confidently"]
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
        console.log(`✅ Seeded ${insertedCourses.length} courses successfully!`);

        // Summary by category
        const categories = {};
        insertedCourses.forEach(course => {
            if (!categories[course.category]) categories[course.category] = 0;
            categories[course.category]++;
        });

        console.log('\n📊 Courses by Category:');
        Object.entries(categories).forEach(([cat, count]) => {
            console.log(`   ${cat}: ${count} courses`);
        });

        mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
