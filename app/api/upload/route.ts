import { writeFile, mkdir } from 'fs/promises'
import { join } from 'node:path'
import { NextRequest, NextResponse } from 'next/server'

import getConfig from 'next/config'

const md5buffer = (buffer: Buffer) => {
  const crypto = require('crypto')
  const hash = crypto.createHash('md5')
  hash.update(buffer)
  return hash.digest('hex')
}

export async function POST(request: NextRequest) {
  const { serverRuntimeConfig } = getConfig()
  const nowString = new Date().toISOString().replace(/:/g, '-')

  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  try{
    const directory = join(serverRuntimeConfig.userUploadDir, nowString)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = md5buffer(buffer)

    await mkdir(directory, { recursive: true })
    await writeFile(join(directory, filename), buffer)
    console.log(`open ${join(directory, filename)} to see the uploaded file`)
  }catch(err){
    console.log(err)
    NextResponse.json({ success: false })
  }

  return NextResponse.json({ success: true })
}


