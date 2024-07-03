import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface representing a Post document in MongoDB.
 */
export interface IPost extends Document {
  timestamp: Date;
  title: string;
  message: string;
  context: string;
  tags: string[];
  location: string;
  images: string[];
  externalLinks: string[];
  numLikes: number;
  numBookmarks: number;
  numViews: number;
}

/**
 * Mongoose schema for a Post document.
 */
const PostSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
  context: { type: String, required: true },
  tags: { type: [String], required: true },
  location: { type: String, required: true },
  images: { type: [String], required: true },
  externalLinks: { type: [String], required: true },
  numLikes: { type: Number, default: 0 },
  numBookmarks: { type: Number, default: 0 },
  numViews: { type: Number, default: 0 },
});

/**
 * Mongoose model for the Post schema.
 * @typedef IPost
 */
export const Post = mongoose.model<IPost>('Post', PostSchema);
