import Header from '@/components/job-post/header'
import MainLayout from '@/components/layout/main-layout'
import MainCard from '@/components/layout/main-card'
import PracticesPitch from '@/components/job-post/practices-pitch'
import Footer from '@/components/layout/footer'
import JobPost from '@/components/job-post/job-post'

export default function ForPractices() {
  const formEntries = [
    {
      label: 'Position Title',
      type: 'text',
      name: 'title',
      id: 'title',
      placeholder: 'Associate General Dentist',
      aria: 'position title',
    },
    {
      label: 'Practice Website',
      type: 'text',
      name: 'website',
      id: 'website',
      placeholder: 'https://website.com',
      aria: 'practice website',
    },
    {
      label: 'City',
      type: 'text',
      name: 'city',
      id: 'city',
      placeholder: 'Brooklyn',
      aria: 'practice city',
    },
    {
      label: 'State',
      type: 'text',
      name: 'state',
      id: 'state',
      placeholder: 'NY',
      aria: 'practice state',
    },
    {
      label: 'Practice Type',
      type: 'text',
      name: 'category',
      id: 'category',
      placeholder: 'Private / DSO',
    },
  ];

  return (
    <MainCard>
      <Header />
      <PracticesPitch />
      <JobPost formEntries={formEntries} />
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
