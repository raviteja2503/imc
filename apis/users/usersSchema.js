module.exports.usersSchema = { 
            userId: {
                type: Number,
                unique: true,
                required: true,
                index: true
            },
            firstName: { 
                type: String,
                required: true
            },
            lastName: { 
                type: String,
                required: true
            },
            gender: {
                type: String
            },
            email: {
                type: String,
                index: true,
                unique: true,
                required: true
            },
            password: {
                type: String,
                initial: true,
                required: true
            },
            isAdmin: {
                type: Boolean
            },
            passwordResetToken: {
                type: String
            },
            passwordResetExpires: {
                type: Number
            },
            activationCode: {
                type: String
            },
            dateCreated: {
                type: Number
            },
            profilePictureId: {
                type: Number
            },
            mobile: {
                type: String
            },
            status: {
                type: String
            }
};
