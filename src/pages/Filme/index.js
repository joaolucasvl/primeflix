import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css'
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() { 
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "6449204aa438db7b78670a761223792d", // Sua chave de API do TMDb
                    language: "pt-BR", // Idioma desejado
                  }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() =>{
                console.log("Filme não encontrado.");
                navigate("/", { replace: true })
                return;
            })
        }

        loadFilme();


        return() => {
            console.log("Componente foi desmontado");
        }
    }, [navigate, id])



    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme) {
            toast.warn("Este filme já esta na sua lista.")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }




    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando Detalhes...</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt = {filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>


            <div className="area-button">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                    </button>
            </div>
        </div>
    )
}

export default Filme;