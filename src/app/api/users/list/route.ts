import { NextResponse,NextRequest} from "next/server";
import supabase from "@/dbConfig/clientPage"

export async function GET(request:NextRequest){
    try{
 const id = await request.nextUrl.searchParams.get("id");

 if(!id){
    return NextResponse.json({
        error:"Empty Input, No userId found in request, Kindly fill data!"
    },
    {status:500});
}

 const{data,error}= await supabase
  .from("journal_entry")
  .select("*")
  .eq("user_id",id)

 
   if(error){
    console.log(error);
   }
  
  
  if (!data) {
    return NextResponse.json({ok:false ,success: false, message: 'User not found'});
  }

  if(data){
    const titles = data.map((entry: unknown) => (entry as { title: string }).title);
    console.log("Titles",titles);
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

 catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Server error:", error.message);
    } else {
      console.error("Server error:", error);
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}