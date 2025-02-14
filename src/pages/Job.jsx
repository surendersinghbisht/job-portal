import { getJob, updateHiringStatus } from '@/api/apijobs'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react"
import { BarLoader } from 'react-spinners'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ApplyJobDrawer } from '@/components/apply-job'

const Job = () => {
  const { id } = useParams()
  const { user, isLoaded } = useUser()
  const [job, setJob] = useState(null)

  useEffect(() => {
    // Only fetch the job if the user is loaded
    if (isLoaded && user) {
   
      fetchJob()
    }
  }, [isLoaded, user, id])


  const fetchJob = async () => {
    const jobData = await getJob(id)
    if(jobData) {
      console.log('jobdata',jobData)
      setJob(jobData)
    }
      console.log('job',job)
  }

  useEffect(() => {
    console.log('Job state updated:', job);  // Logs when job state changes
  }, [job]);  // This will run whenever job changes
  

  const handleStatusChange = (value) => {
    const isopen = value === 'open'
    updateHiringStatus(id, isopen)
  }

  if (!isLoaded || !user) {
    return <BarLoader className='w-full' color="#36D7B7" />
  }

  if (!job) {
    return <BarLoader className='w-full' color="#36D7B7" />
  }


 

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>

      <div className="flex justify-between ">
        <div className="flex gap-2">
          <MapPinIcon /> {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isopen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
        <div>
          {job?.recruiter_id === user?.id && (
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger
                className={`w-full ${job?.isopen ? 'bg-green-950' : 'bg-red-950'}`}
              >
                <SelectValue placeholder={'hiring status' + (job?.isopen ? ' (open)' : ' (closed)')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer 
        job = {job}
        user = {user}
        fetchJob = {fetchJob}
        applied = {job?.applications?.find((ap)=> ap?.candidate_id === user_id )}
        />
      )}
    </div>
  )
}

export default Job
