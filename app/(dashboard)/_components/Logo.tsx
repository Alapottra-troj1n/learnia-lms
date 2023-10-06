import Image from "next/image";

const Logo = () => {
    return (<div className="flex gap-3 items-center">
        <Image src={'/logo.svg'} width={30} height={30} alt="logo" />
        <h2 className="text-lg font-semibold text-slate-700" >learnia.</h2>
    </div>);
}
 
export default Logo;