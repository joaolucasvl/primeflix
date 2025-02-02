import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css';


function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() =>{

        async function loadFilme() {
     
              const response = await api.get("movie/now_playing", {
                params: {
                  api_key: "6449204aa438db7b78670a761223792d", // Sua chave de API do TMDb
                  language: "pt-BR", // Idioma desejado
                  page: 1, // Página de resultados
                },
              });
              setFilmes(response.data.results.slice(0, 10))
              setLoading(false)
          }
          
          loadFilme(); // Chama a função para executar a requisição
        
    },  []);

    if (loading) {
        return(
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;