import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from '../../context';
import NotAuthorizedAlert from '../NotAuthorizedAlert';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const redirectToLogin = () => {
        router.push('/');
      };

      const redirectTimer = setTimeout(redirectToLogin, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [user, router]);

  if (!user) {
    return <NotAuthorizedAlert />;
  }

  return <>{children}</>;
}
