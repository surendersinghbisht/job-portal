import { supabase } from "@/utils/supabase";

export async function getcompanies() {

   let query = await supabase.from('companies').select('*');

    const {data, error} = await query;
if(error) {
    console.error('err',error)
    return null;
}
  return data
}