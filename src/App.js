import './App.css';
import BlogContainer from './components/BlogContainer';
import FullBlog from './components/FullBlog';
import CreateNewBlog from "./components/CreateNewBlog";
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogContainer />} exact />
        <Route path="/blog/:id" element={<FullBlog />} />
        <Route path="/write-new-blog" element={<CreateNewBlog />} />
      </Routes>
    </div>
  );
}

export default App;
