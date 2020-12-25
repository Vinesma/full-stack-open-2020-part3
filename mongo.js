const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 2) {
    // Display all persons in the DB

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        });
        mongoose.connection.close();
    });

} else if (process.argv.length === 4) {
    // Save a new person passed in via arguments

    const person = new Person({
        name: process.argv[2],
        number: process.argv[3],
    });

    person.save()
        .then(result => {
            console.log('New person saved:', result);
            mongoose.connection.close();
        });
} else {
    console.log('Invalid parameters');
    mongoose.connection.close();
    process.exit(1);
}
