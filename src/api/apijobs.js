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
  // Now await the result after the query has been fully constructed
  const { data, error } = await query;

  if (error) {
    console.error('Error:', error);
    return null;
  }

  return data;
}
