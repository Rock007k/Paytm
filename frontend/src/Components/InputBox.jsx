export function InputBox({label, placeholder, onchange}){
    return(
        <div>
        <label className="font-medium p-0.5">{label}</label>
        <input className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder={placeholder} onChange={onchange}/>
        
        </div>
    )
};