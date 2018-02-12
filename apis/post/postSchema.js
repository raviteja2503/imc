module.exports.postSchema = { 
            postId: {
                type: Number,
                unique: true,
                required: true,
                index: true
            },
            postName: { 
                type: String,
                required: true,
                index: true
            },
            author: { 
                type: String,
                required: true,
                index: true
            },
            category: {
                type: String,
                required: true,
                index: true
            },
            content: {
                type: String,
                required: true
            },
            postType: {
              type: String,
              required: true
            },
            postOwner: {
                type: Number,
                required: true,
                index: true
            },
            dateCreated: {
                type: Number
            },
            status: {
                type: String
            }
        };