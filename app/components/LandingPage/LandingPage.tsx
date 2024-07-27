import { Poppins } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

const LandingPage = () => {
  return (
    <div className="flex h-screen flex-col p-4">
      <div className="flex h-[50vh] items-center justify-center">
        <div>LOGO</div>
      </div>
      <div className="flex h-[50vh] flex-col gap-5">
        <h1 className="mb-5 text-2xl">PARAGONE</h1>
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
            href="/sign-in"
          >
            Zaloguj się
          </Link>
          <Link
            className="w-[100%] rounded-lg border border-[#383838] py-4 text-center"
            href="/sign-up"
          >
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
