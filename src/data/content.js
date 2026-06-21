// All of the site's text content lives here: profile, experience,
// projects, skills, education, certifications, volunteering, and the gallery.

export const profile = {
  name: 'Asad Aslam',
  role: 'AI Data Engineer',
  tagline:
    'I build production ETL/ELT pipelines and ship Gen AI systems that people use every day.',
  location: 'Nürnberg, Germany',
  email: 'asadaslam556@gmail.com',
  phone: '+49 176 71631580',
  linkedin: 'https://www.linkedin.com/in/asadaslam556/',
  github: 'https://github.com/asadaslam556',
 // Toggles the GitHub links in the nav, hero, and footer on or off.
  showGithub: false,
  cv: '/Asad_Aslam_CV.pdf',
  portrait: '/images/profile.jpg', // square image works best

  // Web3Forms key that delivers the contact form to my inbox (safe to be public).
  // If left empty, the form opens the visitor's own email app instead.
  contactFormKey: 'e69cf329-4051-4567-977a-2ca5b31f2a52',
}

export const about = {
  paragraphs: [
    'I am an AI Data Engineer, and for the last four years I have built the data and AI systems that supply-chain teams at Siemens rely on. Day to day, I design Python ETL/ELT pipelines, keep Snowflake data models healthy, and deploy Gen AI applications on Azure.',
    'My work sits where data engineering, analytics, and applied AI meet. I have shipped a natural-language supply-chain chatbot on Neo4j, Azure OpenAI, and LangChain that lets analysts query a graph database in plain English, and a Streamlit platform that uses Sentence Transformers to match and manage more than 10,000 supplier and location records in production. Earlier, I built the Power BI and DAX reporting that three operational teams used every day.',
    'I hold an M.Sc. in Data Science from FAU Erlangen-Nürnberg and a B.Sc. in Computer Science. What I enjoy most is turning messy, inconsistent data into pipelines and tools that people genuinely trust and use.',
  ],
  stats: [
    { value: '4 yrs', label: 'Engineering at Siemens' },
    { value: '10,000+', label: 'Supplier records managed' },
    { value: '50%', label: 'Manual mapping reduced' },
    { value: 'M.Sc.', label: 'Data Science, FAU' },
  ],
}

export const experience = [
  {
    period: 'Jul 2024 - Present',
    role: 'Data Engineer (Working Student)',
    company: 'Siemens AG',
    location: 'Munich, Germany',
    blurb:
      'Building multi-tier supply-chain visibility for global procurement.',
    points: [
      'Build and maintain an SBERT-based supplier-name matching ETL pipeline on GitLab CI/CD, cutting manual mapping effort by 50%.',
      'Develop and ship a Streamlit application on Azure that manages 10,000+ supplier and location mappings, reducing correction effort by 30-40%.',
      'Optimize Snowflake ELT workloads and SQL transformations for performance and reliability.',
      'Enrich 10,000+ records through REST API integrations and author reusable Neo4j Cypher query templates.',
      'Design and deploy a natural-language supply-chain chatbot (two-tier rule-based + Azure OpenAI) as an Azure ML Managed Online Endpoint.',
    ],
    tags: ['Python', 'SQL', 'Snowflake', 'dbt', 'Neo4j', 'Azure', 'LangChain', 'GitLab CI/CD'],
  },
  {
    period: 'Jun 2022 - Jun 2024',
    role: 'Data Analyst (Working Student)',
    company: 'Siemens Mobility',
    location: 'Erlangen, Germany',
    blurb: 'Drove the BI and analytics function for procurement and operations teams.',
    points: [
      'Built Power BI dashboards serving 3 teams, replacing manual Excel reporting.',
      'Engineered Power Query ETL across 6 data sources into clean, modeled datasets.',
      'Authored advanced DAX models that reduced reporting time by 40-45%.',
      'Automated KPI reporting, eliminating roughly 10-15 hours of manual work per week.',
      'Delivered a Mendix supplier-risk application covering 8 risk dimensions on Mendix Cloud.',
    ],
    tags: ['Power BI', 'DAX', 'Power Query', 'Snowflake', 'Mendix'],
  },
  {
    period: 'Jul 2019 - Jan 2021',
    role: 'Web Developer',
    company: 'AIMS IT Solutions & Trainings',
    location: 'Lahore, Pakistan',
    blurb: 'Built responsive, mobile-first web products end to end.',
    points: [
      'Developed responsive, mobile-first websites, landing pages, and a mobile app.',
      'Deployed and maintained applications on AWS EC2 with high uptime.',
    ],
    tags: ['PHP (Laravel)', 'JavaScript', 'AWS EC2', 'Responsive Design'],
  },
]

