import Search from "../componentes/Search";
import { useState } from "react";
import { UserProps } from "../types/user";
import User from "../componentes/User";
import Error from "../componentes/Error";

const Home = () => {

    const [use, setUser] = useState<UserProps | null>(null)
    const [error, setError] = useState(false)


    const loadUser = async (userName: string) => {

        setError(false)
        setUser(null)

        const res = await fetch(`https://api.github.com/users/${userName}`);

        const data = await res.json();

        if(res.status === 404){
            setError(true)
            return
        }

        const { avatar_url, login, location, followers, following } = data

        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following
        };

        setUser(userData)
    }

    return (
        <div>
            <Search loadUser={loadUser} />
            {use && <User {...use} />}
            {error && <Error/>}
        </div>
    )
}

export default Home