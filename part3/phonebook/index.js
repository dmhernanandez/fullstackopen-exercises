const express = require('express')
const morgan = require('morgan')
const app = express()


morgan.token('body', ( req, res ) => {
    if (req.method === 'POST'){
      return JSON.stringify(req.body)
    }
    else{
      return null
    }
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = 3001
const persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
app.use(express.json())
app.use(express.static('dist'))
const generateId = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber)
}
app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === request.params.id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const newPersons = persons.filter((p) => p.id !== request.params.id)
  //persons = newPersons
  console.log(newPersons)
  // app.status(404).send()
})

app.get('/info', (request, response) => {
  const countPersons = persons.length
  response.send(`<p>Phonebook has info for ${countPersons} people</p>
    <p>${new Date().toString()}</p>`)
})

app.post('/api/persons', (request, response) => {

  const body = request.body
  let existsPerson = persons.find((person) => person.name.toLowerCase() === body.name.toLowerCase())
   
  if (!body.number) {
    return response.status(400).json({ error: 'Body Empty' })
  }
  if (existsPerson) {
    return response.status(400).json({ error: 'name must be unique' })
  } else {
    const person = {
      id: generateId(20000),
      name: body.name,
      number: body.number
    }
    persons.push(person)
    response.status(201).json(person)
  }

})
app.listen(PORT, () => {
  console.log(`App listen o port ${PORT}`)
})