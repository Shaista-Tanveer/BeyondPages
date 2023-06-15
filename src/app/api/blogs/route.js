import { connectToDB } from '../../../utils/database';
import Blog from '../../../models/Blogs';


export const GET = async (request) => {
    try {
        await connectToDB();
        const blogs = await Blog.find();
        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
