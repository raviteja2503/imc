module.exports.eventSchema = { 
                            eventId: {
                                type: Number,
                                unique: true,
                                required: true,
                                index: true
                            },
                            eventName: { 
                                type: String,
                                required: true,
                                index: true
                            },
                            description: {
                                type: String,
                                required: true
                            },
                            place: { 
                                type: String,
                                required: true,
                                index: true
                            },
                            time: {
                                type: String,
                                required: true,
                                index: true
                            },
                            userId: {
                              type: Number,
                              required: true
                            },
                            guests: {
                                type: String,
                                required: true
                            },
                            dateCreated: {
                                type: Number
                            },
                            status: {
                                type: String
                            }
                        };