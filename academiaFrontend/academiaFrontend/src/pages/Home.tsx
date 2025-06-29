import React from 'react';
import '../css/Home.css';

const Home = () => {
  return (
    <main className="home-container">
      <section className="hero">
        <h2>Seu treino, sua evolução</h2>
        <p>Com o AcademiaApp, acompanhe seus treinos, evolua com inteligência e alcance seus objetivos.</p>
        <a href="/downloads" className="btn-primary">Baixe agora</a>
      </section>
    </main>
  );
};

export default Home;