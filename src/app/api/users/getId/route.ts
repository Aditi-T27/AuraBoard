import { NextResponse,NextRequest} from "next/server";
import supabase from "@/dbConfig/clientPage"



export async function GET(request:NextRequest){
    try{
//  const reqBody = await request.json();
//  const {username,email}=reqBody;
//  if(!username||!email){
//     return NextResponse.json({
//         error:"Empty user details!"
//     },
//     {status:500});
// }


const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");
    // const username = searchParams.get("username");

const { data, error } = await supabase
  .from("user")
  .select("id") // You can select more fields if needed: "id, username"
  .eq("email", email)
  .single(); // Ensures only one record is returned

   if(error){
    console.log(error);
   }
  console.log(data);
  
  if (!data) {
    return NextResponse.json({ok:false ,success: false, message: 'User not found'});
  }


   

   const response = NextResponse.json({
        ok:true,
        success:"Success",
        message:"Fetched Id successfully",
        id:data.id,
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