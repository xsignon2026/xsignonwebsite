export interface JobListing {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  locationType: "hybrid" | "remote" | "onsite";
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN";
  description: string;
  active: boolean;
  postedAt: string;
}
