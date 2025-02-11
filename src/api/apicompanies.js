import { supabase } from "@/utils/supabase";

export async function getcompanies() {

   let query = await supabase.from('companies').select('*');

// if(location){
//   query = query.eq('location',location)
// }

// if(company_id){
//   query = query.eq('company_id',company_id)
// }

// if(searchQuery){
//   query = query.ilike('title', `%${searchQuery}%`)
// }

    const {data, error} = await query;
if(error) {
    console.error('err',error)
    return null;
}
  return data
}