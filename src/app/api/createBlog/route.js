import { connectToDB } from '../../../utils/database';
import Blog from '../../../models/Blogs';

export const POST = async (request) => {
    try {
        console.log("api hit to create");
        const { title, description, hashtags } = await request.json();
        console.log(title, description, hashtags, "title, description, hashtags");
        await connectToDB();
        const newBlog = new Blog({ title, description, hashtags });
        console.log(newBlog, "newBlog");
        const savedBlog = await newBlog.save();
        console.log(savedBlog, "savedBlog");
        return new Response(JSON.stringify({ id: savedBlog._id }), { status: 201 });
    } catch (error) {
        return new Response('Failed to create a new blog', { status: 500 });
    }
};
