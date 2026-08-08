import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from: {
        type: String,
        enum: ['user', 'bot'],
        required: true
    },
    text: {
        type: String,
        required: true
    },
    fileInfo: {
        fileName: String,
        fileSize: Number,
        fileType: String,
        filePath: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        default: 'New Chat',
        maxlength: 100
    },
    messages: [messageSchema],
    reportMetadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
chatHistorySchema.index({ userId: 1, updatedAt: -1 });

// Update title automatically from first message
chatHistorySchema.pre('save', function(next) {
    if (this.messages.length > 0 && this.title === 'New Chat') {
        const firstUserMsg = this.messages.find(m => m.from === 'user');
        if (firstUserMsg && firstUserMsg.text) {
            this.title = firstUserMsg.text.substring(0, 50);
        }
    }
    next();
});

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);

export default ChatHistory;