/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { useState } from 'react'
import styles from './Scanner.module.scss'
import {
  analyzeReceipt,
  saveAnalyzedReceipt,
} from '@/app/actions/receiptActions'
import { Poppins } from 'next/font/google'
import SuccesPage from '../SuccesPage/SuccesPage'

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
  const [showFinalPage, setShowFinalPage] = useState<boolean>(false)

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
      setShowFinalPage(true)
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
      className={`max-w-screen relative mx-auto flex min-h-screen flex-col items-center justify-center ${result ? 'bg-[#fff]' : ''}`}
    >
      {!showFinalPage ? (
        <div className="flex flex-col items-center justify-center">
          {!result && (
            <div className="">
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
                <p className="my-1 mb-5 text-[12px] text-[#515151]">
                  Zrób zdjęcie paragonu poprzez umieszczenie go w ramce.
                </p>
                <div className="flex w-[100%] flex-col gap-2">
                  {preview === null ? (
                    <>
                      <label
                        htmlFor="fileInput"
                        className="w-[100%] rounded-xl bg-[#383838] py-4 text-center text-white"
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
                      className="w-[100%] rounded-xl bg-[#383838] py-4 text-center text-white"
                      disabled={loading}
                    >
                      {loading ? 'analizowanie...' : 'przeanalizuj paragon'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {!result && (
            <div className="relative my-4 flex w-full items-center justify-center">
              <div className="flex-grow border-t border-black"></div>
              <span
                className={`${poppins.className} mx-4 text-center text-[16px] text-[#000]`}
              >
                lub
              </span>
              <div className="flex-grow border-t border-black"></div>
            </div>
          )}

          {!result && (
            <button
              onClick={() => {
                //@ts-ignore
                setResult(true)
              }}
              className="w-[100%] rounded-xl border border-[#383838] py-4 text-center"
              disabled={loading}
            >
              Dodaj ręcznie
            </button>
          )}

          {loading && (
            <div>
              <div className="absolute left-0 top-0 h-screen w-full bg-black/50"></div>
              <div className="absolute right-1/2 top-1/2 w-[90%] -translate-y-1/2 translate-x-1/2 bg-[#fff] p-3 text-center">
                trwa generowanie skanu paragonu
              </div>
            </div>
          )}

          {result && (
            <div className="h-full">
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
              {preview && (
                <h3
                  className={`${poppins.className} text-[20px] text-[#383838]`}
                >
                  Sprawdź czy dane są poprawne
                </h3>
              )}
              <div>
                <div className="flex max-w-[364px] flex-col gap-3">
                  <div className="flex flex-col">
                    <label>Kwota*</label>
                    <input
                      className="rounded-xl border border-black p-[12px]"
                      type="string"
                      name="SUMA"
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
                      className="h-[128px] rounded-xl border border-black p-2"
                      onChange={handleInputChange}
                      rows={4}
                      cols={50}
                    />
                  </div>
                  {preview && (
                    <div>
                      <p>Zdjęcie</p>
                      <img
                        //@ts-ignore
                        src={preview}
                        className="h-[418px] w-[360px] border-0 border-none"
                        alt=""
                      />
                      <div className="mb-10 p-1">
                        <label className="mr-5">
                          Zapisz zdjęcie jako załącznik
                        </label>
                        <input
                          type="checkbox"
                          checked={sendImage}
                          onChange={(e) => setSendImage(e.target.checked)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.buttonsGroup}>
                <button
                  onClick={handleSaveReceipt}
                  className="mb-10 mt-10 w-[100%] rounded-lg bg-[#383838] py-4 text-center text-white"
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
      ) : (
        <SuccesPage image={preview || ''} />
      )}
    </div>
  )
}
