import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useAuth from '../../context';
import CreateNewTaskModal from '../CreateNewTaskModal';

export default function TaskListHeader({
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
      <header className='taskList__header'>
        <button onClick={() => setNewTaskModalOpen(true)}>
          <Image
            src="/icons/AddNewTaskIcon.svg"
            alt="Delete Task Button"
            width={24}
            height={24}
          />
        </button>
        <h1 className="formulary__container_title">TASK LIST</h1>
        <button  onClick={handleLogout}>
          <Image
            src="/icons/LogoutIcon.svg"
            alt="Delete Task Button"
            width={24}
            height={24}
          />
        </button>
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
