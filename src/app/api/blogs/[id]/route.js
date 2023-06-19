import { connectToDB } from '../../../../utils/database';
import Blog from '../../../../models/Blogs';


export const PATCH = async (request, { params }) => {
    try {
        await connectToDB();

        const { title, description, hashtags } = await request.json();

        const existingBlog = await Blog.findById(params.id);

        if (!existingBlog) {
            return new Response('Blog not found', { status: 404 });
        }
        existingBlog.title = title;
        existingBlog.description = description;
        existingBlog.hashtags = hashtags;
        await existingBlog.save();

        return new Response('Successfully updated the Blog', { status: 200 });
    } catch (error) {
        return new Response(`Error updating Blog: ${error.message}`, { status: 500 });
    }
};


export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Blog.findByIdAndRemove(params.id);
        return new Response("Blog deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Blog", { status: 500 });
    }
};