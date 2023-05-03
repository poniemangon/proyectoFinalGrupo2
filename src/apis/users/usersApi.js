const db = require('../../database/models/');
const path = require("path");

const api = {
    allUsers: async (req, res) =>
    {   const users = await db.User.findAll();
        const count = users.length;
        const usersArray = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            detail: `http://localhost:3100/profile/${user.id}`

        }));

        return res.json(
            {
                count, 
                users: usersArray
            }
        )
    },
    userByID: async (req, res) => {
        const userFound = await db.User.findByPk(req.params.id);
        return res.json(
            {
                name: userFound.name,
                surname: userFound.surname,
                email: userFound.email,
                image: `http://localhost:3100/images/userimages/${userFound.image}`
            }
        )
    }
}

module.exports = api;