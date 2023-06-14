import { connectToDB } from '@src/utils/database';
import User from '@src/models/user';

export const POST = async (request) => {
    const { fullName, email, password } = req.body;
    console.log(req.body, "api hit log");
    try {
        await connectToDB();

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        // Create a new user document and save it to the database
        await User.create({
            fullName,
            email,
            password,
            usertype: 'user',
        });

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}