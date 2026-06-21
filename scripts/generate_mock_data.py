import json
import os
import random

JOB_COUNT = 51

companies = [
    {
        "id": "company-1",
        "name": "TechNova Solutions",
        "industry": "Technology",
        "location": "Bangalore",
        "description": "Software product company focused on cloud solutions.",
        "employeeCount": "500+",
        "rating": 4.6,
        "benefits": [
            "Health Insurance",
            "Remote Work",
            "Learning Budget"
        ]
    },
    {
        "id": "company-2",
        "name": "Designify Studio",
        "industry": "Design",
        "location": "Mumbai",
        "description": "Creative agency delivering digital experiences.",
        "employeeCount": "150+",
        "rating": 4.4,
        "benefits": [
            "Flexible Hours",
            "Paid Training",
            "Health Insurance"
        ]
    },
    {
        "id": "company-3",
        "name": "MarketSpark",
        "industry": "Marketing",
        "location": "Delhi",
        "description": "Performance marketing and analytics company.",
        "employeeCount": "250+",
        "rating": 4.2,
        "benefits": [
            "Remote Work",
            "Annual Bonus",
            "Paid Leave"
        ]
    },
    {
        "id": "company-4",
        "name": "SalesForge",
        "industry": "Sales",
        "location": "Hyderabad",
        "description": "Enterprise sales and customer acquisition company.",
        "employeeCount": "300+",
        "rating": 4.3,
        "benefits": [
            "Performance Bonus",
            "Health Insurance",
            "Paid Leave"
        ]
    },
    {
        "id": "company-5",
        "name": "PeopleFirst HR",
        "industry": "Human Resources",
        "location": "Pune",
        "description": "Human resource consulting and recruitment services.",
        "employeeCount": "200+",
        "rating": 4.1,
        "benefits": [
            "Flexible Hours",
            "Remote Work",
            "Health Insurance"
        ]
    }
]

job_templates = [
    ("Frontend Developer", "Software"),
    ("Backend Developer", "Software"),
    ("Full Stack Developer", "Software"),
    ("UI Designer", "Design"),
    ("UX Designer", "Design"),
    ("Marketing Executive", "Marketing"),
    ("Digital Marketing Specialist", "Marketing"),
    ("Sales Associate", "Sales"),
    ("Business Development Executive", "Sales"),
    ("HR Executive", "HR"),
]

jobs = []

for i in range(1, JOB_COUNT):
    title, category = random.choice(job_templates)

    jobs.append({
        "id": f"job-{i}",
        "title": title,
        "companyId": random.choice(companies)["id"],
        "location": random.choice([
            "Bangalore",
            "Mumbai",
            "Delhi",
            "Hyderabad",
            "Pune"
        ]),
        "salary": random.choice([
            "₹4 LPA",
            "₹6 LPA",
            "₹8 LPA",
            "₹10 LPA",
            "₹12 LPA"
        ]),
        "experience": random.choice([
            "0-1 Years",
            "1-3 Years",
            "2-4 Years",
            "3-5 Years"
        ]),
        "category": category,
        "description":
            f"We are hiring a {title} to join our growing team and contribute to exciting projects.",
        "featured": random.random() < 0.25,
        "latest": random.random() < 0.50
    })

companies_json = json.dumps(companies, indent=2)
jobs_json = json.dumps(jobs, indent=2)

typescript_content = f"""import {{ Company }} from '../types/Company';
import {{ Job }} from '../types/Job';

export const companies: Company[] = {companies_json};

export const jobs: Job[] = {jobs_json};
"""

output_path = os.path.join(
    os.path.dirname(__file__),
    "..",
    "src",
    "data",
    "mockData.ts"
)

os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, "w", encoding="utf-8") as file:
    file.write(typescript_content)

print(f"Generated: {output_path}")