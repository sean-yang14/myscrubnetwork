import SettingsCard from '@/components/settings-card'
import DashboardContent from '@/components/admin/dashboard-content'
import MainLayout from '@/components/main-layout'

export default function Dashboard() {

  const startingSelection = {
    new: true,
    update: false,
    rewards: false
  }

  return (
    <>
      <SettingsCard>
        <DashboardContent startObj={startingSelection} />
      </SettingsCard>
    </>
  )

}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}