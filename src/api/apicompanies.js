import { supabase } from "@/utils/supabase";

export async function getcompanies() {

   let query = await supabase.from('companies').select('*');

    const {data, error} = query;
if(error) {
    console.error('err',error)
    return null;
}
  return data
}

export async function addNewCompany(_, companyData) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL 
  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) throw new Error("Error uploading Company Logo");

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url: logo_url,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Companys");
  }

  return data;
}