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

// export async function getStaticProps(context) {
//   return {
//     props: {
//       protected: true,
//     },
//   }
// }

Apply.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}