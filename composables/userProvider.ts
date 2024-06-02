export function userProvider() {
    interface User {
        username: string,
        first_name: string,
        last_name: string,
        token: string
    }
    const userCookie = useCookie<User | undefined>(
        'user',
        {
            watch: "shallow",
            default: undefined,
            maxAge: 2592000
        }
    )

    const getUser = computed(() => ({
        user: userCookie.value
    }))

    const setUser = (user: {username: string, first_name: string, last_name: string, token: string}) => {
        userCookie.value = {
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            token: user.token
        }
    }

    const delUser = () => {
        userCookie.value = undefined
        window.location.reload()
    }

    return {
        userCookie,
        getUser,
        setUser,
        delUser
    }
}