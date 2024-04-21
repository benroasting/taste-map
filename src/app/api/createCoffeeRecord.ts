import axios from "axios";
import { CreateRecord } from "../types/CreateRecord";

export async function createCoffeeRecord( createCoffeeRecord: CreateRecord): Promise<CreateRecord> {
    const response = await axios.post<CreateRecord>(`http://localhost:3000/coffeerecord`, {
        ...createCoffeeRecord
    })

    console.log(response);

    return response.data
}