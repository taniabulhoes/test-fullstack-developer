'use client'
import { checkIsPublicRoute } from '@/helpers/checkIsPublic';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react'
import { PrivateRoute } from '../privateRoute/PrivateRoute';
import { checkIsAuthenticated } from '@/helpers/checkUserIsAuthenticated';
import { setUserToken } from '@/redux/features/tasks/task';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { APP_ROUTES } from '@/constants/routes';

type RouteHandlerProps = {
    children: ReactNode
}

const RouteHandler = ({ children }: RouteHandlerProps) => {
    const path = usePathname();
    const { push } = useRouter()
    const dispatch = useDispatch<AppDispatch>()


    const isPublic = checkIsPublicRoute(path)

    useEffect(()=> {
    const isAuthenticated = checkIsAuthenticated()
    if(isAuthenticated){
        dispatch(setUserToken(isAuthenticated))
        return push(APP_ROUTES.private.home.path)
    }
    
    },[])

    return(
        <>
            {isPublic && children}
            {!isPublic &&  
                <PrivateRoute>
                    {children}
                </PrivateRoute>
            }
        </>

    )
}

export { RouteHandler }
