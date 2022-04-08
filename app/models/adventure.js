const mongoose = require('mongoose')
const gearSchema = require('./gear')
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const adventureSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String
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
			type: Number,
			required: true,
		},
		gear: [gearSchema],
		comments: [commentSchema],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Adventure', adventureSchema)
