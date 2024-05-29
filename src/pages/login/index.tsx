import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useState } from "react";

import {auth} from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login(){
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        if(email.trim() === '' || password.trim() === ''){
            return alert('Preencha todos os campos')
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/admin", {replace: true})  
        })
        .catch((error) => {
            console.log("Erro ao logar")
            console.log(error)
        })

    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/"> 
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl ">Links
                <span className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">Falé</span></h1>
            </Link>

            <form onSubmit={handleSubmit} className="w-ful max-w-xl flex flex-col px-2">
                <Input
                placeholder="Digita o teu email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                />
               <Input
                placeholder="*********"
                value={password}
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                />

                <button 
                type="submit"
                className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white mt-4">Entrar</button>
            </form>
            
        </div>
    )
}