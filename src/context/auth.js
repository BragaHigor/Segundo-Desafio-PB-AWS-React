import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
     
    const [user, setUser] = useState()

    useEffect(() => {
        
        const userToken = localStorage.getItem('user_token')
        const usersStorage = localStorage.getItem('users_db')

        if(userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            )

            if (hasUser) setUser(hasUser[0])
        }

    }, [])

    const login = (email, password) => {

        const usersStorage = JSON.parse(localStorage.getItem('users_db'))

        const hasUser = usersStorage?.filter((user) => user.email === email)

        if(hasUser?.length) {
            if(hasUser[0].email === email && hasUser[0].password === password){
                
                const token = Math.random().toString(36).substring(2)

                const city = hasUser[0].city
                const country = hasUser[0].country


                localStorage.setItem('user_token', JSON.stringify({email, token, country, city}))
                setUser({email, password})

                return

            } else {
                return 'Wow, invalid username or password. Please, try again!'
            } 

        } else {
            return 'Wow, invalid username or password. Please, try again!'
        }
    }

    const register = (email, password, country, city) => {

        const usersStorage = JSON.parse(localStorage.getItem('users_db'))

        const hasUser = usersStorage?.filter((user) => user.email === email)

        if (hasUser?.length) {
            return 'E-mail already registered'
        }

        let newUser

        if(usersStorage) {

            newUser = [...usersStorage, {email, password, country, city}]

        } else {
            
            newUser = [{email, password, country, city}]
            
        }

        localStorage.setItem('users_db', JSON.stringify(newUser))

        return 

    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user_token')
    }

    return (
        <AuthContext.Provider
            value={{user, enter: !!user, login, register, logout}}
        >
            {children}
        </AuthContext.Provider>
    )
}