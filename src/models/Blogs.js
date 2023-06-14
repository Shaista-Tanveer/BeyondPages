import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    hashtags: {
        type: [String],
    },
    images: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
