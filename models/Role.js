import mongoose from 'mongoose';

const Role = mongoose.model('Role', {
    name: String
});

export default Role;