/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useState } from 'react'
import {
  analyzeReceipt,
  saveAnalyzedReceipt,
} from '../../actions/receiptActions'
import { Poppins } from 'next/font/google'
import SuccesPage from '../SuccesPage/SuccesPage'
import { BackIcon } from '../Icons/Icons'
import TopNavbar from '../TopNavbar/TopNavbar'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

interface ReceiptData {
  DATA?: string
  SKLEP?: string
  SUMA?: string
  NUMER_PARAGONU?: string
  KATEGORIA?: string
  OPIS?: string
}

const RECEIPT_CATEGORIES = [
  'Spożywcze',
  'Elektronika',
  'Odzież',
  'Kosmetyki',
  'Dom',
  'Rozrywka',
  'Jedzenie',
  'Zdrowie i leki',
  'Transport',
  'Edukacja',
  'Hobby',
  'Inne',
]

export default function Scanner() {
  const [result, setResult] = useState<ReceiptData | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [sendImage, setSendImage] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<boolean>(false)
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setResult((prevResult) =>
      prevResult ? { ...prevResult, [name]: value } : { [name]: value }
    )
  }

  const handleSaveReceipt = async () => {
    if (!result?.SUMA || !result?.KATEGORIA) {
      setSuccessMessage(true)
      return
    }

    try {
      const payload = {
        ...result,
        image: sendImage ? preview : '',
      }

      const savedReceiptId = await saveAnalyzedReceipt(payload)
      console.log('Receipt saved with ID:', savedReceiptId)

      setShowFinalPage(true)
    } catch (error) {
      console.error('Failed to save receipt:', error)
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
    <>
      <TopNavbar backIconHref="nl" position="absolute" />
      <div
        className={`${poppins.className} max-w-screen relative mx-auto flex min-h-screen flex-col items-center justify-center p-4 ${result ? 'bg-[#fff]' : ''}`}
      >
        {!showFinalPage ? (
          <div className="flex flex-col items-center justify-center">
            {!result && (
              <div className="">
                <h1 className="mb-4 text-left text-[22px] text-[#383838]">
                  Zrób zdjęcie swojego paragonu.
                </h1>
                <div>
                  <div className="mb-6 h-[418px] w-[360px] rounded-lg border-4 border-dashed border-[#3f5fe3]">
                    {preview &&
                    <img
                      src={preview || ''}
                      alt="uploaded image preview"
                    />}
                  </div>

                  <div className="flex w-[100%] flex-col gap-2">
                    {preview === null ? (
                      <>
                        <label
                          htmlFor="fileInput"
                          className="w-[100%] rounded-xl bg-[#3F5FE3] py-4 text-center text-white"
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
                        className="w-[100%] rounded-xl bg-[#3F5FE3] py-4 text-center text-white"
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
                <div className="flex-grow border-t border-white"></div>
                <span
                  className={`${poppins.className} mx-4 text-center text-[16px] text-[#fff]`}
                >
                  lub
                </span>
                <div className="flex-grow border-t border-[#fff]"></div>
              </div>
            )}

            {!result && (
              <button
                onClick={() => {
                  setResult({} as ReceiptData);
                }}
                className="w-[100%] rounded-xl border bg-[#fff] py-4 text-center"
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
              <div className="mt-16 flex h-full flex-col">
                <div>
                  <button
                    className="absolute left-5 top-9 z-10"
                    onClick={() => {
                      setResult(null)
                      setPreview(null)
                    }}
                  >
                    <BackIcon />
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
                    <div className="relative flex justify-between">
                      <div className="flex w-[48%] flex-col">
                        <label>Kwota*</label>
                        <input
                          className={`rounded-xl border p-[12px] ${successMessage && !result?.SUMA && 'border-[red]'}`}
                          type="string"
                          name="SUMA"
                          value={result.SUMA || ''}
                          onChange={handleInputChange}
                          placeholder="21,37"
                        />
                      </div>
                      <div className="flex w-[48%] flex-col">
                        <label>Data*</label>
                        <input
                          className={`rounded-xl border p-[12px] ${successMessage && !result?.KATEGORIA && 'border-[red]'}`}
                          type="date"
                          name="DATA"
                          value={result.DATA || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label>Nazwa sklepu*</label>
                      <input
                        className={`rounded-xl border p-[12px] ${successMessage && !result?.SKLEP && 'border-[red]'}`}
                        type="text"
                        name="SKLEP"
                        value={result.SKLEP || ''}
                        onChange={handleInputChange}
                        placeholder="Lidronka"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Kategoria*</label>
                      <select
                        className={`rounded-xl border p-[12px] ${successMessage && !result?.KATEGORIA && 'border-[red]'}`}
                        name="KATEGORIA"
                        value={result.KATEGORIA || ''}
                        onChange={handleInputChange}
                      >
                        <option disabled value="">
                          Wybierz kategorię
                        </option>
                        {RECEIPT_CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label>Numer paragonu</label>
                      <input
                        className="rounded-xl border border-black p-[12px]"
                        type="text"
                        name="NUMER_PARAGONU"
                        value={result.NUMER_PARAGONU || ''}
                        onChange={handleInputChange}
                        placeholder="#7648-2137"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Opis</label>
                      <textarea
                        name="OPIS"
                        value={result.OPIS || ''}
                        className="h-[128px] rounded-xl border border-black p-3"
                        onChange={handleInputChange}
                        rows={4}
                        cols={50}
                        placeholder="Cotygodniowe zakupy"
                      />
                    </div>
                    {preview ? (
                      <div>
                        <p>Zdjęcie</p>
                        <img
                          src={preview}
                          className="h-[418px] w-[360px] border-none p-4"
                          alt=""
                        />
                        <div className="flex items-center">
                          <label className="mr-5">
                            Zapisz zdjęcie jako załącznik
                          </label>
                          <input
                            type="checkbox"
                            checked={sendImage}
                            className="toggle"
                            onChange={(e) => setSendImage(e.target.checked)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-16 flex flex-col">
                        <p>Załącznik</p>
                        <label
                          htmlFor="fileInput"
                          className="w-[100%] rounded-xl border border-[#383838] py-4 text-center"
                        >
                          + dodaj załącznik
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden rounded-xl"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleSaveReceipt}
                    className="mb-16 mt-[100px] w-[100%] rounded-lg bg-[#3F5FE3] py-4 text-center text-white"
                  >
                    Zapisz
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <SuccesPage image={sendImage ? preview || '' : ''} />
        )}
      </div>
    </>
  )
}
