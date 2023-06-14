import { connectToDB } from '../../../utils/database';
import Blog from '../../../models/Blogs';


export const GET = async (request, res) => {
    try {
        await connectToDB();
        const blogs = await Blog.find();
        console.log(blogs, "all blogs");
        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
