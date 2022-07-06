import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'

export default function BlogContainer() {

  const [allBlogs,setAllBlogs] = useState([]);

  useEffect(()=>{

    async function fetchBlogs(){
      await fetch("https://mern-blog-webapp.herokuapp.com/blogs")
      .then((res) => res.json())
      .then(data=>{setAllBlogs(data)
      console.log(data)});
    }

    fetchBlogs();
  },[])


  return (
    (!allBlogs.length)?(<span>Loading...</span>):(
    <div style={{width:600,margin:"20px auto"}}>
        {
          allBlogs.map((el,index)=>(
            <BlogCard el={el} />
          ))
        }
    </div>
    )
  )
}
