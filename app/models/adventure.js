const mongoose = require('mongoose')

const adventureSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		time: {
			type: Number,
			required: true,
		},
		distance: {
			type: Number,
			required: true,
		},
		difficultyLevel: {
			type: Number,
			min: 0,
			max: 5,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		geolocation: {
			latititude: [{type: Number}],
			longitude: [{type: Number}],
			//required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Adventure', adventureSchema)
