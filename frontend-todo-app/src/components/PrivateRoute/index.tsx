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

      const redirectToLogin = () => {
        router.push('/');
      };

      const redirectTimer = setTimeout(redirectToLogin, 1000);

      return () => clearTimeout(redirectTimer);
    }
    setNotAuthorized(false)
  }, [user, router]);

  if (notAuthorized) {
    return <NotAuthorizedAlert />;
  }

  return <>{children}</>;
}
