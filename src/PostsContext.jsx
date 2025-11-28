
import {useContext, createContext, useState, useEffect } from 'react'
const PostsContext = createContext();
export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({children})=> {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then(data=>{
        setPosts(data.slice(0,30));
        setTimeout(() => {
            setLoading(false)
        }, 5000);
      })
    }, [])


  return (
    <PostsContext.Provider value={{posts, setPosts, loading, setLoading}}>
        {children}
    </PostsContext.Provider>
  )
}
