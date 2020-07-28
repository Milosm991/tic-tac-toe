let users = [];

const addUser = ({id, name, roomId}) => {

    const existingUser = users.find(user => user.name === name);

    if(existingUser){
        return { error: 'Username is taken!'}
    }

    const user = { id, name, roomId }

    users.push(user)
    console.log(users);
    return { user }
}


module.exports = { addUser }