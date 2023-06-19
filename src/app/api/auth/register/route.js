import { connectToDB } from '../../../../utils/database'
import User from '../../../../models/user'
import bcrypt from 'bcrypt'

export const POST = async (request) => {
  const { username, email, password } = await request.json()

  try {
    await connectToDB()
    const userExists = await User.findOne({ email })

    if (userExists) {
      return new Response(
        JSON.stringify({ error: 'User already exists' }),
        {
          status: 400,
        },
      )
      return
    }

    // Create a new user document and save it to the database
    await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      // username: email.split('@')[0],
      usertype: 'user',
    })

    return new Response(
      JSON.stringify({
        message: 'User created successfully',
        status: "ok"
      }),
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
