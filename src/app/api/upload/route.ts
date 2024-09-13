import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  // Extract file from the form data
  const data = await request.formData()
  const file = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' })
  }

  try {
    // Convert the file into a buffer to be written to the filesystem
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Define where to store the uploaded file (e.g., inside /public/uploads)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(uploadDir, file.name)

    // Ensure the /public/uploads directory exists and save the file
    await writeFile(filePath, buffer)

    console.log(`File uploaded successfully: ${filePath}`)

    // Return a success response with file path or name
    return NextResponse.json({ success: true, filePath: `/uploads/${file.name}` })
  } catch (error) {
    console.error('File upload failed:', error)
    return NextResponse.json({ success: false, message: 'File upload failed' })
  }
}