// category options drive the project filter buttons
export const projectCategories = [
  'All',
  'AI & LLM',
  'Data Engineering',
  'Analytics & BI',
  'Research & ML',
]

export const projects = [
  {
    title: 'TinaGPT: Gen AI Supply-Chain Chatbot',
    org: 'Siemens',
    period: 'Feb 2025 - Present',
    category: 'AI & LLM',
    featured: true,
    description:
      'A supply-chain chatbot that lets any analyst query a Neo4j graph database (suppliers, parts, tier relationships, and product-change notifications) in plain English, instead of writing Cypher queries by hand.',
    detail:
      'A two-tier engine keeps answers reliable: common questions are matched to a library of pre-built Cypher templates, and anything else falls back to Azure OpenAI with LangChain, which generates the query on the fly. A read-only safety layer validates every query before it runs. Deployed as a REST API on Azure ML inside Docker, with a Streamlit interface for testing and a 100+ question regression suite guarding changes.',
    impact: 'Deployed to production on Azure ML',
    tags: ['Python', 'Azure OpenAI', 'LangChain', 'Neo4j', 'NoSQL', 'Docker', 'Azure ML', 'Cypher', 'Streamlit'],
  },
  {
    title: 'Supplier & Location Mapping Platform',
    org: 'Siemens',
    period: 'Jul 2024 - Present',
    category: 'Data Engineering',
    featured: true,
    description:
      'A two-part data platform that automatically cleans up inconsistent supplier data. The same company often arrives from different systems as "Siemens GmbH", "Siemens Germany", or just "Siemens", and locations are frequently missing. The platform standardizes both and routes only the uncertain cases to a human review screen.',
    detail:
      'An automated Python ETL pipeline on GitLab CI/CD pulls raw names from Snowflake, strips legal suffixes (GmbH, Ltd) and country names, then uses a Sentence Transformers (SBERT) model to score each name against a reference list. Anything above 95% confidence locks automatically, and the rest go to a Streamlit app for one-click review. A second workspace resolves cities and countries through the Nominatim (OpenStreetMap) API with the same auto-lock-and-review flow. It is built on Snowflake with Plotly coverage dashboards and a live Prewave data feed, and it cut manual name mapping by 50% while reducing correction effort by 30-40% across 10,000+ records. Both parts are in daily use.',
    impact: '10,000+ records in production',
    tags: ['Python', 'SQL', 'Snowflake', 'dbt', 'Sentence Transformers', 'Streamlit', 'Azure', 'GitLab CI/CD', 'Plotly', 'REST APIs'],
  },
  {
    title: 'KPI Reporting Dashboard',
    org: 'Siemens Mobility',
    period: 'Jun 2022 - Jun 2024',
    category: 'Analytics & BI',
    featured: false,
    description:
      'A Power BI reporting platform for 3 teams that replaced slow, manual Excel workflows.',
    detail:
      'Consolidated 6 data sources via Power Query (Snowflake exports, Excel, and tracking sheets) into four report pages (Executive, Operations, Quality, and Logistics), with advanced DAX measures and per-team interactive slicers for self-service reporting. Saved 10-15 hours per week and cut reporting time by 40-45%.',
    impact: '10-15 hrs/week saved',
    tags: ['Power BI', 'DAX', 'Power Query', 'Snowflake', 'Excel'],
  },
  {
    title: 'Supplier Risk Assessment Tool',
    org: 'Siemens Mobility',
    period: 'Jun 2022 - Jun 2024',
    category: 'Analytics & BI',
    featured: false,
    description:
      'A low-code Mendix application that replaced a manual, Excel-based supplier-risk process for the procurement team.',
    detail:
      'It scores each supplier across 8 risk dimensions with automated classification, and adds a Risk Share dashboard, a Risk/Cost matrix, an Excel bulk importer, a multi-currency converter, and role-based access. It shipped with full user documentation and is in daily operational use by the procurement team.',
    impact: '8 risk dimensions automated',
    tags: ['Mendix', 'Low-Code', 'Risk Modeling', 'Process Automation'],
  },
  {
    title: 'Job Application Automation Pipeline',
    org: 'Personal Project',
    period: 'May 2026 - Present',
    category: 'AI & LLM',
    featured: false,
    description:
      'A Python pipeline that aggregates roles from multiple job-board APIs, scores each listing against my profile with an LLM, and generates tailored CVs and cover letters.',
    detail:
      'Pulls listings from job-board APIs (JSearch, Jooble), ranks them by fit using the Claude API, and auto-generates tailored application documents from templates. Integrates Gmail (OAuth) for status tracking, with bulk scoring routed through a smaller, lower-cost model tier. Built as modular, configurable Python scripts.',
    impact: 'End-to-end automated',
    tags: ['Python', 'Claude API', 'Gmail API', 'Automation', 'LLM'],
  },
  {
    title: 'P05: Data Attribution for Environmental Monitoring',
    org: 'University of Bonn (Mobile Robotics)',
    period: 'Apr 2026 - Present',
    category: 'Research & ML',
    featured: false,
    description:
      'A University of Bonn research project (supervised by Jonathan Hecht) tackling a real challenge in environmental monitoring: keeping satellite-image models accurate when some training labels are wrong.',
    detail:
      'Implemented and compared three data-attribution methods (EL2N, TracIn, and Influence Functions) on EuroSAT imagery with a ResNet-18 backbone, training the clean baseline to 98.26% accuracy. Ran controlled label-noise experiments on the Bender HPC cluster (SLURM) to measure how reliably each method flags corrupted samples, then tested sample reweighting and geographic-shift robustness.',
    impact: '98.26% clean-baseline accuracy',
    tags: ['Python', 'PyTorch', 'ResNet-18', 'EuroSAT', 'SLURM / HPC', 'Data Attribution'],
  },
  {
    title: 'M.Sc. Thesis: MicroRNAs / IsomiRs as Biomarkers',
    org: 'FAU Erlangen-Nürnberg',
    period: 'Nov 2024 - Apr 2025',
    category: 'Research & ML',
    featured: false,
    description:
      'A bioinformatics machine-learning thesis applying advanced ML methods to microRNA and isomiR analysis as disease biomarkers.',
    detail:
      'Combined feature engineering on sequencing data with supervised ML to evaluate microRNAs and isomiRs as candidate biomarkers.',
    impact: 'M.Sc. research',
    tags: ['R', 'Machine Learning', 'Bioconductor', 'Bioinformatics', 'Data Cleaning & Normalization'],
  },
  {
    title: 'B.Sc. Project: AR Paint Visualization App',
    org: 'University of South Asia',
    period: 'Jan 2020 - Jun 2020',
    category: 'Research & ML',
    featured: false,
    description:
      'An Android application using ARCore and ML to visualize paint colors on real walls in real time before purchase.',
    detail:
      'Let users preview paint colors on their own walls through the camera, combining augmented reality with a lightweight ML color pipeline.',
    impact: 'Final-year project',
    tags: ['Android', 'ARCore', 'Java', 'ML'],
  },
]

