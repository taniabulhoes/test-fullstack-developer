import { IUserSliceinitialState } from "@/interfaces/IUser";

export const checkIsAuthenticated = () => {
    const storageItem = window.localStorage.getItem('@TBTD:LoginData');
    const item: IUserSliceinitialState = storageItem ? JSON.parse(storageItem) : null
    if (item) {
        return item.userToken
    } else {
        return ""
    }
}