import { connectToDB } from '../../../utils/database'
import Blog from '../../../models/Blogs'

// export const GET = async (request) => {
//   try {
//     const title = request.nextUrl.searchParams.get('title')
//     await connectToDB()
//     const blogs = await Blog.find(
//       title ? { title: { $regex: title, $options: 'i' } } : {}
//     )
//     return new Response(JSON.stringify(blogs), { status: 200 })
//   } catch (error) {
//     return new Response('Failed to create a new prompt', { status: 500 })
//   }
// }


export const GET = async (request) => {
  try {
    const title = request.nextUrl.searchParams.get('title');
    const page = request.nextUrl.searchParams.get('page');
    const limit = parseInt(request.nextUrl.searchParams.get("limit"));
    await connectToDB();

    const totalBlogs = await Blog.countDocuments(
      title ? { title: { $regex: title, $options: 'i' } } : {}
    );
    const totalPages = Math.ceil(totalBlogs / limit);

    const blogs = await Blog.find(
      title ? { title: { $regex: title, $options: 'i' } } : {}
    )
      .skip((page - 1) * limit)
      .limit(limit);
    return new Response(JSON.stringify({ blogs, totalPages }), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch blogs', { status: 500 });
  }
};
