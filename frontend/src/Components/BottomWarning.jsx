    import { Link } from "react-router-dom";

export function BottomWarn({label, buttontext, to}){
    return(
        <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <div className="pl-2"></div>
            <Link className="underline " to={to}>
                {buttontext}
            </Link>
        </div>
    )
}