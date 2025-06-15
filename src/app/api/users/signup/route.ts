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

 const{data,error}= await supabase
  .from("user")
  .insert([{name,email,password}])
 
   if(error){
    console.log(error);
   }
  console.log(data);

   return NextResponse.json({
        ok:true,
        success:"Success",
        message:"Created user data successfully"
    },
    {status:201});

 }

 catch(error:any){
    console.log(error.message);
    return NextResponse.json({
        error:error.message
    },
    {status:500});
 }
}