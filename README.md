# FindMeAJob

## Project Description

FindMeAJob is a React Native mobile application that helps users discover job opportunities from different companies. The app provides an easy way to browse available positions, search jobs, explore company profiles, and save interesting opportunities for later. The project is built using React Native, TypeScript, React Navigation, React Hooks, and the Context API.

## Original Problem Statement

```
Job Portal Mobile App

Description
Develop a Job Portal Mobile Application that enables users to browse job opportunities from different companies. The application should display job listings using attractive card layouts and allow users to search and view detailed job information. The app should provide a professional and user-friendly experience for job seekers.

Screens Required
- Home Screen
- Jobs Screen
- Job Details Screen
- About Screen

Fields
- Job Title
- Company Name
- Location
- Salary
- Experience
- Description

Implement
- Bottom Tab Navigation
- Job Card Display
- Search Jobs
- Job Details View
- Responsive Layout

Additional Features
- Featured Jobs
- Latest Openings
- Company Information Section
```

# Final Feature Set

## Core Features

1. Home Screen: The application includes a Home screen that highlights featured jobs, latest openings, top companies, and platform statistics such as total jobs, companies, saved jobs, and featured opportunities. Users can quickly explore recommended positions and navigate to detailed job information.
2. Jobs Screen: The Jobs screen allows users to browse all available opportunities, search by job title, company, or location, and filter results using job categories such as Software Development, Design, Marketing, Sales, and Human Resources. The interface is designed to remain responsive and easy to use even with larger datasets.
3. Job Details Screen: Each job has a dedicated details page that displays information such as salary, experience requirements, job description, and company information. Users can also save or remove jobs from their bookmarks and view the company profile associated with the position.
4. Company Details Screen: The Company Details screen provides additional information about an organization, including its industry, location, employee count, rating, benefits, description, and currently available positions.
5. About Screen: An About screen is included to provide information about the application, technologies used, and developer details.

## Additional Features

1. Save Jobs: Users can save jobs they are interested in and access them later. Saved jobs are tracked using the application's global state (React Context API) and are reflected in the statistics section on the Home screen. They can also be viewed by category filtering on Jobs page
2. Company Profiles: Each company contains dedicated information including: Company Name, Industry, Location, Company Description, Employee Count, Company Rating, Benefits Offered. Users can navigate from Job Details Screen to Company Details Screen.
3. Category-Based Job Filtering: Jobs can be filtered using category chips. Examples: All, Software Development, Design, Marketing, Sales, Human Resources
4. Job Statistics Dashboard: The Home Screen includes a dashboard displaying: Total Jobs, Total Companies, Saved Jobs, Featured Jobs

# UI Screenshots

![Home Page 1](assets/home1.png)
![Home Page 2](assets/home2.png)

![Jobs Page](assets/jobs.png)
![Jobs Page Search](assets/jobs2.png)

![Job Details](assets/job_details.png)
![Company Details](assets/company_details.png)

![About Page](assets/about.png)

# Installation & Setup

```bash
## Clone Repository
git clone https://github.com/CoolSunflower/FindMeAJob.git

## Navigate To Project
cd FindMeAJob

## Install Dependencies
npm install

## Start Metro Bundler
npm start

## Run Android Application
npm run android
```

# Application Screens (Planned UI Design)

## 1. Home Screen

Serve as the landing page of the application with: Header, Featured Jobs Carousel, Latest Openings Horizontal List, Statistics Dashboard, Top Companies Section.

Layout:

```text
FindMeAJob
--------------------------------
Statistics
--------------------------------

+----------+ +----------+
| Jobs     | |Companies |
+----------+ +----------+
+----------+ +----------+
| Saved    | |Featured  |
+----------+ +----------+

--------------------------------
Featured Jobs
--------------------------------

[ Featured Job Carousel ]

--------------------------------
Latest Openings
--------------------------------

[ Job Cards ]

--------------------------------
Top Companies
--------------------------------

[ Company Cards ]
```

## 2. Jobs Screen

Allow users to browse and search all available jobs. Includes: Search Bar, Category Chips, FlatList of Jobs.

Layout:

```text
Jobs
--------------------------------

[ Search Jobs... ]

--------------------------------

[All][Saved][Software][Design]
[Marketing][Sales][HR]

--------------------------------

+--------------------+
| Job Card           |
+--------------------+
+--------------------+
| Job Card           |
+--------------------+
```

## 3. Job Details Screen

Displays complete information about a selected job. Includes: Job Header, Salary Information, Experience Requirement, Description, Company Information, Save Job Button, View Company Button.

Layout:

```text
< Back

Frontend Developer

CompanyName

Salary
₹10,00,000

Experience
2-4 Years

--------------------------------
Description
--------------------------------

Job description content...

--------------------------------
Company Information
--------------------------------

CompanyName
Rating: 4.6

[ View Company ]

--------------------------------

[ Save Job ]
```

## 4. Company Details Screen

Displays detailed information about a company. Includes: Company Information, Rating, Benefits, Open Positions.

Layout:

```text
< Back

TechNova Solutions

Technology Industry

Rating: 4.6

Employees:
500+

--------------------------------
About Company
--------------------------------

Company description...

--------------------------------
Benefits
--------------------------------

• Health Insurance
• Flexible Hours
• Remote Work

--------------------------------
Open Positions
--------------------------------

Frontend Developer
Backend Developer
UI Designer
```

## 5. About Screen

Provides information about the application and developer.

Layout:

```text
About FindMeAJob

--------------------------------

FindMeAJob helps job seekers
discover opportunities from
multiple companies.

--------------------------------

Developer Information

Name:
Adarsh Gupta

GitHub:
CoolSunflower

--------------------------------

Thank You For Using FindMeAJob
```

## Planned Reusable Components

1. JobCardCompact: Used in: Jobs Screen, Latest Openings Section. Displays: Job Title, Company Name, Location, Salary, Experience
2. JobCardFeatured: Used in: Featured Jobs Carousel. Displays: Featured Badge, Job Title, Company Name, Salary, Experience, Location
3. CompanyCard: Used in: Home Screen, Company Details Screen. Displays: Company Name, Industry, Rating
4. SearchBar: Used in Jobs Page
5. CategoryChip: Used in Jobs Page for all categories
6. StatCard: Used in Home Screen for 4 statistics

# Technical Planning

## Data Model

Company Type

```typescript
type Company = {
  id: string;
  name: string;
  industry: string;
  location: string;
  description: string;
  employeeCount: string;
  rating: number;
  benefits: string[];
};
```

Job Type

```typescript
type Job = {
  id: string;
  title: string;
  companyId: string;
  location: string;
  salary: string;
  experience: string;
  category: string;
  description: string;
  featured: boolean;
  latest: boolean;
};
```

Application State

```typescript
type AppState = {
  companies: Company[];
  jobs: Job[];
  savedJobIds: string[];
};
```

## Navigation Structure

The application uses React Expo Navigation.

```text
Root Stack
│
├── Bottom Tabs
│   ├── Home
│   ├── Jobs
│   └── About
│
├── Job Details
│
└── Company Details
```

## State Management

Uses React Context API to: Manage jobs data, Manage companies data, Manage saved jobs, Handle search functionality, Handle category filtering, Provide helper functions across screens

## Technology Stack

- React Native
- TypeScript
- React Navigation
- React Context API
- React Hooks
- FlatList
- ScrollView
