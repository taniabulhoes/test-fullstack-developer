import { useRouter } from 'next/navigation';
import useAuth from '../../context';
import CreateNewTaskModal from '../CreateNewTaskModal';

export default function Header({
  userId,
  newTaskModalOpen,
  setNewTaskModalOpen,
  token

} : HeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();
  
  function handleLogout(e: React.SyntheticEvent) {
    e.preventDefault();

    router.push('/');
    logout()
  }



  return (
    <>
      <header>
        <button onClick={() => setNewTaskModalOpen(true)}>ADD NEW TASK</button>
        <div>TASK LIST</div>
        <button onClick={handleLogout}>LOGOUT</button>
      </header>
      <CreateNewTaskModal 
        userId={userId}
        newTaskModalOpen={newTaskModalOpen}
        setNewTaskModalOpen={setNewTaskModalOpen}
        token={token}
      />
    </>
  );
}
