const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

let notes = [
  {
    name: 'roku_js',
    id: 1,
    content: 'programming in Python'
  },
  {
    name: 'nana_js',
    id: 2,
    content: 'JavaScript'
  },
  {
    name: 'go_js',
    id: 3,
    content: 'golang is better than rust'
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Roku_js</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    res.json(req)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.post('/api/notes/', (req, res) => {
  const note = req.body

  if (!note || !note.content || !note.name) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    name: note.name,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
