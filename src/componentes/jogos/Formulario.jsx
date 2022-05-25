import { useContext } from "react";
import Alerta from "../Alerta";
import JogosContext from "./JogosContext";

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaEmpresas } = useContext(JogosContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edição de Jogos</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtID" className="form-label">
                                    ID
                                </label>
                                <input type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtID"
                                    name="id"
                                    value={objeto.id}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtDescricao" className="form-label">
                                    Descrição
                                </label>
                                <input type="text"
                                    className="form-control"
                                    id="txtDescricao"
                                    name="descricao"
                                    value={objeto.descricao}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtGenero" className="form-label">
                                    Genero
                                </label>
                                <input type="text"
                                    className="form-control"
                                    id="txtGenero"
                                    name="genero"
                                    value={objeto.genero}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtAno" className="form-label">
                                    Ano
                                </label>
                                <input type="number"
                                    className="form-control"
                                    id="txtAno"
                                    name="ano"
                                    value={objeto.ano}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtJogadores" className="form-label">
                                    Jogadores
                                </label>
                                <input type="number"
                                    className="form-control"
                                    id="txtJogadores"
                                    name="jogadores"
                                    value={objeto.jogadores}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectEmpresa" className="form-label">
                                    Empresa
                                </label>
                                <select required
                                    className="form-control"
                                    id="selectEmpresa"
                                    value={objeto.empresa}
                                    name="empresa"
                                    onChange={handleChange}>
                                    <option disabled="true" value="">(Selecione a empresa)</option>
                                    {
                                        listaEmpresas.map((empresa) => (
                                            <option key={empresa.id} value={empresa.id}>
                                                {empresa.nome}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success">Salvar
                                <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario;