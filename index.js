const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
// models
const Person = require('./models/person');

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

// middleware
app.use(express.json());
app.use(logger);
app.use(logger_post);
app.use(cors());

// routes
app.get('/info', (request, response, next) => {
    Person.find({})
        .then(persons => {
            const info = `Phonebook has info for ${persons.length} people.`;
            const date = new Date();
            const html = `<p>${info}</p><br><p>${date}</p>`;

            response.send(html);
        })
        .catch(error => next(error));
});

app.use(express.static('build'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'All/some content is missing'
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
            response.json(savedPerson);
        });
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findOneAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error));
});

// custom middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
