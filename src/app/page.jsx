'use client';

import Hero from '@/components/home/hero';
import FeatureLeft from '@/components/home/feature-left';
import FeatureRight from '@/components/home/feature-right';
import Mission from '@/components/home/mission';
import Cta from '@/components/home/cta';
import Footer from '@/components/home/footer';

export default function Home() {
	return (
		<>
			<Hero />
			<FeatureRight />
			<FeatureLeft />
			<Mission />
			<Cta />
			<Footer />
		</>
	);
}
