import { NowRequest, NowResponse } from '@now/node'

const maxRandomNumbers = 10;

enum RandomType {
     Quantum = "quantum", 
     Pseudo = "pseudo" 
}

export default (request: NowRequest, response: NowResponse) => {
    const { size = 4 } = request.query
    const n = Math.min(size, maxRandomNumbers)
    const result = { 
        result: getRandonNumbers(n),
        type: RandomType.Pseudo
    }
    response.status(200).json(result)
}

function getRandonNumbers(size: number): number[] {
    let randonNumbers = []

    for (let index = 0; index < size; index++) {
        randonNumbers.push(Math.random())
    }

    return randonNumbers;
}

// http://random.openqu.org/api/ used to work until 2020-jan-16
// now it's offline
/*'https://cors-anywhere.herokuapp.com/http://random.openqu.org/api/rand?size=4'
		http://random.openqu.org/api/rand?size=4 will return something like
		{
			"result": [
				0.49009711073946605,
				0.006116551581331657,
				0.050656291202329166,
				0.908841977573196
			]
		}
*/