import MainCard from '@/components/layout/main-card'
import MainLayout from '@/components/layout/main-layout'
import Application from '@/components/jobs/application'

export default function Apply({company, title, post_id}) {
  return (
    <MainCard>
      <Application company={company} title={title} id={post_id}/>
    </MainCard>
  )
}

export async function getServerSideProps(context) {
  const {company, title, post_id} = context.query

  return {
    props: {
      company,
      title,
      post_id,
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

