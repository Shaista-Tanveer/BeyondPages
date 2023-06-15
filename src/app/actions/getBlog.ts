const getBlog = async(id: string) => {
    const blogs = await fetch('/api/blogs').then(res => res.json())
    const blog = blogs.find(blog => blog._id === id)
    return blog
}

export default getBlog