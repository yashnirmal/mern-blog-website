import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';
import FilterComp from './FilterComp';
import CircularProgress from "@material-ui/core/CircularProgress";
import baseApiUrl from './baseApiUrl';


export default function BlogContainer() {

  const [allBlogs,setAllBlogs] = useState([]);

  useEffect(()=>{

    async function fetchBlogs(){
      await fetch(`${baseApiUrl}/blogs`)
        .then((res) => res.json())
        .then((data) => {
          setAllBlogs(data);
          console.log(data);
        });
    }

    fetchBlogs();
  },[])

  // function filterBlogsUsingTags(arr){
  //   let filteredBlogs = []
  //   console.log(arr)

  //   if(arr.length===0 || arr[0]=='')
  //   return allBlogs

  //   allBlogs.forEach((blog)=>{
  //     blog.tags.forEach((tag)=>{
  //       console.log(tag)
  //       if(arr.includes(tag))
  //         filteredBlogs.push(blog)
  //         console.log(filteredBlogs)
  //     })
  //   })
  //   return filteredBlogs;
  // }


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
      {/* <FilterComp filterBlogsUsingTags={filterBlogsUsingTags} /> */}

      </div>
    </>
  )
}
