import MainLayout from "@/components/layout/main-layout"
import MainCard from '@/components/layout/main-card';
import General from "@/components/jobs/specialty-pages/general"
import Endo from "@/components/jobs/specialty-pages/endo";
import OralSurgeon from "@/components/jobs/specialty-pages/oral-surgeon";
import Ortho from "@/components/jobs/specialty-pages/ortho";
import Peds from "@/components/jobs/specialty-pages/peds";
import Prosth from "@/components/jobs/specialty-pages/prosth";
import Perio from "@/components/jobs/specialty-pages/perio";
import Footer from '@/components/layout/footer'
import Tabs from "@/components/jobs/tabs";
import { useState } from "react";
import PracticeToggle from "@/components/jobs/practice-toggle";

export default function Jobs() {
  const [selectedTab, setSelectedTab] = useState({
    general: true,
    endodontist: false,
    oralSurgeon: false,
    orthodontist: false,
    pediatric: false,
    // prosthodontist: false,
    // hygenists: false
  })

  const resetTabs = {
    general: false,
    endodontist: false,
    oralSurgeon: false,
    orthodontist: false,
    pediatric: false,
    // prosthodontist: false,
    // hygenists: false
  }
  
  const tabs = [
    { name: 'General', id:'general', current: selectedTab.general },
    { name: 'Endodontist',id:'endodontist', current: selectedTab.endodontist },
    { name: 'Oral Surgeon',id:'oralSurgeon', current: selectedTab.oralSurgeon },
    { name: 'Orthodontist',id:'orthodontist', current: selectedTab.orthodontist },
    { name: 'Pediatric',id:'pediatric', current: selectedTab.pediatric },
    // { name: 'Prosthodontist',id:'prosthodontist', current: selectedTab.prosthodontist },
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

  return (
    <>
      <Tabs tabs={tabs} handleClick={handleClick} handleChange={handleChange}/>
      {
        selectedTab.general === true ?
        <General /> :selectedTab.endodontist=== true ?
        <Endo /> : selectedTab.oralSurgeon=== true ?
        <OralSurgeon /> : selectedTab.orthodontist=== true ?
        <Ortho /> : selectedTab.pediatric=== true ?
        <Peds /> : 
        // selectedTab.prosthodontist=== true ?
        // <Prosth /> : 
        selectedTab.perio=== true ?
        <Perio /> :
          <MainCard>

          <h1>Sorry, we currently do not have any jobs in this specialty</h1>
          <p>Please check back soon!</p>
        </MainCard>

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
