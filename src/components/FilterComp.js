import React,{useState} from 'react';
import "./FilterComp.css"

export default function FilterComp(props) {

  const [filterString,setFilterString] = useState("");

  // function filterStringChanged(str){
  //   props.filterBlogsUsingTags(str.split(','));
  // }

  return (
    <div className="filter-comp">
      <p className="filter-title">Filters</p>
      <input
        type="text"
        placeholder="Enter tags here"
        value={filterString}
        onChange={
          (e) => {
            setFilterString(e.target.value);
            // filterStringChanged(e.target.value);
          }}
      />
      <p className="filter-info">Separate the tags with commas(,)</p>
      <button>Apply</button>
    </div>
  );
}
