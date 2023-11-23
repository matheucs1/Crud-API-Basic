const express = require('express');
const router = express.Router();
const db = require('./../db/models');

router.get("/users", async (req, res) => {

    try {
        const users = await db.Users.findAll({

            attributes: ['id', 'name', 'email'],
            order: [['id', 'DESC']]

        });

        if (users) {
            res.status(200).json({
                users
            })
        } else {
            res.status(400).json({
                mensagem: "Erro: Nenhum usuário encontrado"
            })
        }
    } catch (error) {
        console.log(error + " Nenhum usuário encontrado")
    }


});

router.get('/users/:id', async (req, res) => {


    try {
        const { id } = req.params;

        const user = await db.Users.findOne({
            attributes: ['id', 'name', 'email'],

            where: { id },
        });

        if (user) {

            res.status(200).json({
                user: user
            })

        } else {
            res.status(400).json({
                mensagem: "Erro: Usuário não encontrado"
            })
        }
    } catch (error) {
        console.log(error + " Usuário encontrado")
    }

});

router.post("/users", async (req, res) => {

    try {
        const dados = req.body;
        console.log(dados);

        await db.Users.create(dados).then((dadosUsuario) => {

            res.status(200).json({
                mensagem: "Usuário cadastrado com sucesso!",
                dadosUsuario
            })
        }).catch(() => {
            res.json({
                mensagem: "Erro: Usuário não cadastrado"
            })
        })

    } catch (error) {
        console.log(error + " Usuário cadastrado")
    }
});

router.put("/users/:id", async (req, res) => {

    try {
        const dados = req.body;

        await db.Users.update(dados, { where: { id: dados.id } })
            .then(() => {
                res.status(200).json({
                    mensagem: "Usuário editado com sucesso!"
                })
            }).catch(() => {
                res.status(400).json({
                    mensagem: "Erro: Usuário não editado"
                })
            });
    } catch (error) {
        console.log(error + " Falha na edição")
    }


});

router.delete('/users/:id', async (req, res,) => {

    try {
        const { id } = req.params;

    await db.Users.destroy({
        where: { id }
    }).then(() => {
        res.status(200).json({
            mensagem: "Usuário apagado com sucesso!"
        })
    }).catch(() => {
        res.status(400).json({
            mensagem: "Erro: Usuário não apagado"
        })
    })
    } catch (error) {
        console.log(error + " Usuário não deletado")
    }
    
})

module.exports = router;