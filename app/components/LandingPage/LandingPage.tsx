import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { LogoParagraph } from '../Icons/Icons'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

const LandingPage = () => {
  return (
    <div className="relative max-h-screen flex flex-col bg-[url(/landingpage.jpeg)] bg-cover ">
      <div className="absolute left-0 inset-0 top-0 z-0 h-full w-full bg-[#8E8E8E] opacity-50"></div>
      <div className="flex h-[50vh]"></div>
      <div className="z-10 flex h-[50vh] flex-col gap-5 p-4">
        <div className="mb-4">
          <LogoParagraph />
        </div>
        <div className="mr-3">
          <h3 className="mb-1 text-2xl text-[#fff]">
            Zarejestruj się i bądź bliżej swoich finansów
          </h3>
          <p className={`${poppins.className} text-[#fff]`}>
            Dodawaj paragony, monitoruj swoje wydatki i oszczędzaj więcej co
            miesiąc.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            className="w-[100%] rounded-lg bg-[#3F5FE3] py-4 text-center text-white"
            href="/dashboard"
          >
            Zaloguj się
          </Link>
          <Link
            className="w-[100%] rounded-lg border bg-[#fff] py-4 text-center"
            href="/sign-up"
          >
            Zarejestuj się
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
