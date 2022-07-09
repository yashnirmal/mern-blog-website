import BlogContainer from './components/BlogContainer';
import FullBlog from './components/FullBlog';
import CreateNewBlog from "./components/CreateNewBlog";
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Signin from './components/Signin';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogContainer />} />
        <Route path="/blog/:id" element={<FullBlog />} />
        <Route path="/write-new-blog" element={<CreateNewBlog />} />
        <Route path='account/login' element={<Login />}/>
        <Route path='account/signin' element={<Signin />}/>
      </Routes>
    </div>
  );
}

export default App;
