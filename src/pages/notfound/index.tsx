import { Link } from "react-router-dom";

export function NotFound(){
    return(
        <div className="flex w-full justify-center min-h-screen items-center flex-col text-white">
            <h1 className="font-bold text-4xl mb-4">404 - Not Found</h1>
            <Link className="bg-gray-50/20 py-1 px-4 rounded-md"
            to="/">Go Home</Link>
        </div>
    )
}