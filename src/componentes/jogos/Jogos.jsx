import { useState, useEffect } from 'react';
import Tabela from './Tabela';
import Formulario from './Formulario';
import JogosContext from './JogosContext';
import withAuth from '../withAuth';

function Jogos() {

    const [listaObjetos, setListaObjetos] = useState(
        localStorage.getItem('JOGOSPWA/listajogos') 
        ? JSON.parse(localStorage.getItem('JOGOSPWA/listajogos')) : []
    ); 

    const [listaEmpresas, setListaEmpresas] = useState(
        localStorage.getItem('JOGOSPWA/listaempresas') 
        ? JSON.parse(localStorage.getItem('JOGOSPWA/listaempresas')) : []
    );     
    
    const [alerta, setAlerta] = useState( {status : "" , message : ""});

    const [objeto, setObjeto] = useState({id: "", nome: "", descricao: "", genero: "", 
    ano: "", jogadores: "", empresa: "" });

    const [editar, setEditar] = useState(false);

    const acaoCadastrar = e => {
        console.log("ação cadastrar");
        e.preventDefault();
        if (editar){
            const index = listaObjetos.findIndex(p => p.id === objeto.id);
            const listaObjetosTemp = listaObjetos.splice(0,index).concat(
                listaObjetos.splice(index+1));
            const newListaObjetos = [...listaObjetosTemp, objeto].sort( (a,b) => a.id - b.id);
            setListaObjetos(newListaObjetos);
            setAlerta({status:"success", message: "Jogo editado com sucesso!"});
        } else {
            if (objeto.id === 0){
                var idatual = localStorage.getItem('JOGOSPWA/idjogo');
                if (idatual === null){
                    idatual = 0;
                }                
                var novoId = Number(idatual) + 1;
                objeto.id = novoId;
                localStorage.setItem('JOGOSPWA/idjogo', novoId);
                setListaObjetos([...listaObjetos,objeto]);
                setAlerta({status:"success", message: "Jogo adicionado com sucesso!"});
            }
        }
    };

    useEffect( () => {
        localStorage.setItem('JOGOSPWA/listajogos', JSON.stringify(listaObjetos));
    }, [listaObjetos]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name]:value});
    }


    const acaoRemover = objeto => {
        if (window.confirm("Remover este jogo?")) {
            const listaObjetosTemp = listaObjetos.filter(p => p.id !== objeto.id);
            setListaObjetos(listaObjetosTemp);      
            setAlerta({status:"success", message: "Jogo removido com sucesso!"})  ;               
        }
    }    

    return (
        <JogosContext.Provider value={
            {
                listaObjetos, setListaObjetos, acaoRemover, 
                alerta, setAlerta, 
                objeto, setObjeto, 
                editar, setEditar, 
                acaoCadastrar, handleChange, listaEmpresas
            } }>
            <Tabela />
            <Formulario/>
        </JogosContext.Provider>
    );
}

export default withAuth(Jogos);