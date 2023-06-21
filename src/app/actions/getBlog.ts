const getBlog = async (id: string) => {
  const response = await fetch(`/api/blogs/${id}`)
  const blog = await response.json()
  return blog
}

export default getBlog
