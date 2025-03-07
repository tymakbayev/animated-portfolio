import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimationProvider } from './contexts/AnimationContext';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <div className="app">
          <Header />
          <MainContent />
          <Footer />
        </div>
      </AnimationProvider>
    </ThemeProvider>
  );
};

export default App;