export const Balance = ({balance}) =>{
    return(
        <div className="flex p-4 ">
            <div className="font-semibold">
                Your Balance
            </div>
            <div className="ml-4">
                RS {balance}
            </div>
        </div>
    )
}