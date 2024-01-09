'use client'

import { Button } from '@/components/ui/button'
import FileSelect from '@/components/ui/file-select'

export default function VoicePage() {
  const onSelection = async (file: File) => {
    console.log(file.name)

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <div className='max-w-3xl mx-auto pt-20'> 
      <FileSelect onSelection={onSelection} />
    </div>
  )
}
