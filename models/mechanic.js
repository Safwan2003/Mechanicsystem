const mongoose = require('mongoose')

const mechanicSchema = mongoose.Schema({
    CNIC: {
        type: String,
        required: true
    },
    // utilityImage: {
        // type: String, // Assuming you will store the URL of the image in Cloudinary
        // required: true
    // },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        enum: ['Karachi South', 'Karachi East', 'Karachi West', 'Karachi Central', 'Karachi North', 'Korangi'],
        required: true
    },
    
    service:{
        type: String,
        required:true
    },
    verification: {
        type: Boolean,
        default: false
    },
    serviceVerification: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Mechanic', mechanicSchema)
