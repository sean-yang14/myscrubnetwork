// Imports the Google Cloud client library

const {AccessApprovalClient} = require('@google-cloud/access-approval');

// TODO(developer): replace with your prefered project ID.
// const projectId = 'my-project'

// Creates a client
const client = new AccessApprovalClient();

async function listRequests() {
  const requests = await client.listApprovalRequests({
    parent: `projects/${projectId}`,
  });
  console.info(requests);
}
listRequests();
