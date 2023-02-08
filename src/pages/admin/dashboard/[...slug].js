import SettingsCard from '@/components/settings-card'
import DashboardContent from '@/components/admin/dashboard-content'

export default function Dashboard({startingSelection}) {
  
  return (
    <>
      <SettingsCard>
        <DashboardContent startObj={startingSelection} />
      </SettingsCard>
    </>
  )
}

export async function getServerSideProps(context) {
  const {slug} = context.query
  let startingSelection = { new: true, update: false, rewards: false }

  if (slug?.[0] === 'update') {
    startingSelection = {
      new: false,
      update: true,
      rewards: false
    }
  } else if (slug?.[0] === 'rewards') {
    startingSelection = {
      new: false,
      update: false,
      rewards: true
    }
  }

  return {
    props: {
      startingSelection,
    },
  }
}