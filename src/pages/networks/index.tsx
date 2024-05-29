import { Header } from "../../components/Header"
import { Input } from "../../components/input"
import { FormEvent, useEffect, useState } from "react"

import { db } from "../../services/firebaseConnection"

import { 
    setDoc,
    doc,
    getDoc,
}from "firebase/firestore"

export function Network(){
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")

    useEffect(() => {
        function loadlinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() ! == undefined){                    
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            })
        }
        loadlinks();
    }, [])

    function handleRegister(e: FormEvent){
        e.preventDefault();
        
        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        })
        .then(() => {
            console.log("Document successfully written!")

        })
        .catch((error) => {
            console.error("Error writing document: ", error)
        })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Redes Sociais</h1>

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do Facebook</label>
                <Input
                    type="url"
                    placeholder="Digita o url do Facebook"
                    value={facebook}
                    onChange={e => setFacebook(e.target.value)}
                />
                
                <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
                <Input
                    type="url"
                    placeholder="Digita o url do Instagram"
                    value={instagram}
                    onChange={e => setInstagram(e.target.value)}
                />
                
                <label className="text-white font-medium mt-2 mb-2">Link do Youtube</label>
                <Input
                    type="url"
                    placeholder="Digita o url do Youtube"
                    value={youtube}
                    onChange={e => setYoutube(e.target.value)}
                />

                <button 
                    type="submit"
                    className="bg-blue-500 text-white font-medium py-2 rounded-md">Cadastrar
                </button>               

                
            </form>
        </div>
    )

}