import { withProtected } from "../login/route";

function Admin() {
  const {logout} = auth
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default withProtected(Admin)