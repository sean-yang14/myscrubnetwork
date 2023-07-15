import MainLayout from '@/components/layout/main-layout'
import MainCard from '@/components/layout/main-card'
import Header from '@/components/job-seekers/header'
import ForDoctors from '@/components/job-seekers/for-doctors'
import DentalProfessionals from '@/components/job-seekers/dental-professionals'
// import Footer from '@/components/for-practices/footer'
import CandidateInfo from '@/components/job-seekers/candidate-info'
import Footer from '@/components/layout/footer'

export default function JobSeekers() {
  return (
    <MainCard>
      <Header />
      <DentalProfessionals />
      <CandidateInfo />
      <Footer />
    </MainCard>
  )

}

JobSeekers.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}
