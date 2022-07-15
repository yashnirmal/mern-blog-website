import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';
import FilterComp from './FilterComp';
import CircularProgress from "@material-ui/core/CircularProgress";

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
    <>
      <div style={{width:600,margin:"20px auto"}}>
      {
        (!allBlogs.length)?(
        <div style={{marginTop:200,textAlign:"center"}}>
          <CircularProgress />
        </div>
        ):(
          allBlogs.map((el,index)=>(
            <BlogCard el={el} />
          ))
        )
      }

      <FilterComp />

      </div>
    </>
  )
}
