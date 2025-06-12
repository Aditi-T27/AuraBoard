import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey =process.env.SUPABASE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// console.log("Supabase URL:", process.env.SUPABASE_URL);
// console.log("Supabase Key:", process.env.SUPABASE_KEY ? "Exists ✅" : "Missing ❌");

export default supabase;