import { useState } from 'react'
import './App.css'
import { usePosts } from "./PostsContext";

function App() {
    const {posts, loading, setPosts} = usePosts();
     const [page, setPage] = useState(1);
    const perPage = 6;
    const totalPages = Math.ceil(posts.length / perPage);
    const startIndex = (page - 1 ) * perPage;
    const visiblePosts = posts.slice(startIndex, startIndex + perPage);

    const handleDelete = (id) => {
        setPosts(posts.filter((p)=> p.id !== id));
    }

    if(loading){
        return(
          <h1 className='loading'>loading...</h1>
        );
    }


  return (
    <>
        <div className='container'>
            <div className='cards'>
                {visiblePosts.map((post) => (
                    <div className='card' key={post.id}>
                        <button className='close-btn' onClick={()=> handleDelete(post.id)}>X</button>
                        <h3 className='title'>{post.title}</h3>
                        <p className='desc'>{post.body}</p>
                        <small className='date'>MOn, 21 Dec 2020 14:57 GMT</small>
                        <img src="https://placehold.co/400" alt="post" className='card-image'/>
                    </div>
                ))}
            </div>
                <div className='pages'>
                    <button onClick={()=> setPage(page - 1)} disabled={page===1}>Prev</button>
                    {Array.from({
                        length: totalPages
                    }).map((_,index) => (
                        <button
                        key={index}
                        className={page === index + 1 ? "active" : ""}
                        onClick={()=>setPage(index + 1)}> {index + 1} </button>
                    ))}
                    <button onClick={()=> setPage(page + 1)} disabled={page === totalPages}>Next</button>
                </div>

        </div>
    </>
  )
}

export default App
