import { NextResponse,NextRequest} from 'next/server';
import supabase from '@/dbConfig/clientPage'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content, fontSize, fontFamily, backgroundColor, imageUrls } = body;

    if (!id || !title) {
      return NextResponse.json({ error: "Missing id or title" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("journal_entry")
      .update({
        content,
        font_size: fontSize,
        font_family: fontFamily,
        background_color: backgroundColor,
        image_urls: imageUrls,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", id)
      .eq("title", title);

    if (error) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      success: true,
      message: "Entry updated successfully",
      data,
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Server error:", error.message);
    } else {
      console.error("Server error:", error);
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
