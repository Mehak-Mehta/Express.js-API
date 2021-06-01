const express = require('express')
const hunter = require('../models/hunter')

const router = express.Router()
const Hunter = require('../models/hunter')


// Get all 
router.get('/' , async (req, res) => {
    
    try{
        const hunters = await Hunter.find()
        res.json(hunters)

    } catch (error){
        res.status(500).json({msg : error.msg})

    }
    

})
// Get one
router.get('/:id' , getHunters , (req, res) => {
    res.send(res.getHunters.name)

})
// Create one
router.post('/', async (req, res) => {
    const hunter = new Hunter({
      name: req.body.name,
      age: req.body.age,
      description: req.body.description
    })
    try {
      const newHunter = await hunter.save()
      res.status(201).json(newHunter)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
// Update one
router.patch('/:id', getHunters , async(req, res) => {
  if (req.body.name != null) {
    res.hunter.name = req.body.name
  }
  if (req.body.age != null) {
    res.hunter.age = req.body.age
  }
  if (req.body.description != null) {
    res.hunter.description = req.body.description
  }
  try {
    const updatedHunter = await res.hunter.save()
    res.json(updatedHunter)
  } catch (err) {
    res.status(400).json({ msg: err.msg })
  }

})
// Delete one
router.delete('/:id' , getHunters , async(req, res) => {
  try{
    await res.hunter.remove()
    res.json({msg : "Deleted Hunter"})

  } catch (err) {
    res.status(500).json({
      msg : err.msg
    })

  }

})

async function getHunters(req,res,next) {
  let hunter
  try {
    hunter = await Hunter.findById(req.params.id)
    if (hunter == null) {
      return res.status(404).json({msg : "cannot find hunter"})
    }

  } catch (err){ 
    return res.status(500).json({msg : err.msg})
    
  }
  res.hunter = hunter

} 

module.exports = router
