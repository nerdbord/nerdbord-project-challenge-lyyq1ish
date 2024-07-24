import { getUsers } from './actions/userActions'
import CreateUserForm from './components/CreateUserForm/CreateUserForm'

export default async function Home() {
  const users = await getUsers()

  return (
    <main className="main">
      <h2>istniejący userzy:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
      <CreateUserForm />
    </main>
  )
}
