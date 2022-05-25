import { useState, useEffect } from 'react';
import Tabela from './Tabela';
import Formulario from './Formulario';
import EmpresasContext from './EmpresasContext';
import withAuth from '../withAuth';


function Empresas() {

    const [listaObjetos, setListaObjetos] = useState(
        localStorage.getItem('JOGOSPWA/listaempresas')
            ? JSON.parse(localStorage.getItem('JOGOSPWA/listaempresas')) : []
    );

    const [listaJogos, setListaJogos] = useState(
        localStorage.getItem('JOGOSPWA/listajogos')
            ? JSON.parse(localStorage.getItem('JOGOSPWA/listajogos')) : []
    );

    const [alerta, setAlerta] = useState({ status: "", message: "" });

    const [objeto, setObjeto] = useState({ id: "", nome: "", regiao: "", descricao: "" });

    const [editar, setEditar] = useState(false);

    const acaoCadastrar = e => {
        e.preventDefault();
        if (editar) {
            const index = listaObjetos.findIndex(p => p.id === objeto.id);
            const listaObjetosTemp = listaObjetos.splice(0, index).concat(
                listaObjetos.splice(index + 1));
            const newListaObjetos = [...listaObjetosTemp, objeto].sort((a, b) => a.id - b.id);
            setListaObjetos(newListaObjetos);
            setAlerta({ status: "success", message: "Empresa editada com sucesso!" });
        } else {
            if (objeto.id === 0) {
                var idatual = localStorage.getItem('JOGOSPWA/idempresa');
                if (idatual === null) {
                    idatual = 0;
                }
                var novoId = Number(idatual) + 1;
                objeto.id = novoId;
                localStorage.setItem('JOGOSPWA/idempresa', novoId);
                setListaObjetos([...listaObjetos, objeto]);
                setAlerta({ status: "success", message: "Empresa adicionada com sucesso!" });
            }
        }
    };

    useEffect(() => {
        localStorage.setItem('JOGOSPWA/listaempresas', JSON.stringify(listaObjetos));
    }, [listaObjetos]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }


    const acaoRemover = objeto => {
        if (window.confirm("Remover esta Empresa?")) {
            const listaJogoDaEmpresa = listaJogos.filter(s => Number(s.empresa) === Number(objeto.id));            
            if (listaJogoDaEmpresa.length > 0) {
                setAlerta({ status: "error", message: "A Empresa possui jogos relacionados!" });
            } else {
                const listaObjetosTemp = listaObjetos.filter(p => p.id !== objeto.id);
                setListaObjetos(listaObjetosTemp);
                setAlerta({ status: "success", message: "Empresa removida com sucesso!" });
            }
        }
    }

    return  (
        <EmpresasContext.Provider value={
            {
                listaObjetos, setListaObjetos, acaoRemover,
                alerta, setAlerta,
                objeto, setObjeto,
                editar, setEditar,
                acaoCadastrar, handleChange
            }}>
            <Tabela />
            <Formulario />
        </EmpresasContext.Provider>
    );
}

export default withAuth(Empresas);