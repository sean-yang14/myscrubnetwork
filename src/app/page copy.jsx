'use client';

import Hero from '@/components/home/hero';
import FeatureLeft from '@/components/home/feature-left';
import FeatureRight from '@/components/home/feature-right';
import Mission from '@/components/home/mission';
import DentistCta from '@/components/home/dentist-cta';
import Footer from '@/components/home/footer';
import PracticeCta from '@/components/home/practice-cta';

export default function Home() {
	return (
		<>
			<Hero />
			<FeatureRight />
			<FeatureLeft />
			<DentistCta />
			<Mission />
			<PracticeCta />
			<Footer />
		</>
	);
}
