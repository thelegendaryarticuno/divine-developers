import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);

    console.log(`File uploaded successfully: ${filePath}`);

    return NextResponse.json({ success: true, filePath: `/uploads/${file.name}` });
  } catch (error) {
    console.error('File upload failed:', error);
    return NextResponse.json({ success: false, message: 'File upload failed' });
  }
}
