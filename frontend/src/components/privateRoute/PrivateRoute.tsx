'use client'
import { APP_ROUTES } from '@/constants/routes'
import { checkIsAuthenticated } from '@/helpers/checkUserIsAuthenticated'
import { setUserToken } from '@/redux/features/tasks/task'
import { AppDispatch, RootState } from '@/redux/store/store'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type PrivateRouteProps = {
    children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { push } = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const task = useSelector((state: RootState) => state.task)

    useEffect(()=> {
        const isAuthenticated = checkIsAuthenticated()
        if(!isAuthenticated){
          return push(APP_ROUTES.public.login)
        }
    
        dispatch(setUserToken(isAuthenticated))
    },[])


    return (
        
        <>
            {!task.userToken && null}
            {task.userToken && children}
        </>
    )
}

export { PrivateRoute }