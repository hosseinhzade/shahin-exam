interface Blog {
    index: number;
    header: string;
    auther: string;
    text: string;
  }
  
  const blogs: Blog[] = [];
  
  export function getBlogs() {
    return blogs;
  }
  
  export function addBlog(blog: Blog) {
    blogs.push(blog);
  }
  
  export function deleteBlog(index: number) {
    const blogIndex = blogs.findIndex(blog => blog.index === index);
    if (blogIndex !== -1) {
      blogs.splice(blogIndex, 1);
    }
  }
  