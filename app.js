const express = require('express')
const app = express()
const morgan = require('morgan')
const serveFavIcon = require('serve-favicon')
const port = 3000

const coworkings = require('./mock-coworkings');

// const logger = (req, res, next) => {
//     console.log(`URL : ${req.url}`)
//     next()
// }

app
    .use(morgan('dev'))
    .use(serveFavIcon(__dirname + '/favicon.ico'))

// app.get('/api/coworkings', (req, res) => {
//     let sentence = ''
//     coworkings.forEach((coworking) => {
//         sentence += coworking.name + ''
//     })

//     console.log('Je viens de faire une requête get sur on app')
//   res.send(`Nombre de coworkings : ${coworkings.length}`)
// })

app.get('/api/coworkings', (req, res) => {
    // Afficher tous les coworkings dont la capacity est supérieur à 50
    const result = coworkings.filter(element => element.capacity > req.query.capacityMin)
    res.json(result)
})

 app.get('/api/coworkings', (req, res) => {
     // Afficher tous les coworkings dont la capacity est supérieur à 50
     const minimum = req.query.capMin || 50
     const result = coworkings.filter(element => element.capacity > minimum)
     const msg = `La liste des coworkings a bien été retournée.`
     res.json( {message : msg, data: result})
 })


// app.get('/api/coworkings/:id', (req, res) => {
//     console.log(req.params.id);
//     // Afficher le nom coworking qui correspond à l'id en paramètre
//     let myCoworking = coworkings.find((coworking) => {return coworking.id == req.params.id})

//     res.send(`Nom du coworking : ${myCoworking ? myCoworking.name : 'aucun'}`)
//   })


  app.get('/api/coworkings/:id', (req, res) => {
    // on retourne le coworking dont l'identifiant est celui passé en paramètre et affichage du message 
    // si l'id n'existe pas alors retourner un message 
    let myCoworking = coworkings.find((coworking) => {return coworking.id === Number(req.params.id)})

    let result;
    if(myCoworking){
        const msg = `Le coworking n°${req.params.id} a bien été trouvé`
        result = {message : msg, data : myCoworking}
    } else {
        const msg = `Aucun coworking ne correspond à l'identifiant ${req.params.id}`
        result = { message : msg, data : {}}
    }
    res.json(result)
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})