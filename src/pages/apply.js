import MainCard from '@/components/settings-card'
import MainLayout from '@/components/main-layout'
import Application from '@/components/application'

export default function Apply() {
  return (
    <MainCard>
      <Application external={'yes'} />
    </MainCard>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
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