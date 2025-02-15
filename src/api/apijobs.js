import { supabase } from "@/utils/supabase";

export async function getjobs({ searchQuery, company_id, location }) {
  let query = supabase.from('jobs').select('*, company:companies(name, logo_url)');

  if (searchQuery) {
    // Ensure correct use of `ilike` with the query object (before awaiting)
    query = query.ilike('title', `%${searchQuery}%`);
  }

  if(location){
  query = query.eq('location',location)
}

if(company_id){
  query = query.eq('company_id',company_id)
}
  const { data, error } = await query;

  if (error) {
    console.error('Error:', error);
    return null;
  }

  return data;
}



export async function getJob(job_id) {
   let query = await supabase.from('jobs').select(
    "*, company: companies(name,logo_url), applications: applications(*)"
  )
  .eq("id", job_id)
  .single();

    const {data, error} = query;
if(error) {
    console.error('err',error)
    return null;
}
  return data
}

export async function updateHiringStatus(id , isopen) {
  const job_id = +id
const { data, error } = await supabase
.from("jobs")
.update({ isopen })
.eq("id", job_id);

if (error) {
console.error("Error Updating Hiring Status:", error);
return null;
}

// Fetch the updated data
const { data: updatedData, error: fetchError } = await supabase
.from("jobs")
.select("*")
.eq("id", job_id);

if (fetchError) {
console.error("Error fetching updated data:", fetchError);
return null;
}

return updatedData;

}



export async function addNewJob(_,jobData) {
  console.log('jo',jobData)
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}