import { NextResponse,NextRequest} from "next/server";
import supabase from "@/dbConfig/clientPage"

export async function GET(request:NextRequest){
    try{
const { searchParams } = new URL(request.url);

    const title = searchParams.get("title");
    const id = searchParams.get("id");

 if(!id || !title){
    return NextResponse.json({
        error:"Empty Input, No userId found in request, Kindly fill data!"
    },
    {status:500});
}

 const{data,error}= await supabase
  .from("journal_entry")
  .select("*")
  .eq("user_id",id)
  .eq("title",title)

 
   if(error){
    console.log(error);
   }
  
  
  if (!data) {
    return NextResponse.json({ok:false ,success: false, message: 'User not found'});
  }

  if(data){

    console.log(data);
  }


// if (data && Array.isArray(data)) {
//   const titles = data.map((entry) => entry.title);
//   console.log("Titles:", titles); // ✅ use comma, not +
// }
   const response = NextResponse.json({
        ok:true,
        success:"Success",
        message:"Fetched Titles",
        data:data
    },
    {status:201});

     


    return response;

 }

 catch(error:any){
    console.log(error.message);
    return NextResponse.json({
        error:error.message
    },
    {status:500});
 }
}