module.exports.commentsSchema = { 
                                commentId: {
                                    type: Number,
                                    unique: true,
                                    required: true,
                                    index: true
                                },
                                comment: { 
                                    type: String,
                                    required: true,
                                    index: true
                                },
                                userId: {
                                    type: Number,
                                    required: true,
                                    index: true
                                },
                                postId: {
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