import { NextResponse, NextRequest } from "next/server";
import supabase from "@/dbConfig/clientPage";


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      userId, // you need to pass this from frontend
      title,
      journalContent,
      images, // array of image URLs
      textareaColor,
      fontFamily,
      fontSize
    } = reqBody;
   console.log(journalContent);
    // Insert into the `journal_entry` table
    const { data, error } = await supabase
      .from("journal_entry")
      .insert([
        {
          user_id: userId,
          title: title,
          content: journalContent,
          image_urls: images,
          background_color: textareaColor,
          font_family: fontFamily,
          font_size: parseInt(fontSize),
        },
      ])
      .select(); // optional: return inserted row

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save journal." }, { status: 500 });
    }

    return NextResponse.json({ message: "Journal saved successfully.", data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Server error:", error.message);
    } else {
      console.error("Server error:", error);
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
