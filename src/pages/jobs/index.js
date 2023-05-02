import MainLayout from "@/components/layout/main-layout"
import General from "@/components/jobs/general"
import Footer from '@/components/layout/footer'
import Tabs from "@/components/jobs/tabs";
import { useState } from "react";
import PracticeToggle from "@/components/jobs/practice-toggle";

export default function Jobs() {
  const [selectedTab, setSelectedTab] = useState({
    general: true,
    // pediatrics: false,
    // hygenists: false
  })

  const resetTabs = {
    general: false,
    // pediatrics: false,
    // hygenists: false
  }
  
  const tabs = [
    { name: 'General', id:'general', current: selectedTab.general },
    // { name: 'Pediatrics',id:'pediatrics', current: selectedTab.pediatrics },
    // { name: 'Hygenists', id:'hygenists', current: selectedTab.hygenists },
  ];

  const handleClick = (e) => {
    setSelectedTab({
      ...resetTabs,
      [e.target.id]:true
    })
  }

  const handleChange = (e) => {
    const matchedTab = tabs.find((tab) => tab.name === e.target.value)
    setSelectedTab({
      ...resetTabs,
      [matchedTab.id]:true
    })
  }

  const [selectedType, setSelectedType] = useState({
    private: true,
    dso: false,
  })

  const [practiceTypeChanged, setPracticeTypeChanged] = useState(false)

  const resetToggle = {
    private: false,
    dso: false,
  }

  const toggle = [
    { name: 'Private', id: 'private', current: selectedType.private },
    { name: 'DSO', id: 'dso', current: selectedType.dso },
  ];

  const handleToggleClick = (e) => {
    setSelectedType({
      ...resetToggle,
      [e.target.id]:true
    })
    setPracticeTypeChanged(true)
  }

  // To search using loop
  // for (const key in selectedType) {
  //   if (selectedType(key)) {

  //   }
  // }

  let type = ''
  if (selectedType.private) {
    type = 'private'
  } else {
    type = 'dso'
  }

  return (
    <>
      <Tabs tabs={tabs} handleClick={handleClick} handleChange={handleChange}/>
      <PracticeToggle tabs={toggle} handleClick={handleToggleClick} />
      {
        selectedTab.general === true ?
        <General practiceType={type} practiceTypeChanged={practiceTypeChanged} setPracticeTypeChanged={setPracticeTypeChanged}/> :
        <h1>TBD</h1>
      }
      <Footer />
    </>
  )
}

Jobs.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}
