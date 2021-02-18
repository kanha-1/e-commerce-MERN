import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css"
import Navbar from './Components/Navbar'
import Loginpage from './pages/Loginpage'
import Productpage from "./pages/Productpage";
import Registerpage from "./pages/Registerpage";
import Welcomepage from "./pages/Welcomepage";
import Cartpage from './pages/Cartpage'
import Checkoutpage from "./pages/Checkoutpage";
import Orderpage from './pages/Orderpage'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="row flex-center" style={{marginTop:"70px",width:"100%"}}>
      <Switch>
        <Route exact path="/login" component={Loginpage}/>
        <Route exact path="/register" component={Registerpage}/>
        <Route exact path="/home" component={Productpage}/>
        <Route exact path="/" component={Welcomepage}/>
        <Route exact path="/cart" component={Cartpage}/>
        <Route exact path="/checkout" component={Checkoutpage}/>
        <Route exact path="/order" component={Orderpage}/>
        <Redirect to="/"/>
      </Switch>
      
      </div>
     </div>
  );
}

export default App;
