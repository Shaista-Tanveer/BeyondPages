// import { connectToDB } from '../../../utils/database';
// import Blog from '../../../models/Blogs';


// export const POST = async (request) => {
//     const { title, description, hashtags } = await request.json();
//     try {
//         await connectToDB();
//         const newPrompt = new Blog({ title, description, hashtags });
//         const savedBlog = await newPrompt.save();
//         return new Response(JSON.stringify(savedBlog), { status: 201 })
//     } catch (error) {
//         return new Response("Failed to create a new prompt", { status: 500 });
//     }
// } 

import { connectToDB } from '../../../utils/database';
import Blog from '../../../models/Blogs';
import { upload } from '../../../utils/multer';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const POST = async () => {
    try {
        await upload().array('images')(async (error) => {
            if (error instanceof multer.MulterError) {
                console.log(error.message);
                // return res.status(400).json({ error: error.message });
            } else if (error) {
                console.log(error);
                // return res.status(500).json({ error: 'Internal server error' });
            }

            const { title, description, hashtags } = req.body;
            const images = req.files.map((file) => file.path);

            try {
                await connectToDB();

                const newBlog = new Blog({ title, description, hashtags, images });
                const savedBlog = await newBlog.save();
                console.log(savedBlog, "savedBlog");
                // return res.status(201).json(savedBlog);
            } catch (error) {
                console.log(error);
                // return res.status(500).json({ error: 'Failed to create a new blog' });
            }
        });
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ error: 'Failed to process the request' });
    }
};
