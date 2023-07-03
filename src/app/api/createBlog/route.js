import { connectToDB } from '../../../utils/database';
import Blog from '../../../models/Blogs';

export const POST = async (request) => {
    try {
        console.log("api hit to create");
        const { title, description, hashtags, imageUrl } = await request.json();
        // console.log(title, description, hashtags, imageUrl, " title, description, hashtags, imageUrl");
        await connectToDB();
        const newBlog = new Blog({ title, description, hashtags, images: imageUrl });
        const savedBlog = await newBlog.save();
        return new Response(JSON.stringify({ id: savedBlog._id }), { status: 201 });
    } catch (error) {
        return new Response('Failed to create a new blog', { status: 500 });
    }
};
