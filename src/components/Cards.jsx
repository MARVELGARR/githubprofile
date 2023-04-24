import React, {useEffect, useState} from 'react'
import axios from 'axios'
function Cards() {
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const [followers, setFollowers] = useState([])


    const handleInputChange = (e) => {
        const query = e.target.value;
        setQuery(query);
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(query.length > 0){
          fetch(`https://api.github.com/search/users?q=${query}`)
            .then((response) => response.json())
            .then((data) => setUsers(data.items))

        } else {
          setUsers([]);
          setFollowers([]);
        }
    }


  return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                <div className="px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Search for a User</h2>
                <form onSubmit={handleSubmit} className="flex items-center">
                    <input className="appearance-none bg-gray-100 border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Enter a username" value={query} onChange={handleInputChange} />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded" type="submit">Search</button>
                </form>
                </div>
                <div className="px-6 py-4">
                <ul>
                    {users.map((user) => {
                    return (
                        <li className="flex items-center mb-4" key={user.id}>
                            <div className="flex-shrink-0">
                                <img className="h-12 w-12 rounded-full" src={user.avatar_url} alt={user.login} />
                            </div>
                            <div className="">
                                <div className="ml-3">
                                    <a href={user.html_url} className="text-gray-800 font-semibold hover:text-blue-500">{user.login}</a>
                                </div>
                            </div>
                        </li>
                    );
                    })}
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards