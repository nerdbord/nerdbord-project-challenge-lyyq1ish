import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { LogoParagraph } from '../Icons/Icons'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

const LandingPage = () => {
  return (
    <div className="relative flex max-h-screen flex-col bg-[url(/landingpage.jpeg)] bg-cover">
      <div className="absolute inset-0 left-0 top-0 z-0 h-full w-full bg-[#8E8E8E] opacity-50"></div>

      <div className="z-10 min-h-screen justify-center flex flex-col gap-5 p-4">
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
          <Link className="button-blue" href="/dashboard">
            Zaloguj się
          </Link>
          <Link className="button-white" href="/sign-up">
            Zarejestuj się
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
