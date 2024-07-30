/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { useState } from 'react'
import styles from './Scanner.module.scss'
import {
  analyzeReceipt,
  saveAnalyzedReceipt,
} from '@/app/actions/receiptActions'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })
interface ReceiptData {
  DATA?: string
  SKLEP?: string
  SUMA?: string
  NUMER_PARAGONU?: string
  KATEGORIA?: string
  OPIS?: string
}

export default function Scanner() {
  const [result, setResult] = useState<ReceiptData | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [sendImage, setSendImage] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setResult({ OPIS: 'Please select a file first.' })
      return
    }

    setLoading(true)
    setSuccessMessage('')

    try {
      const base64String = await toBase64(selectedFile)
      const analysisResult = await analyzeReceipt(base64String)
      setResult(analysisResult)
    } catch (error) {
      console.error('Failed to analyze image:', error)
      setResult({ OPIS: 'Failed to analyze image' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setResult((prevResult) =>
      prevResult ? { ...prevResult, [name]: value } : { [name]: value }
    )
  }

  const handleSaveReceipt = async () => {
    try {
      const savedReceiptId = await saveAnalyzedReceipt({
        ...result,
        image: sendImage ? preview : '',
      })
      console.log('Receipt saved with ID:', savedReceiptId)
      setSuccessMessage('Paragon zapisany pomyślnie!')
    } catch (error) {
      console.error('Failed to save receipt:', error)
      setSuccessMessage('Błąd zapisu paragonu')
    }
  }

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div
      className={`max-w-screen relative mx-auto flex min-h-screen flex-col justify-center p-4 ${result ? 'bg-[#fff]' : ''}`}
    >
      <div>
        {!result && (
          <div>
            <h1 className="mb-4 text-left text-2xl text-[#383838]">
              Zrób zdjęcie swojego paragonu.
            </h1>
            <div>
              <div>
                <img
                  //@ts-ignore
                  src={preview}
                  className="h-[418px] w-[360px] rounded-xl border-2 border-dashed border-black"
                  alt=""
                />
              </div>
              <p className="my-1 text-[12px] text-[#515151]">
                Zrób zdjęcie paragonu poprzez umieszczenie go w ramce.
              </p>
              <div className="flex w-[100%] flex-col gap-2">
                {preview === null ? (
                  <>
                    <label
                      htmlFor="fileInput"
                      className="w-[100%] rounded-lg bg-[#383838] py-4 text-center text-white"
                    >
                      Zrób zdjęcie
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>
                ) : (
                  <button
                    onClick={handleImageUpload}
                    className="w-[100%] rounded-lg bg-[#383838] py-4 text-center text-white"
                    disabled={loading}
                  >
                    {loading ? 'Analizowanie...' : 'WYŚLIJ I ANALIZUJ PARAGON'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {!result && (
          <div className="flex">
            <p className="text-center text-[#000]">lub</p>
          </div>
        )}

        {!result && (
          <button
            onClick={() => {
              //@ts-ignore
              setResult(true)
            }}
            className="w-[100%] rounded-lg border border-[#383838] py-4 text-center"
            disabled={loading}
          >
            Dodaj ręcznie
          </button>
        )}

        {loading && <div className={styles.spinner}></div>}

        {result && (
          <div className="h-screen">
            <div>
              <button
                className="p-4"
                onClick={() => {
                  setResult(null)
                  setPreview(null)
                }}
              >
                {'<'}
              </button>
            </div>
            <h3 className={`${poppins.className} text-[20px] text-[#383838]`}>
              Sprawdź czy dane są poprawne
            </h3>
            <div>
              <div className="flex max-w-[364px] flex-col gap-3">
                <div className="flex flex-col">
                  <label>Kwota*</label>
                  <input
                    className="rounded-xl border border-black p-[12px]"
                    type="text"
                    name="KWOTA"
                    value={result.SUMA || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Nazwa sklepu*</label>
                  <input
                    className="rounded-xl border border-black p-[12px]"
                    type="text"
                    name="SKLEP"
                    value={result.SKLEP || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Kategoria*</label>
                  <input
                    className="rounded-xl border border-black p-[12px]"
                    type="text"
                    name="KATEGORIA"
                    value={result.KATEGORIA || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Data*</label>
                  <input
                    className="rounded-xl border border-black p-[12px]"
                    type="text"
                    name="DATA"
                    value={result.DATA || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Numer paragonu*</label>
                  <input
                    className="rounded-xl border border-black p-[12px]"
                    type="text"
                    name="NUMER_PARAGONU"
                    value={result.NUMER_PARAGONU || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Opis</label>
                  <textarea
                    name="OPIS"
                    value={result.OPIS || ''}
                    className="h-[128px] rounded-xl border border-black"
                    onChange={handleInputChange}
                    rows={4}
                    cols={50}
                  />
                </div>
                <p>Zdjęcie</p>
                <img
                  //@ts-ignore
                  src={preview}
                  className="h-[418px] w-[360px] rounded-xl"
                  alt=""
                />
              </div>
            </div>
            <div className="mb-10 p-1">
              <label className="mr-5">Zapisz zdjęcie jako załącznik</label>
              <input
                type="checkbox"
                checked={sendImage}
                onChange={(e) => setSendImage(e.target.checked)}
              />
            </div>
            <div className={styles.buttonsGroup}>
              <button
                onClick={handleSaveReceipt}
                className="mb-10 w-[100%] rounded-lg bg-[#383838] py-4 text-center text-white"
              >
                Zapisz
              </button>
            </div>
            {successMessage && (
              <div className={styles.successMessage}>{successMessage}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
