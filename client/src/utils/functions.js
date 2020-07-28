import axios from 'axios'

const ENDPOINT = 'http://178.128.206.150:7000'
let apikey = JSON.parse(localStorage.getItem('apikey'));

export const findWinner = (field) => {
    const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

for(let i=0; i<winningCombinations.length; i++){

    const [a, b, c] = winningCombinations[i]

    if(field[a] && field[a] === field[b] && field[a] === field[c]){
        return field[a]
    }
}
return null

}

export const isThereMoreMoves = (fields) => {
    let count = 0;

    fields.forEach(field => field !== null && count ++)

    return count
}   

export const createCandidate = () => {
    axios({
        method: 'POST',
        url: `${ENDPOINT}/create_candidate/`,
        data: {
          firstName: 'Milos',
          lastName: 'Manojlovic'
        }
      })
      .then(response => localStorage.setItem('apikey', JSON.stringify(response.data.apikey)))
  
}

export const createNewPlayer = (name) => {

    return axios({
        method: 'POST',
        url: `${ENDPOINT}/player/`,
        data: { 
            name: name,
            apikey: apikey
        }
    })
}

export const createRoom = () => {
    return axios({
        method: 'POST',
        url: `${ENDPOINT}/create_board/`,
        data: {
            apikey: apikey
        }
    })
}

export const allRooms = () => {
    return axios({
        method: 'POST',
        url: `${ENDPOINT}/boards/`,
        data: {
            apikey: apikey
        }
    })
}