import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuth from '../../context';
import CustomAlert, { defaultAlert } from '../CustomAlert';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { loadTasksError } = useAuth();
  const router = useRouter();
  const [alertComponent, setAlertComponent] = useState<CustomAlertProps>(defaultAlert);

  useEffect(() => {    
    const storedToken = localStorage.getItem('jwtToken');
    
    if (loadTasksError || !storedToken){
      setAlertComponent((prev: CustomAlertProps) => ({
        ...prev,
        open: true,
        title: 'You are not logged in or your permission has expired',
        message: 'You will be redirect, please login again',
        type: 'error',
      }));

      setTimeout(() => {
        router.push('/');
      }, 1500);
      return;

    }
  }, [loadTasksError]);

  if (alertComponent.open) {
    return <CustomAlert
      message={alertComponent.message}
      type={alertComponent.type}
      setAlertComponent={setAlertComponent}
      open={alertComponent.open}
      title={alertComponent.title}
    />
  }

  return <>{children}</>;
}
