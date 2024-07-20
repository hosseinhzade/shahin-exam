import { revalidatePath } from "next/cache";
import { getBlogs, addBlog, deleteBlog } from "@/app/serverside/data";

export default function Page() {
  async function createUserAction(formData: FormData) {
    "use server";
    const header = formData.get("header")?.toString() || "";
    const auther = formData.get("auther")?.toString() || "";
    const text = formData.get("text")?.toString() || "";

    if (!header || !auther || !text) {
      return;
    }

    const index = getBlogs().length + 1;

    addBlog({
      index,
      header,
      auther,
      text,
    });

    revalidatePath("/serverside/blogs/create");
  }

  async function deleteUserAction(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("id")?.toString() || "");

    if (!id) {
      return;
    }

    deleteBlog(id);
    revalidatePath("/serverside/blogs/create");
  }

  const blogs = getBlogs();

  return (
    <div className="w-full h-full">
      <div className="bg-red-400 w-[800px] flex justify-center min-h-[900px] mt-6 mx-auto rounded">
        <div className="p-6 w-full">
          <div className="mb-4">
            <form className="flex flex-col gap-2" action={createUserAction}>
              <input
                className="border rounded m-2 text-center w-full p-2"
                placeholder="header"
                name="header"
                id="header"
              />
              <input
                className="border rounded m-2 text-center w-full p-2"
                placeholder="auther"
                name="auther"
                id="auther"
              />
              <input
                className="border rounded m-2 text-center w-full p-2"
                placeholder="text"
                name="text"
                id="text"
              />
              <div className="mx-auto ">
                <input
                  className="border-2 p-2 bg-green-700 rounded-lg text-white cursor-pointer"
                  type="submit"
                  value="create blog"
                />
              </div>
            </form>
          </div>
          <div className="flex justify-center mb-4">
            <div className="flex justify-center text-black mb-4">{/* Add error handling here */}</div>
          </div>
          <table className="bg-blue-400 w-full text-center">
            <thead className="">
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">head</th>
                <th className="py-2">auth</th>
                <th className="py-2">text</th>
                <th className="py-2">action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-2 text-center">
                    there is no blog
                  </td>
                </tr>
              ) : (
                blogs.slice(-3).map((user: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{user.index}</td>
                    <td className="py-2">{user.header}</td>
                    <td className="py-2">{user.auther}</td>
                    <td className="py-2">{user.text}</td>
                    <td className="py-2">
                      <form action={deleteUserAction}>
                        <input name="id" value={user.index} className="hidden" />
                        <input
                          type="submit"
                          className="bg-red-600 text-white p-2 rounded-lg cursor-pointer"
                          value="delete blog"
                        />
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-2">
            <button className="bg-purple-500 p-2 rounded-md">
              <a href="/serverside/blogs">go to see blogs</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
