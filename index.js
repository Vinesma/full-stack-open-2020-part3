const express = require('express');
const morgan = require('morgan');
const app = express();

// middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
};

// morgan config
// normal logger
logger = morgan(':method :url STATUS :status - took :response-time ms', {
    skip: function(request, response) { return request.method === 'POST' }
});

// POST request logger
logger_post = morgan((tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        'STATUS', tokens.status(request, response), '-',
        'took', tokens['response-time'](request, response), 'ms', '-',
        'body', JSON.stringify(request.body),
    ].join(' ');
},{ skip: function(request, response) { return request.method !== 'POST' }});

// use middleware
app.use(express.json());
app.use(logger);
app.use(logger_post);

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122",
    },
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook!</h1>')
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'All/some content is missing'
        });
    }

    if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'Duplicate names are not allowed'
        });
    }

    const person = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person);

    response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

app.get('/info', (request, response) => {
    const info = `Phonebook has info for ${persons.length} people.`;
    const date = new Date();
    const html = `<p>${info}</p><br><p>${date}</p>`;

    response.send(html);
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
