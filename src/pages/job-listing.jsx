import { getcompanies } from '@/api/apicompanies';
import { getjobs } from '@/api/apijobs'
import JobCard from '@/components/jobCard';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {

  const {isLoaded} = useUser()

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesData = await getcompanies();
      if (companiesData) {
        setCompanies(companiesData);
      } else {
        console.error('No company data returned');
      }
      setLoading(false);
    };

   if(isLoaded) fetchCompanies();
  }, [isLoaded, company_id, location]); 


  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await getjobs({searchQuery, company_id, location});
      if (jobData) {
        setJobs(jobData);
      } else {
        console.error('No job data returned');
      }
      setLoading(false);
    };

  if(isLoaded) fetchJobs();
  }, [isLoaded, searchQuery, company_id, location]); 


const handleSearch =(e)=>{
  e.preventDefault();
  let formData = new FormData(e.target)
  const query = formData.get("search-query")
  if(query){ 
    setSearchQuery(query)

  }
}

const clearFilters = () => {
  setSearchQuery("");
  setCompany_id("");
  setLocation("");
};

if (!isLoaded) {
  return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
}


  return (
<div>
<h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
      <div className="">
      {loading && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
      </div>

</div>

  )
}

export default JobListing
