import { useRouter } from 'next/navigation';
import useAuth from '../../context';

export default function Header() {
  const router = useRouter();
  const { logout } = useAuth();
  
  function handleLogout(e: React.SyntheticEvent) {
    e.preventDefault();

    router.push('/');
    logout()
  }

  return (
    <header>
      <button>ADD NEW TASK</button>
      <div>TASK LIST</div>
      <button onClick={handleLogout}>LOGOUT</button>
    </header>
  );
}
