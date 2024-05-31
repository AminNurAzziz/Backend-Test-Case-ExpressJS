const mongoose = require('mongoose');
const Member = require('../models/Member');
const Book = require('../models/Book');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/library', {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected to MongoDB');

        await seedData();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const seedData = async () => {

    const members = [
        { code: 'M001', name: 'Angga' },
        { code: 'M002', name: 'Ferry' },
        { code: 'M003', name: 'Putri' },
    ];


    const books = [
        { code: 'JK-45', title: 'Harry Potter', author: 'J.K Rowling', stock: 1 },
        { code: 'SHR-1', title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', stock: 1 },
        { code: 'TW-11', title: 'Twilight', author: 'Stephenie Meyer', stock: 1 },
        { code: 'HOB-83', title: 'The Hobbit, or There and Back Again', author: 'J.R.R. Tolkien', stock: 1 },
        { code: 'NRN-7', title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', stock: 1 },
    ];

    try {
        // Clear existing data
        await Member.deleteMany({});
        await Book.deleteMany({});

        // Insert sample member data
        await Member.insertMany(members);

        // Insert sample book data
        await Book.insertMany(books);

        console.log('Data seeding completed');
        process.exit(0); // Exit the process after seeding
    } catch (error) {
        console.error('Error seeding data:', error.message);
        process.exit(1);
    }
};

connectDB();
