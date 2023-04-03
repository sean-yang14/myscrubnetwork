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
import { db } from '../../../lib/firebase.config';
import { toast } from 'react-toastify';
import MainBody from './main-body';

export default function General({
	practiceType,
	practiceTypeChanged,
	setPracticeTypeChanged,
}) {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedJob, setSelectedJob] = useState();
	const [open, setOpen] = useState(false);
	const [totalListings, setTotalListings] = useState(null);
	const [lastFetchedListing, setLastFetchedListing] = useState(null);
	const [firstFetchedListing, setFirstFetchedListing] = useState(null);
	const [currentPage, setCurrentPage] = useState(null);
	const [stateSelected, setStateSelected] = useState({ id: 1, name: 'All' });
	const [citiesSelected, setCitiesSelected] = useState([]);
	const [cityList, setCityList] = useState([]);
	const [citiesSubmitted, setCitiesSubmitted] = useState(false);
	const [currentCard, setCurrentCard] = useState({
		0: true,
		1: false,
		2: false,
		3: false,
		4: false,
	});

	const noCardSelected = {
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
	};

	// if you change the post limit then you have to update currentCard in main body
	const postLimit = 5;

	// Pull data on load and if state is updated
	useEffect(() => {
		if (practiceTypeChanged) {
			setCitiesSelected([]);
			setStateSelected({ id: 1, name: 'All' });
			setPracticeTypeChanged(false);
		}
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
						orderBy('tier', 'desc'),
						where('type', '==', practiceType),
						where('specialty', '==', 'general')
					);

					pageNavQuery = query(
						listingsRef,
						orderBy('tier', 'desc'),
						where('type', '==', practiceType),
						where('specialty', '==', 'general')
					);
				}

				// Create state specific query
				if (stateSelected.name !== 'All') {
					listingsQuery = query(
						listingsRef,
						limit(postLimit),
						orderBy('tier', 'desc'),
						where('type', '==', practiceType),
						where('state', '==', stateSelected.name),
						where('specialty', '==', 'general')
					);

					pageNavQuery = query(
						listingsRef,
						orderBy('tier', 'desc'),
						where('type', '==', practiceType),
						where('state', '==', stateSelected.name),
						where('specialty', '==', 'general')
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

				const listings = [];

				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						// data: doc.data(),
						...doc.data(),
					});
				});

				setListings(listings);
				setSelectedJob(listings[0]);
				if (totalListings === 0) {
					setCurrentPage(0);
				} else {
					setCurrentPage(1);
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
	}, [stateSelected, practiceType, totalListings, citiesSelected]);

	// Pagination
	const handleNextPage = async (e) => {
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
					orderBy('tier', 'desc'),
					where('type', '==', practiceType),
					where('state', '==', stateSelected.name),
					where('specialty', '==', 'general'),
					where('city', 'in', citiesSelected),
					startAfter(lastFetchedListing)
				);
			} else if (stateSelected.name !== 'All') {
				// Run state specific query
				listingsQuery = query(
					listingsRef,
					limit(postLimit),
					orderBy('tier', 'desc'),
					where('type', '==', practiceType),
					where('state', '==', stateSelected.name),
					where('specialty', '==', 'general'),
					startAfter(lastFetchedListing)
				);
			} else {
				// Create query for all listings
				listingsQuery = query(
					listingsRef,
					limit(postLimit),
					orderBy('tier', 'desc'),
					where('type', '==', practiceType),
					where('specialty', '==', 'general'),
					startAfter(lastFetchedListing)
				);
			}

			// Execute query
			const querySnap = await getDocs(listingsQuery);

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
			setSelectedJob(listings[0]);
			setLoading(false);
			setCurrentPage(currentPage + 1);
			setCurrentCard({
				...noCardSelected,
				0: true,
			});
		} catch (error) {
			toast.error('Could not fetch listings');
			console.log(error);
		}
	};

	const handlePrevPage = async (e) => {
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
					limitToLast(postLimit),
					orderBy('tier', 'desc'),
					where('type', '==', practiceType),
					where('state', '==', stateSelected.name),
					where('specialty', '==', 'general'),
					where('city', 'in', citiesSelected),
					endBefore(firstFetchedListing)
				);
			} else if (stateSelected.name !== 'All') {
				// Run state specific query
				listingsQuery = query(
					listingsRef,
					limitToLast(postLimit),
					orderBy('tier', 'desc'),
					where('type', '==', practiceType),
					where('state', '==', stateSelected.name),
					where('specialty', '==', 'general'),
					endBefore(firstFetchedListing)
				);
			} else {
				// Create query for all listings
				listingsQuery = query(
					listingsRef,
					limitToLast(postLimit),
					orderBy('tier', 'desc'),
					where('type', '==', practiceType),
					where('specialty', '==', 'general'),
					endBefore(firstFetchedListing)
				);
			}

			// Execute query
			const querySnap = await getDocs(listingsQuery);

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
			setSelectedJob(listings[0]);
			setLoading(false);
			setCurrentPage(currentPage - 1);
			setCurrentCard({
				...noCardSelected,
				0: true,
			});
		} catch (error) {
			toast.error('Could not fetch listings');
			console.log(error);
		}
	};

	const handleClick = (e) => {
		setSelectedJob(listings[e.currentTarget.id]);
		setOpen(true);
		setCurrentCard({
			...noCardSelected,
			[e.currentTarget.id]: true,
		});
	};

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
					orderBy('tier', 'desc'),
					where('type', '==', practiceType),
					where('specialty', '==', 'general'),
					where('city', 'in', citiesSelected)
				);

				pageNavQuery = query(
					listingsRef,
					orderBy('tier', 'desc'),
					where('type', '==', practiceType),
					where('specialty', '==', 'general'),
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
				setSelectedJob(listings[0]);
				if (totalListings === 0) {
					setCurrentPage(0);
				} else {
					setCurrentPage(1);
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
	}, [totalListings, citiesSelected, practiceType, citiesSubmitted]);

	const totalPages = Math.ceil(totalListings / postLimit);

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
				totalPages={totalPages}
				currentPage={currentPage}
				stateSelected={stateSelected}
				handleStateChange={handleStateChange}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				listings={listings}
				selectedJob={selectedJob}
				setSelectedJob={setSelectedJob}
				totalListings={totalListings}
				cityList={cityList}
				setCitiesSelected={setCitiesSelected}
				setCitiesSubmitted={setCitiesSubmitted}
				currentCard={currentCard}
				practiceType={practiceType}
			/>
		</>
	);
}
