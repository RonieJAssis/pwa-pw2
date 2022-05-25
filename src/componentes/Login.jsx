import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "./Alerta";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const isAuth = !!localStorage.getItem("usuario");

    const doLogin = (usuario,senha) => {
        if(!usuario || !senha){
            setAlerta({ status: "error", message: "Todos os campos devem ser preenchidos" });
            return false;
        }
        if(usuario === 'Teste' && senha === '123456'){
            localStorage.setItem("usuario", usuario);
            return true;
        }else{
            setAlerta({ status: "error", message: "Usuario e/ou senha invalidos" });
            return false;
        }
    }

    return (
        <div>
            <Alerta alerta={alerta}/>
            {!isAuth ? (
                <div>
                    <h2>Usuário não identificado</h2>
                    <div style={{ maxWidth: 300 }}>
                        <input type="text" className="form-control" placeholder="usuario" onChange={e => setUsuario(e.target.value)} value={usuario} />
                        <input type="password" className="form-control" placeholder="senha" onChange={e => setSenha(e.target.value)} value={senha} />
                        <button type="button" className="btn btn-primary" onClick={
                            () => { 
                                if(doLogin(usuario,senha))
                                navigate('/');
                            }
                        }>Login</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>{localStorage.getItem("usuario")}</h2>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={
                            () => { 
                                localStorage.removeItem("usuario");
                                navigate('/');
                            }
                        }>Logout</button>                    
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;