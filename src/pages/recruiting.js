import MainLayout from '@/components/layout/main-layout'
import MainCard from '@/components/layout/main-card'
import CallToAction from '@/components/recruiting/cta'
import Hero from '@/components/recruiting/hero'
import Offerings from '@/components/recruiting/offerings'
import ValueProps from '@/components/recruiting/value-props'
import Footer from '@/components/for-practices/footer'
import Link from 'next/link'

export default function Recruiting() {
  // return (
  //   <MainCard>
  //     <Hero />
  //     <ValueProps />
  //     <Offerings />
  //     <CallToAction />
  //     <Footer />
  //   </MainCard>
  // )

  return (
    <MainCard>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 mt-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </MainCard>
)

}

Recruiting.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}
