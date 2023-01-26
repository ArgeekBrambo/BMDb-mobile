const { Genre } = require('../models');
const { sequelize } = require('../models');

class ControllerGenre {
    static getAll(req, res, next) {
        Genre.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static async addGenre(req, res, next) {
        // console.log(req.body, 'ini req.body');
        // console.log(req, 'ini req');

        const trans = await sequelize.transaction();
        const { inputForm } = req.body;
        // console.log(name, 'ini name');
        try {
            const newGenre = await Genre.findOrCreate({
                where: {
                    name: inputForm
                },
                defaults: {
                    name: inputForm
                },
                transactions: trans
            })
            res.status(201).json(newGenre)
        } catch(err) {
            next(err)
        }
    }

    static async deleteGenre(req, res, next) {
        try {
            const id = +req.params.id;
            const deletedGenre = await Genre.destroy({
                where: {
                    id
                }
            })
            res.status(200).json(deletedGenre)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerGenre;