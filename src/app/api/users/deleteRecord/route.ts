import { NextRequest, NextResponse } from "next/server";
import supabase from "@/dbConfig/clientPage";

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const id = searchParams.get("userId");

    if (!title || !id) {
      return NextResponse.json(
        { error: "Missing required fields: title or userId" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("journal_entry")
      .delete()
      .eq("user_id", id)
      .eq("title", title);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { error: "Error deleting journal entry" },
        { status: 500 }
      );
    }
    if(!data){
       return NextResponse.json(
        { error: "Error deleting journal entry,no return data" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Journal entry deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Server error:", error.message);
    } else {
      console.error("Server error:", error);
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
