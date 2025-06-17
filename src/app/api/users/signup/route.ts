import { NextResponse,NextRequest} from "next/server";
import supabase from "@/dbConfig/clientPage"

export async function POST(request:NextRequest){
    try{
 const reqBody = await request.json();
 const {name,email,password}=reqBody;
 if(!name || !email || !password){
    return NextResponse.json({
        error:"Empty Input, Kindly fill data!"
    },
    {status:500});
}

 const{error}= await supabase
  .from("user")
  .insert([{name,email,password}])
 
   if(error){
    console.log(error);
   }
  // console.log(data);

   return NextResponse.json({
        ok:true,
        success:"Success",
        message:"Created user data successfully"
    },
    {status:201});

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