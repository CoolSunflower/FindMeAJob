export type JobCategory = "Software" | "Design" | "Marketing" | "Sales" | "HR";
export type JobFilter = "All" | "Saved" | JobCategory;

export type Job = {
  id: string;
  title: string;
  companyId: string;
  location: string;
  salary: string;
  experience: string;
  category: JobCategory;
  description: string;
  featured: boolean;
  latest: boolean;
};
