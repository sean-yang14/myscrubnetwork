import { useEffect, useState } from 'react';
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
	endBefore,
	limitToLast,
	getCountFromServer,
} from 'firebase/firestore';
import { db } from '../../../../lib/firebase.config';
import { toast } from 'react-toastify';
import MainBody from '../main-body';

export default function Peds() {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedJob, setSelectedJob] = useState();
	const [open, setOpen] = useState(false);
	const [totalListings, setTotalListings] = useState(null);
	const [lastFetchedListing, setLastFetchedListing] = useState(null);
	const [firstFetchedListing, setFirstFetchedListing] = useState(null);
	const [currentListingsCount, setCurrentListingsCount] = useState(null);
	const [stateSelected, setStateSelected] = useState({ id: 1, name: 'All' });
	const [citiesSelected, setCitiesSelected] = useState([]);
	const [cityList, setCityList] = useState([]);
	const [citiesSubmitted, setCitiesSubmitted] = useState(false);

	const postLimit = 5;
	const specialtyTab = 'pediatric';

	// Pull data on load and if state is updated
	useEffect(() => {
		const fetchListings = async () => {
			try {
				let listingsQuery = null;
				let pageNavQuery = null;

				// Get reference
				const listingsRef = collection(db, 'listings');

				// Create query if no state selected
				if (stateSelected.name === 'All') {
					listingsQuery = query(
						listingsRef,
						limit(postLimit),
						orderBy('ranking', 'desc'),
						where('specialty', '==', specialtyTab)
					);

					pageNavQuery = query(
						listingsRef,
						orderBy('ranking', 'desc'),
						where('specialty', '==', specialtyTab)
					);
				}

				// Create state specific query
				if (stateSelected.name !== 'All') {
					listingsQuery = query(
						listingsRef,
						limit(postLimit),
						orderBy('ranking', 'desc'),
						where('state', '==', stateSelected.name),
						where('specialty', '==', specialtyTab)
					);

					pageNavQuery = query(
						listingsRef,
						orderBy('ranking', 'desc'),
						where('state', '==', stateSelected.name),
						where('specialty', '==', specialtyTab)
					);
				}

				// Execute query
				const querySnap = await getDocs(listingsQuery);
				const countSnap = await getCountFromServer(pageNavQuery);

				// Get all cities in state if state is selected for city filter
				if (stateSelected.name !== 'All') {
					const cities = [];
					const citySnap = await getDocs(pageNavQuery);
					citySnap.forEach((doc) => {
						cities.push(doc.data().city);
					});
					setCityList([...new Set(cities)]);
				}

				setTotalListings(countSnap.data().count);

				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
				setLastFetchedListing(lastVisible);

				const firstVisible = querySnap.docs[0];
				setFirstFetchedListing(firstVisible);

				const newListings = [];

				querySnap.forEach((doc) => {
					return newListings.push({
						id: doc.id,
						// data: doc.data(),
						...doc.data(),
					});
				});

				setListings(newListings);
				if (totalListings === 0) {
					setCurrentListingsCount(0);
				} else if (totalListings < 5) {
					setCurrentListingsCount(totalListings);
				} else {
					setCurrentListingsCount(5);
				}
				setLoading(false);
			} catch (error) {
				toast.error('Could not fetch posts');
				console.log(error);
			}
		};

		if (citiesSelected.length === 0) {
			fetchListings();
		}
	}, [stateSelected, totalListings, citiesSelected]);

	// Pull data if cities are updated
	useEffect(() => {
		const fetchListings = async () => {
			try {
				let listingsQuery = null;
				let pageNavQuery = null;

				// Get reference
				const listingsRef = collection(db, 'listings');

				// Create query for cities
				listingsQuery = query(
					listingsRef,
					limit(postLimit),
					orderBy('ranking', 'desc'),
					where('specialty', '==', specialtyTab),
					where('city', 'in', citiesSelected)
				);

				pageNavQuery = query(
					listingsRef,
					orderBy('ranking', 'desc'),
					where('specialty', '==', specialtyTab),
					where('city', 'in', citiesSelected)
				);

				// Execute query
				const querySnap = await getDocs(listingsQuery);
				const countSnap = await getCountFromServer(pageNavQuery);

				setTotalListings(countSnap.data().count);

				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
				setLastFetchedListing(lastVisible);

				const firstVisible = querySnap.docs[0];
				setFirstFetchedListing(firstVisible);

				const listings = [];

				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						// data: doc.data(),
						...doc.data(),
					});
				});

				setListings(listings);
				if (totalListings === 0) {
					setCurrentListingsCount(0);
				} else if (totalListings < 5) {
					setCurrentListingsCount(totalListings);
				} else {
					setCurrentListingsCount(5);
				}
				setLoading(false);
			} catch (error) {
				toast.error('Could not fetch posts');
				console.log(error);
			}
		};

		if (citiesSubmitted && citiesSelected.length > 0) {
			fetchListings();
			setCitiesSubmitted(false);
		}
	}, [citiesSubmitted, citiesSelected, totalListings]);

	//create a useeffect for when currentlistingscount changes
	useEffect(() => {
		// console.log('');
	}, [currentListingsCount]);

	// Pagination
	const handleMoreJobs = async (e) => {
		try {
			setLoading(true);
			let listingsQuery = null;

			// Get reference
			const listingsRef = collection(db, 'listings');

			// Create query
			if (citiesSelected.length > 0) {
				// Run cities specific query
				listingsQuery = query(
					listingsRef,
					limit(postLimit),
					orderBy('ranking', 'desc'),
					where('state', '==', stateSelected.name),
					where('specialty', '==', specialtyTab),
					where('city', 'in', citiesSelected),
					startAfter(lastFetchedListing)
				);
			} else if (stateSelected.name !== 'All') {
				// Run state specific query
				listingsQuery = query(
					listingsRef,
					limit(postLimit),
					orderBy('ranking', 'desc'),
					where('state', '==', stateSelected.name),
					where('specialty', '==', specialtyTab),
					startAfter(lastFetchedListing)
				);
			} else {
				// Create query for all listings
				listingsQuery = query(
					listingsRef,
					limit(postLimit),
					orderBy('ranking', 'desc'),
					where('specialty', '==', specialtyTab),
					startAfter(lastFetchedListing)
				);
			}

			// Execute query
			const querySnap = await getDocs(listingsQuery);

			const lastVisible = querySnap.docs[querySnap.docs.length - 1];
			setLastFetchedListing(lastVisible);

			const firstVisible = querySnap.docs[0];
			setFirstFetchedListing(firstVisible);

			const newListings = [];

			querySnap.forEach((doc) => {
				return newListings.push({
					id: doc.id,
					// data: doc.data(),
					...doc.data(),
				});
			});

			//append new listings to existing listings
			setListings([...listings, ...newListings]);
			setLoading(false);

			if (totalListings - currentListingsCount < postLimit) {
				setCurrentListingsCount(totalListings);
			} else {
				setCurrentListingsCount(currentListingsCount + postLimit);
			}
		} catch (error) {
			toast.error('Could not fetch listings');
		}
	};

	const handleClick = (e) => {
		setSelectedJob(listings[e.currentTarget.id]);
		setOpen(true);
	};

	const handleModalClose = (e) => {
		setOpen(false);
	};

	const handleStateChange = (value) => {
		setStateSelected(value);
		setCitiesSelected([]);
	};

	return (
		<>
			<MainBody
				setOpen={setOpen}
				open={open}
				handleModalClose={handleModalClose}
				handleClick={handleClick}
				currentListingsCount={currentListingsCount}
				stateSelected={stateSelected}
				specialtyTab={specialtyTab}
				handleStateChange={handleStateChange}
				handleMoreJobs={handleMoreJobs}
				listings={listings}
				selectedJob={selectedJob}
				setSelectedJob={setSelectedJob}
				totalListings={totalListings}
				cityList={cityList}
				setCitiesSelected={setCitiesSelected}
				setCitiesSubmitted={setCitiesSubmitted}
			/>
		</>
	);
}
