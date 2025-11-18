export function Button({label, onclick}){
    return(
        <div>
            <button className="w-full bg-black text-white rounded-2xl p-2 hover:bg-gray-500" onClick={onclick}>{label}</button>
        </div>
    )
}