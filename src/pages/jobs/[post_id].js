import MainLayout from '@/components/layout/main-layout'
import MainCard from '@/components/layout/main-card'
import Footer from '@/components/layout/footer'
import FullPage from '@/components/jobs/full-page'
import { useRouter } from 'next/router'

export default function FullPagePost() {
  const router = useRouter()
  
  return (
    <MainCard>
      <FullPage id={router.query.post_id}/>
      <Footer />
    </MainCard>
  )

}

FullPagePost.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}