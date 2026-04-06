import mongoose, { Schema, models, model } from 'mongoose';

const PostSchema = new Schema({
  slug: String,
  title: String,
  excerpt: String,
  content: String,
  category: String,
  tags: [String],
  author: {
    name: String,
    avatar: String,
    bio: String,
  },
  publishedAt: String,
  readTime: Number,
  featured: Boolean,
});

// 👇 THIS LINE FIXES EVERYTHING
const Post = models.Post || model('Post', PostSchema);

export default Post;