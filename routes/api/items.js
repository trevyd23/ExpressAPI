const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/AuthMiddleware');

//Item Model
const Item = require('../../models/Item');

//@route GET api/items
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.status(400).send(err))
});

//@route POST api/items
router.post('/create/item', authMiddleware, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        price: req.body.price
    });

    newItem.save()
        .then(item => {
            res.status(201).send(item)
        })
        .catch(err => {
            res.status(400).send(err)
        })
});

//@route DEL api/items/:id
router.delete('/:id', authMiddleware, (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.remove()
                .then(
                    () => res.status(200).json({
                        message: 'Successfully deleted',
                        itemID: req.params.id
                    }))
        }).catch(err => res.status(404).json({ message: 'Could not find product' }))
})

//@route PUT api/items/:id
router.put('/:id', authMiddleware, (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            Item.findById(req.params.id)
                .then(item => res.json(item))
                .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
})


module.exports = router;