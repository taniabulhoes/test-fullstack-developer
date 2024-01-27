import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuth from '../../context';
import NotAuthorizedAlert from '../NotAuthorizedAlert';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [notAuthorized, setNotAuthorized] = useState<boolean>(false)

  useEffect(() => {
    if (!user) {
      setNotAuthorized(true);

      setTimeout(() => {
        router.push('/');
      }, 1000);

    }
    setNotAuthorized(false)
  }, [user, router]);

  if (notAuthorized) {
    return <NotAuthorizedAlert />;
  }

  return <>{children}</>;
}
