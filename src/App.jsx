import { ThemeProvider } from './contexts/ThemeContext';
import { AnimationProvider } from './contexts/AnimationContext';
import Header from './components/Header/Header';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <div className="app">
          <Header />
          <main>
            <ContactForm />
          </main>
          <Footer />
        </div>
      </AnimationProvider>
    </ThemeProvider>
  );
};

export default App;