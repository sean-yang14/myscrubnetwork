import MainLayout from '@/components/layout/main-layout'
import MainCard from '@/components/layout/main-card'
import Header from '@/components/events/header'
import ForDoctors from '@/components/events/for-doctors'
import Sponsors from '@/components/events/sponsors'
import Footer from '@/components/for-practices/footer'

export default function ForPractices() {
  return (
    <MainCard>
      <Header />
      <ForDoctors />
      <Sponsors />
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
