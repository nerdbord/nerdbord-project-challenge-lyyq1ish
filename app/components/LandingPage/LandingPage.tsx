import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { Logo, LogoParagraph } from '../Icons'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

const LandingPage = () => {
  return (
    <div className="flex h-screen flex-col p-4">
      <div className="flex h-[50vh] items-center justify-center">
        <div>
          <Logo />
        </div>
      </div>
      <div className="flex h-[50vh] flex-col gap-5">
        <div className="mb-4">
          <LogoParagraph />
        </div>
        <div className="mr-3">
          <h3 className="mb-1 text-2xl">
            Zarejestruj się i bądź bliżej swoich finansów
          </h3>
          <p className={`${poppins.className} text-[#515151]`}>
            Dodawaj paragony, monitoruj swoje wydatki i oszczędzaj więcej co
            miesiąc.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            className="w-[100%] rounded-lg bg-[#383838] py-4 text-center text-white"
            href="/dashboard"
          >
            zaloguj się
          </Link>
          <Link
            className="w-[100%] rounded-lg border border-[#383838] py-4 text-center"
            href="/sign-up"
          >
            zarejestuj się
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
