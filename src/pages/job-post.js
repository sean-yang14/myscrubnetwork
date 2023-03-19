import { useState } from 'react';
import Listing from '@/components/practices/job-post';
import MainCard from '@/components/layout/main-card'
import MainLayout from '@/components/layout/main-layout'

const formEntries = [
	{
		label: 'Position Title',
		type: 'text',
		name: 'title',
		id: 'title',
		placeholder: 'Associate General Dentist',
		aria: 'position title',
	},
	{
		label: 'Practice Website',
		type: 'text',
		name: 'website',
		id: 'website',
		placeholder: 'https://website.com',
		aria: 'practice website',
	},
	{
		label: 'Address',
		type: 'text',
		name: 'address',
		id: 'address',
		placeholder: '1111 Grand Street',
		aria: 'practice address',
	},
	{
		label: 'City',
		type: 'text',
		name: 'city',
		id: 'city',
		placeholder: 'Brooklyn',
		aria: 'practice city',
	},
	{
		label: 'State',
		type: 'text',
		name: 'state',
		id: 'state',
		placeholder: 'NY',
		aria: 'practice state',
	},
	{
		label: 'Zip Code',
		type: 'text',
		name: 'zip',
		id: 'zip',
		placeholder: '11201',
		aria: 'practice zip code',
	},
	{
		label: 'Salary Range',
		type: 'text',
		name: 'salary',
		id: 'salary',
		placeholder: '$150,000',
		aria: 'salary range',
	},
	{
		label: 'Salary Interval',
		type: 'text',
		name: 'interval',
		id: 'interval',
		placeholder: 'day / hour / year',
	},
	{
		label: 'Schedule',
		type: 'text',
		name: 'schedule',
		id: 'schedule',
		placeholder: 'Full Time / Part Time / Contract',
		aria: 'dentist schedule',
	},
	{
		label: 'Practice Type',
		type: 'text',
		name: 'category',
		id: 'category',
		placeholder: 'Private / Group / DSO',
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function JobPost({ startObj, children, id }) {
	const [selected, setSelected] = useState({
		...startObj,
	});

	return (
		<MainCard>
			<Listing formEntries={formEntries} />
		</MainCard>
	);
}

JobPost.getLayout = function getLayout(page) {
  return (
    <>
      <MainLayout >
        {page}
      </MainLayout>
    </>
  )
}
