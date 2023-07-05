import { APP_ROUTES } from "@/constants/routes";

export const checkIsPublicRoute = (path: string) => {
    const publicRoutes = Object.values(APP_ROUTES.public)

    return publicRoutes.includes(path)
}