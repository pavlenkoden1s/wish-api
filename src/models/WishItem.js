const mongoose = require('mongoose')
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const wishSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    imageurls: [{url: String}],
    images: [{
        image: { 
            data: Buffer,
            contentType: String }
    }]
})

// wishSchema.pre('save', async function (next) {
//     // Hash the password before saving the user model
//     const wish = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })

wishSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const wish = this
    // const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    // user.tokens = user.tokens.concat({token})
    await wish.save()
    return wish._id
}

wishSchema.statics.findByName = async (name) => {
    // Search for a user by email and password.
    const wish = await Wish.findOne({ name} )
    if (!wish) {
        throw new Error({ error: 'Invalid wish' })
    }
    return wish
}

const Wish = mongoose.model('Wish', wishSchema)

module.exports = Wish