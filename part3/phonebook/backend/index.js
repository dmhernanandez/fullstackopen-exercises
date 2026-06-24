const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./src/models/phonebook')
const app = express()
const PORT = 3001

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  else {
    return null
  }
})

const errorHandler = (error, request, response, next) => {
  if( error.name === 'CastError'){
      return response.status(400).json({ error: 'malformatted id'})
  }
  if (error.name === 'ValidationError'){
     return response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request, response, next) => {
  Phonebook.find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(result => {
      return response.status(204).send()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Phonebook.countDocuments({})
    .then(countedPersons => {
      response.send(`<p>Phonebook has info for ${countedPersons} people</p>
    <p>${new Date().toString()}</p>`)
    })
    .catch( error => next(error))

})

app.post('/api/persons', async (request, response, next) => {
  
  const body = request.body
 /* if (!body.number || !body.name) {
    return response.status(400).json({ error: 'name and number are required' })
  }*/

  try {
    const existing = await Phonebook.findOne({ name: body.name })

    if (existing) {
      return response.status(400).json({ error: 'name must be unique' })
    }

    const person = new Phonebook({
      name: body.name,
      number: body.number
    })

    const contact = await person.save()
    response.status(201).json(contact)

  } catch (error) {
    next(error)
  }

})
app.put('/api/persons/:id', (request, response, next) => {

  const newPhoneBook = {
    name: request.body.name,
    number: request.body.number,
  }
  Phonebook.findByIdAndUpdate(request.params.id, newPhoneBook, { new: true, runValidators: true, context: 'query' })
    .then(updated => response.json(updated))
    .catch(error => next(error))
})
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`App listen o port ${PORT}`)
})