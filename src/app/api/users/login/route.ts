import { NextResponse,NextRequest} from "next/server";
import supabase from "@/dbConfig/clientPage"
import jwt from "jsonwebtoken"
export async function POST(request:NextRequest){
    try{
 const reqBody = await request.json();
 const {email,password}=reqBody;
 if(!email || !password){
    return NextResponse.json({
        error:"Empty Input, Kindly fill data!"
    },
    {status:500});
}

 const{data,error}= await supabase
  .from("user")
  .select("*")
  .eq('email',email)
  .single();
 
   if(error){
    console.log(error);
   }
  // console.log(data);
  
  if (!data) {
    return NextResponse.json({ok:false ,success: false, message: 'User not found'});
  }

    if(data.password!==password)
       return NextResponse.json({ok:false ,success: false, message: 'Password is not matching'});
 
    const tokendata={
        id:data.id,
        username:data.name,
        email:data.email
    }

    //create token
    const token=jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
   

   const response = NextResponse.json({
        ok:true,
        success:"Success",
        message:"Created user data successfully"
    },
    {status:201});

     
    response.cookies.set("token",token,{
        httpOnly:true,
         path: "/",
  sameSite: "lax",
    })

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