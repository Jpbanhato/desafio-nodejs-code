import mongoose from 'mongoose';

const Depto = mongoose.model('Depto', {
    name: String
});

module.exports = Depto;