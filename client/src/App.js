import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Payroll from './pages/Payroll';
import Resume from './pages/Resume';
import Home from './pages/Home';
import Analysis from './components/Wagescraper';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="">
      <Router>
        <Nav></Nav>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Payroll Converter" component={Payroll} />
            <Route exact path="/Resume Builder" component={Resume} />
            <Route exact path="/Wage Analysis" component={Analysis} />
            <Route exact path="/Home" component={Home} />
             
            <Route component={Home} />
          </Switch>
        </main>
        <div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;