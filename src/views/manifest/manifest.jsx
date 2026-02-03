import "./manifest.css";
import Background from "../../assets/images/background/Background-site-Yby 1.png";

export default function Manifest() {
    return (
        <div className="flex  items-center justify-center h-[100vh] " >
            
            <div className="flex w-full flex-col items-start justify-start p-10 " >
                <div className="flex w-full flex-row items-center justify-center gap-2 mb-5 z-1 ">
                    <div className="w-1 h-1 bg-primary-light rounded-full" />
                    <p className="text-md font-light uppercase text-gray-400 tracking-widest">Manifesto do produto</p>
                </div>
                <p className=" z-1 w-full text-5xl font-bold my-2 text-center text-gray-800 max-w-3xl mx-auto tracking-wide ">Registro de ponto não precisa parecer <span className="gradient-text">castigo.</span></p>
                <p className="z-1 w-full text-gray-500 text-md mb-8 p-2 text-center font-regular mt-5 tracking-wide">Tratamos o tempo como um ativo estratégico.<br/> Não como um número frio no fechamento da folha. </p>
               
            </div>
        </div>
    );
}