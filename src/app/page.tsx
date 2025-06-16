import Custom_nav from "@/components/custom/Custom_nav"
import Banner from "@/components/custom/Banner"
import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode";


type MyToken = {
  username: string;
  email: string;
  id:number;
  iat: number;
  exp: number;
};


export default async function Home() {

  const cookieStore = await cookies(); // ✅ Await the cookies() Promise
  const token = cookieStore.get("token")?.value;
  let user=null;
  let  email=null;
  let id=null;


    if(token){
      try{
     const decoded = jwtDecode<MyToken>(token);
      console.log(decoded);
       user=decoded.username;
      email=decoded.email;
      id=decoded.id;
      // console.log(decoded.email);
      }
      catch(err){
         console.log("error caught",err);
      }
      }
      else{
        console.log("No Token Found");
      }
  
  return (
     <div>
     <Custom_nav username={user} email={email} id={id !== null ? String(id) : ""}/>
     <Banner username={user} email={email} id={id}/>
     </div>
  );
}
