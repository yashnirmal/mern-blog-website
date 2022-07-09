import React from 'react';
import "./FilterComp.css"

export default function FilterComp() {
  return (
    <div className="filter-comp">
      <p className="filter-title">Filters</p>
      <input type="text" placeholder="Enter tags here" />
      <p className="filter-info">Separate the tags with commas(,)</p>
      <button>Apply</button>
    </div>
  );
}
