const mongoose = require('mongoose');
const Event = mongoose.model('Event');


exports.homePage = (req, res) => {
    res.render('index');
};

exports.eventForm = (req, res) => {
  res.render('event/add');
};


exports.addEvent = async (req, res) => {
    if(!req.body.location) next();

    const event = await (new Event({
        name: req.body.name,
        type: req.body.type,
        location: req.body.location
    })).save();

    req.flash('success', `${event.name} - ${event.slug}`);
    res.redirect('/');
};

exports.getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};