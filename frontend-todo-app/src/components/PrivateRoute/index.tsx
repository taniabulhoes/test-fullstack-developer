import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuth from '../../context';
import NotAuthorizedAlert from '../NotAuthorizedAlert';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { loadTasksError } = useAuth();
  const router = useRouter();
  const [notAuthorized, setNotAuthorized] = useState<boolean>(false)

  useEffect(() => {    
    // if (!loadTasksError) return; 
    const storedToken = localStorage.getItem('jwtToken');
    console.log("storedToken", storedToken)
    
    if (loadTasksError || !storedToken){
      setNotAuthorized(true);

      setTimeout(() => {
        router.push('/');
      }, 1500);
      return;

    }
    setNotAuthorized(false)
  }, [loadTasksError]);

  if (notAuthorized) {
    return <NotAuthorizedAlert />;
  }

  return <>{children}</>;
}
