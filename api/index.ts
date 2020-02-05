import { NowRequest, NowResponse } from '@now/node'
import fetch from 'node-fetch-npm'

const maxRandomNumbers = 10;

enum RandomType {
     Quantum = "quantum", 
     Pseudo = "pseudo" 
}

interface Result {
    numbers: number[],
    type: RandomType
}

export default async (request: NowRequest, response: NowResponse) => {
    const { size = 4 } = request.query
    const n = Math.min(+size, maxRandomNumbers)

    const result = await getNumbers(n)
    
    response.status(200).json(result)
}

async function getNumbers(size: number): Promise<Result> {
   const response = await fetch(`http://random.openqu.org/api/rand?size=${size}`);
   const json = await response.json();

   return {
       numbers: json.result,
       type: RandomType.Quantum
   };
}
