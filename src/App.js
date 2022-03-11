import CollectionsPage from './components/pages/CollectionsPage';
import MintPage from './components/pages/MintPage';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    // <Router>
      <div className="App">
        
        <MintPage />
        <CollectionsPage />
      </div>
    // </Router>
  );
}

export default App;
