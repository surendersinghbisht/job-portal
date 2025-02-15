import { supabase } from "@/utils/supabase";


export async function applyToJob(_, jobData) {
  console.log('apply',jobData)
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL 
    const random = Math.floor(Math.random()*90000)
   const fileName = `resume-${random}-${jobData.candidate_id}`;
 
   const { error: storageError } = await supabase.storage
   .from("resumes")
   .upload(fileName, jobData.resume);

    if (storageError) throw new Error("Error uploading Resume");

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

    const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data
}