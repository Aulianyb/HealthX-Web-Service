import { supabase } from "../../lib/API";
import { useState, useEffect} from "react";

const APITesting = () => {
    const [dataAkun, setDataAkun] = useState<any>(null)

    const dataUser = async () => {
        const { data, error } = await supabase
        .from('Account')
        .select()

        if (error) {
            console.error(error);
        } else {
            setDataAkun(data)
            console.log(data);
        }
    }

    useEffect(() => {
        dataUser();
    }, []);

    return (
        <div>

        <p> TESTING </p>
        </div>
    );
}

export default APITesting; 