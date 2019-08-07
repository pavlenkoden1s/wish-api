const express = require('express')
const Wish = require('../models/WishItem')
// const auth = require('../middleware/auth')

const router = express.Router()

router.post('/wishes', async (req, res) => {
    try {
        const wish = new Wish(req.body)
        await wish.save()
        // const id = await wish.generateAuthToken()
        res.status(201).send({ wish })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/wish/searchname', async(req, res) => {
    try {
        const { name } = req.body
        const wish = await Wish.findByName(name)
        if (!wish) {
            return res.status(401).send({error: 'search failed! Check wishes name'})
        }
        res.send({ wish })
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router