
import { useEffect, useState } from 'react';
import { Social } from '../../components/Social'
import { db } from '../../services/firebaseConnection'
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'

import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'


 
interface LinkProps{
    id: string;
    name: string;
    url: string;
    color: string;
    background: string;
}

interface SocialLinkProps{
    facebook: string;
    instagram: string;
    youtube: string;
}

export function Home(){
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks , setSocialLinks] = useState<SocialLinkProps>();

    useEffect(()=>{
        function loadLinks(){
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("created", "asc"));

            getDocs(queryRef)
            .then((snapshot)=>{
                let lista = [] as LinkProps[];

                snapshot.forEach((doc)  => {
                    lista.push(
                        { 
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            color: doc.data().color,
                            background: doc.data().background
                        })
            })    
            setLinks(lista);            
            })
        }
        loadLinks();
        },[]),
    
    useEffect(()=>{
        function loadSocialLinks(){
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
            .then((snapshot)=>{
                if(snapshot.data()!== undefined){
                    setSocialLinks({
                    facebook: snapshot.data()?.facebook,
                    instagram: snapshot.data()?.instagram,
                    youtube: snapshot.data()?.youtube
                })
            }                     
        })
        }
        
        loadSocialLinks();

    }, [])


    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Diogo Monteiro</h1>
            <span className="text-gray-50 mb-5 mt-20">Os meus Links 👇 </span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((link)=>(
                    <section
                    style={{backgroundColor: link.background}}
                    key={link.id}
                    className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                        <a href={link.url} target='_blank'>
                            <p className="text-base md:text-lg" style={{color: link.color}}>
                                {link.name}
                            </p>
                        </a>
                    </section>
                ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    
                <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLinks?.facebook}>
                        <FaFacebook size={30} color="#fff"/>
                    </Social>
                    <Social url={socialLinks?.instagram}>
                        <FaInstagram size={30} color="#fff"/>
                    </Social>
                    <Social url={socialLinks?.youtube}>
                        <FaYoutube size={30} color="#fff"/>
                    </Social>
                </footer>
                )}
                
            </main>    
        </div>
    )
}