import Header from '@/components/for-practices/header'
import MainLayout from '@/components/layout/main-layout'
import MainCard from '@/components/layout/main-card'
import Features from '@/components/for-practices/features'
import Competitors from '@/components/for-practices/competitors'
import CallToAction from '@/components/for-practices/cta'
import Recruiting from '@/components/for-practices/recruiting'
import Pricing from '@/components/for-practices/pricing'
import Footer from '@/components/for-practices/footer'

export default function ForPractices() {
  return (
    <MainCard>
      <Header />
      <Features />
      <Competitors />
      <Pricing />
      {/* <CallToAction />
      <Recruiting /> */}
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
