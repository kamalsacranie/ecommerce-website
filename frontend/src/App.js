// Descructured import importing our bootstrap components
import { Container } from 'react-bootstrap'

// Impoerting our header component
import Header from './components/Header';
import Footer from './components/Footer';
// Importing our screen
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </div>
  ); // Notice how we use the Header import like a tag here
}

export default App;
