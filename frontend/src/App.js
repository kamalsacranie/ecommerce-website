// Descructured import importing our bootstrap components
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Impoerting our header component
import Header from './components/Header';
import Footer from './components/Footer';
// Importing our screen
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>

          {/* Was confused about how we could just pass ?=redirect/ in the url but it's because anything after the
          questionmark is considered a url parameter and doesnt impact the rout*/}

          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          {/* Adding :id here in the path makes it dynamic. not sure how this bit works */}
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />  {/* Putting questionmark after id makes it optional meaning we can just go to /cart */}

          <Route path='/admin/userlist' component={UserListScreen} />  {/* Putting questionmark after id makes it optional meaning we can just go to /cart */}
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />  {/* Putting questionmark after id makes it optional meaning we can just go to /cart */}

          <Route path='/admin/productlist' component={ProductListScreen} />  {/* Putting questionmark after id makes it optional meaning we can just go to /cart */}
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />  {/* Putting questionmark after id makes it optional meaning we can just go to /cart */}
          <Route path='/admin/orderlist' component={OrderListScreen} />  {/* Putting questionmark after id makes it optional meaning we can just go to /cart */}
        </Container>
      </main>
      <Footer />
    </Router>
  ); // Notice how we use the Header import like a tag here
}

export default App;
