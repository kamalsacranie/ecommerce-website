// Descructured import importing our bootstrap components
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Impoerting our header component
import Header from './components/Header';
import Footer from './components/Footer';
// Importing our screen
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
        {/* Adding :id here in the path makes it dynamic. not sure how this bit works */}
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  ); // Notice how we use the Header import like a tag here
}

export default App;