export const skillGroups = [
  {
    title: 'Languages & Databases',
    icon: 'database',
    items: ['Python', 'SQL', 'R', 'Snowflake', 'dbt', 'Neo4j', 'NoSQL', 'Cypher', 'JSON'],
  },
  {
    title: 'AI & Machine Learning',
    icon: 'sparkles',
    items: [
      'Generative AI', 'LLMs', 'LangChain', 'Azure OpenAI', 'Claude API',
      'Sentence Transformers (SBERT)', 'NLP', 'Prompt Engineering', 'PyTorch',
      'Deep Learning', 'Transformers',
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['AWS', 'Azure', 'Azure ML', 'Docker', 'Kubernetes', 'GitLab CI/CD', 'Git', 'REST APIs'],
  },
  {
    title: 'Analytics & BI',
    icon: 'chart',
    items: [
      'Power BI', 'DAX', 'Power Query', 'Streamlit', 'Plotly', 'NeoDash',
      'Statistical Analysis', 'Graph Analytics', 'Data Visualization',
    ],
  },
  {
    title: 'Data Engineering',
    icon: 'pipeline',
    items: [
      'ETL / ELT', 'Data Modeling', 'Data Warehousing', 'Graph Data Modeling',
      'Data Pipelines', 'Performance Tuning', 'Analytics Engineering', 'Data Quality',
    ],
  },
]

export const education = [
  {
    school: 'FAU Erlangen-Nürnberg',
    degree: 'M.Sc. Data Science',
    period: 'Oct 2021 - May 2025',
    grade: 'Grade 2.8',
    detail:
      'Focused on machine learning, deep learning, NLP, and data engineering. My thesis used machine-learning methods on microRNA and isomiR sequencing data to evaluate them as disease biomarkers.',
  },
  {
    school: 'University of South Asia',
    degree: 'B.Sc. Computer Science',
    period: 'Oct 2015 - Jun 2020',
    grade: 'CGPA 3.41 / 4.0',
    detail:
      'Covered algorithms, data structures, AI, databases, and software engineering. My final-year project was an Android app that used augmented reality and machine learning to preview paint colors on real walls.',
  },
]

// Give any certificate a `url` to make its card a clickable link.
export const certifications = [
  { name: 'Neo4j Certified Professional', issuer: 'Neo4j', year: '2024', url: '' },
  { name: 'Building Neo4j Applications with Python', issuer: 'Neo4j', year: '2024', url: '' },
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2026', url: '' },
  { name: 'AI Agents: From Foundations to Applications', issuer: 'Microsoft', year: '2026', url: '' },
  { name: 'Generative AI for Data Analysis', issuer: 'Microsoft', year: '2026', url: '' },
  { name: 'Introduction to Large Language Models', issuer: 'Google Cloud', year: '2026', url: '' },
  { name: 'Introduction to Generative AI', issuer: 'Google Cloud', year: '2026', url: '' },
  { name: 'Python for Data Science, AI & Development', issuer: 'IBM', year: '2026', url: '' },
  { name: 'Databases and SQL for Data Science with Python', issuer: 'IBM', year: '2026', url: '' },
  { name: 'Rapid Developer Certification', issuer: 'Mendix', year: '2024', url: '' },
  { name: 'Software Development Processes and Methodologies', issuer: 'University of Minnesota', year: '2024', url: '' },
]

export const volunteering = [
  {
    role: 'Volunteer',
    org: 'DEGIS: German Association for International Students',
    period: 'Apr 2022 - Jun 2023',
    detail: 'Supported recruitment and onboarding of new international students.',
  },
  {
    role: 'Student Volunteer',
    org: 'FAU Erlangen-Nürnberg',
    period: 'Oct 2022 - Apr 2023',
    detail: 'Matched international students with local volunteers for cultural integration.',
  },
]

// Photo gallery for the "Moments & community" section, grouped by event.
// Each event is one tile that opens to show its photos.
export const gallery = [
  {
    title: 'Siemens Neo4j Graphathon, Munich (2nd place)',
    images: [
      '/images/gallery/graphathon-1.jpg',
      '/images/gallery/graphathon-2.jpg',
      '/images/gallery/graphathon-3.jpg',
      '/images/gallery/graphathon-4.jpg',
    ],
  },
  {
    title: 'Data, Analytics & AI Conference, Nuremberg',
    images: [
      '/images/gallery/daai-1.jpg',
      '/images/gallery/daai-2.jpg',
      '/images/gallery/daai-3.jpg',
    ],
  },
  {
    title: 'Graph Day, Siemens Healthineers, Erlangen',
    images: [
      '/images/gallery/graph-day-1.jpg',
      '/images/gallery/graph-day-2.jpg',
      '/images/gallery/graph-day-3.jpg',
      '/images/gallery/graph-day-4.jpg',
    ],
  },
  {
    title: 'Industry meets Academia, Siemens Campus Erlangen',
    images: [
      '/images/gallery/industry-academia-1.jpg',
      '/images/gallery/industry-academia-2.jpg',
    ],
  },
  {
    title: 'M.Sc. Graduation, FAU Erlangen-Nürnberg',
    images: [
      '/images/gallery/graduation-1.jpg',
      '/images/gallery/graduation-2.jpg',
      '/images/gallery/graduation-3.jpg',
    ],
  },
]
