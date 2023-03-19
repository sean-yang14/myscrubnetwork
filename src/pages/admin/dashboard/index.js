import MainCard from '@/components/layout/main-card'
import DashboardContent from '@/components/admin/dashboard-content'
import MainLayout from '@/components/layout/main-layout'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'

export default function Dashboard() {

  const router = useRouter();
  // Check if user is admin
	const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const [authInitialized, setAuthInitialized] = useState(false);

  // Section: On load, pull user data from server
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserData = async () => {
          try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            const queryDoc = await getDoc(userRef);
            setUserData({
              ...queryDoc.data(),
              id: queryDoc.id,
            });
          } catch (error) {
            console.log(error);
          }
        };

        fetchUserData();
      } else {
        setUserData(null);
      }
      setAuthInitialized(true);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  // Section: Redirect if user is not an admin
  useEffect(() => {
    if (authInitialized && userData && userData.admin !== 'yes') {
      router.push('/jobs');
    }
  }, [authInitialized, userData, router]);

  if (!authInitialized) {
    return (
      <>
        <MainCard>
          <p>Loading...</p>
        </MainCard>
      </>
    );
  }
  
  const startingSelection = {
    new: true,
    update: false,
    rewards: false
  }

  return (
    <>
      <MainCard>
        <DashboardContent startObj={startingSelection} />
      </MainCard>
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