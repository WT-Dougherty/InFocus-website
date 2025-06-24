import { HashRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import { Layout } from './components/layout.jsx';
import { About } from './pages/about.jsx';
import { Projects } from './pages/projects.jsx';
import { WriteUps } from './pages/writeups.jsx';
import { MD_Viewer } from './pages/md_viewer.jsx';

// Route wrapper to pass URL param to MdViewer
function MdRouteWrapper() {
  const { filename } = useParams();
  return <MD_Viewer filename={filename} />;
  
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={ <Layout/> }>
          <Route path='/projects' element={ <Projects/> } />
          <Route path='/' element={ <About/> }/>
          <Route path='/writeups' element={ <WriteUps/> }/>
        </Route>
        <Route path="/viewer/:filename" element={<MdRouteWrapper />} />
      </Routes>
    </Router>
  );
}

export default App