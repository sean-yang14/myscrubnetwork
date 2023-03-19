import MainCard from '@/components/layout/main-card'
import DashboardContent from '@/components/admin/dashboard-content'
import MainLayout from '@/components/layout/main-layout'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase.config';

export default function DynamicDashboard({startingSelection, id }) {

  // Check if user is admin
	const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const router = useRouter();
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
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <MainCard>
        <DashboardContent id={id} startObj={startingSelection} />
      </MainCard>
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

  let post_id = slug?.[1]


  return {
    props: {
      startingSelection,
      id: post_id,
      protected: true,
    },
  }
}

DynamicDashboard.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}