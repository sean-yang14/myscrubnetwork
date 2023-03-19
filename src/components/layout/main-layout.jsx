import React from 'react';
import Navbar from '@/components/layout/navbar';
// import Footer from '../shared/footer';
// import Header from '../shared/header';

function MainLayout({ children }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
}

export default MainLayout;
