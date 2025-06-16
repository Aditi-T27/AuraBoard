import { NextResponse } from 'next/server';
import supabase from '@/dbConfig/clientPage'

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('journal-image')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data: publicUrlData } = supabase.storage
    .from('journal-image')
    .getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
