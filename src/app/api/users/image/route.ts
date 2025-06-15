import supabase from "@/dbConfig/clientPage";

export async function uploadImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("journal-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload Error:", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("journal-images")
    .getPublicUrl(fileName);

  return publicUrlData?.publicUrl || null;
}
