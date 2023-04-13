import MainLayout from '@/components/layout/main-layout'
import MainCard from '@/components/layout/main-card'
import CallToAction from '@/components/recruiting/cta'
import Hero from '@/components/recruiting/hero'
import Offerings from '@/components/recruiting/offerings'
import ValueProps from '@/components/recruiting/value-props'
import Footer from '@/components/for-practices/footer'

export default function ForPractices() {
  return (
    <MainCard>
      <Hero />
      <ValueProps />
      <Offerings />
      <CallToAction />
      <Footer />
    </MainCard>
  )

}

ForPractices.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}
