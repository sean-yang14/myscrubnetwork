export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': 
      res.status(200).json(await getListings)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    // case 'POST':
      // const {title, name, website, address, city, state, zip, salary, interval, schedule, phone, email, description} = req.body

      // const listing = {...req.body}
      // const docRef = await firestoreOrigin.collection('listings').add(listing)
      // res.status(201).end()
  }
}
