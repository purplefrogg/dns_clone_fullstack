import { type FC, useState } from 'react'

export const ImageProperty: FC<{ setImage: (img: string) => void }> = ({
  setImage,
}) => {
  const [fileDataURL, setFileDataURL] = useState<string | null>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    let fileReader: FileReader,
      isCancel = false
    if (file) {
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        if (e.target?.result && !isCancel) {
          setFileDataURL(e.target.result.toString())
          setImage(e.target.result.toString())
        }
      }
      fileReader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }

  return (
    <div className='flex flex-col'>
      <label className='flex flex-col'>
        <input onChange={changeHandler} type='file' accept='image/*' />
        Выберите изображения для загрузки
      </label>
      {fileDataURL && <img className='h-96 w-96' src={fileDataURL} alt='' />}
    </div>
  )
}
