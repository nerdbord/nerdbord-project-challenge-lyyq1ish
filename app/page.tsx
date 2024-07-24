import { getUsers } from './actions/userActions'
import CreateUserForm from './components/CreateUserForm/CreateUserForm'

export default async function Home() {
  const users = await getUsers()

  return (
    <main>
      <h1>User Management</h1>
      <CreateUserForm />
      <h2>Existing Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </main>
  )
}
