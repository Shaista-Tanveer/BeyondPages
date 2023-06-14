// import { connectToDB } from '../../../utils/database';
// import Blog from '../../../models/Blogs';


// export const POST = async (request) => {
//     const { title, description, hashtags } = await request.json();
//     try {
//         await connectToDB();
//         const newPrompt = new Blog({ title, description, hashtags });
//         const newBlog = await newPrompt.save();
//         return new Response(JSON.stringify(newPrompt), { status: 201 })
//     } catch (error) {
//         return new Response("Failed to create a new prompt", { status: 500 });
//     }
// } 




import { connectToDB } from '../../../utils/database';
import multer from 'multer';
import Blog from '../../../models/Blogs';

// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '_' + file.originalname);
//     },
// });

// const upload = multer({ storage });

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export const uploadMiddleware = upload.single('image');

export const POST = async (req, res) => {
    const { title, description, hashtags } = await request.json()
    console.log(title, description, hashtags);
    try {
        await connectToDB();
        const newBlog = new Blog({ title, description, hashtags });
        // if (req.file) {
        //     newBlog.image = req.file.path;
        // }
        const savedBlog = await newBlog.save();
        return new Response(JSON.stringify(savedBlog), { status: 201 })
    } catch (error) {
        console.log(error, "whats the error");
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};
