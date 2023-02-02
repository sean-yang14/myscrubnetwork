import React from 'react';
// import Footer from '../shared/footer';
// import Header from '../shared/header';

function MainLayout({ children }) {
	return (
		<>
			{/* <Header /> */}
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
}

export default MainLayout;
