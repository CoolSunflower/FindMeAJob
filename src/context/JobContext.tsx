import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { companies, jobs } from "../data/mockData";
import { Company } from "../types/Company";
import { Job, JobFilter } from "../types/Job";

type JobContextType = {
  companies: Company[];
  jobs: Job[];

  savedJobIds: string[];

  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;

  getJobById: (jobId: string) => Job | undefined;
  getCompanyById: (companyId: string) => Company | undefined;

  getFeaturedJobs: () => Job[];
  getLatestJobs: () => Job[];

  searchJobs: (query: string, filter?: JobFilter) => Job[];

  stats: {
    totalJobs: number;
    totalCompanies: number;
    savedJobs: number;
    featuredJobs: number;
  };
};

const JobContext = createContext<JobContextType | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const JobProvider = ({ children }: ProviderProps) => {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  const saveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) return prev;
      return [...prev, jobId];
    });
  };

  const unsaveJob = (jobId: string) => {
    setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
  };

  const isJobSaved = (jobId: string) => {
    return savedJobIds.includes(jobId);
  };

  const getJobById = (jobId: string) => {
    return jobs.find((job) => job.id === jobId);
  };

  const getCompanyById = (companyId: string) => {
    return companies.find((company) => company.id === companyId);
  };

  const getFeaturedJobs = () => {
    return jobs.filter((job) => job.featured);
  };

  const getLatestJobs = () => {
    return jobs.filter((job) => job.latest);
  };

  const searchJobs = (query: string, filter: JobFilter = "All") => {
    const lowerQuery = query.toLowerCase();

    return jobs.filter((job) => {
      const company = getCompanyById(job.companyId);

      const matchesQuery =
        job.title.toLowerCase().includes(lowerQuery) ||
        job.location.toLowerCase().includes(lowerQuery) ||
        company?.name.toLowerCase().includes(lowerQuery);

      const matchesSaved =
        filter !== "Saved" ? true : savedJobIds.includes(job.id);

      const matchesCategory =
        filter === "All" || filter === "Saved" ? true : job.category === filter;

      return matchesQuery && matchesCategory && matchesSaved;
    });
  };

  const stats = useMemo(
    () => ({
      totalCompanies: companies.length,
      savedJobs: savedJobIds.length,
      featuredJobs: jobs.filter((job) => job.featured).length,
      totalJobs: jobs.length,
    }),
    [savedJobIds],
  );

  return (
    <JobContext.Provider
      value={{
        companies,
        jobs,

        savedJobIds,

        saveJob,
        unsaveJob,
        isJobSaved,

        getJobById,
        getCompanyById,

        getFeaturedJobs,
        getLatestJobs,

        searchJobs,

        stats,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error("useJobs must be used inside JobProvider");
  }

  return context;
};
