import CreateUserForm from './components/CreateUserForm/Scanner'
import ReceiptList from './components/ReceiptList/ReceiptList'

export default async function Home() {
  return (
    <main className="main">
      <CreateUserForm />
      <ReceiptList />
    </main>
  )
}
