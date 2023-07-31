import MainCard from '@/components/layout/main-card'
import MainLayout from '@/components/layout/main-layout'
import Application from '@/components/jobs/application'

export default function Apply() {
  return (
    <MainCard>
      <Application external={'yes'} />
    </MainCard>
  )
}


Apply.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}