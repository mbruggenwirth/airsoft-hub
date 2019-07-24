const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a event name!'
    },
    slug: String,
    created: {
        type: Date,
        default: Date.now
    },
    type: {
      type: [String],
    },
    location: {
        type: {
            type: String,
            default: 'Feature'
        },
        properties: {
            address: {
                type: String,
                required: 'You must supply an address!'
            }
        },
        geometry: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: [{
                type: Number,
                required: 'You must supply coordinates!'
            }]
        },
    }
});

eventSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        next(); // skip it
        return; // stop this function from running
    }
    this.slug = slug(this.name);
    next();
    // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Event', eventSchema);
