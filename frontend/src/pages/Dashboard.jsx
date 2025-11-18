import axios from "axios";
import { Appbar } from "../Components/AppBar";
import { Balance } from "../Components/Balance";
import { useEffect, useState } from "react";
import { Users } from "../Components/Users";

function Dashboard(){
    const [balance, setBalance] = useState(null);
    const authToken = localStorage.getItem("token");
    
    useEffect(() =>{
        const fetchBalance = async () =>{
            try{
                 const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers:{
                        "userId":"6914605d539dd69e7a08d16e",
                        "Authorization": "Bearer " +authToken
                    }
                });
                setBalance(response.data.balance);
            }catch(error){
                console.error("Error fetching balance:", err);
            }
        };
        fetchBalance();
    },[]);
    
    return (
        <div>
            <Appbar />
            <div className="p-2">
                {balance !== null? (<Balance balance={balance} />) : (<p> Loading Balance ...</p>)}
            </div>
            <div className="p-2">
                <Users filter={"Hello"}/>
            </div>
        </div>
    )
}

export default Dashboard