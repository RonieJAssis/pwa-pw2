import { useState } from 'react';

const Home = () => {

    const [listaEmpresas, setListaEmpresas] = useState(
        localStorage.getItem('JOGOSPWA/listaempresas')
            ? JSON.parse(localStorage.getItem('JOGOSPWA/listaempresas')) : []
    );

    const [listaJogos, setListaJogos] = useState(
        localStorage.getItem('JOGOSPWA/listajogos')
            ? JSON.parse(localStorage.getItem('JOGOSPWA/listajogos')) : []
    );

    const [jogosDaEmpresa, setJogosDaEmpresa] = useState([]);

    const jogoDaEmpresa = id => {
        setJogosDaEmpresa([]);
        const listaJogoDaEmpresa = listaJogos.filter(s => Number(s.empresa) === Number(id));
        setJogosDaEmpresa(listaJogoDaEmpresa);
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Jogos e Empresas - PWA</h1>
            <div className="modal fade" id="modalJogos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Jogos da Empresa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div claclassNamess="modal-body">
                        {jogosDaEmpresa.length === 0 && <h2>Nenhum registro encontrado</h2>}
                        {jogosDaEmpresa.length > 0 && (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Descrição</th>
                                            <th scope="col">Genero</th>
                                            <th scope="col">Ano</th>
                                            <th scope="col">Jogadores</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jogosDaEmpresa.map(objeto => (
                                                <tr key={objeto.id}>
                                                <td>{objeto.nome}</td>
                                                <td>{objeto.descricao}</td>
                                                <td>{objeto.genero}</td>
                                                <td>{objeto.ano}</td>
                                                <td>{objeto.jogadores}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sair</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {listaEmpresas.map(objeto => (
                        <div key={objeto.id} className={`card col-6`} >
                            <h5 className="card-header">{objeto.nome}</h5>
                            <div className="card-body">
                                <h5 className="card-title">{objeto.regiao}</h5>
                                <p className="card-text">{objeto.descricao}</p>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalJogos"
                                    onClick={() => jogoDaEmpresa(objeto.id)}>
                                    Jogos
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
};

export default Home;