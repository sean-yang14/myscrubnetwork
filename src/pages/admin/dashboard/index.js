import SettingsCard from '@/components/settings-card'
import DashboardContent from '@/components/admin/dashboard-content'

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