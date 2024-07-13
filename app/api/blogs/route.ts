// import { blogs } from "./data";
import { NextRequest } from "next/server";
interface Blog {
    // Define properties of a Blog
    header: string;
    auther: string;
    text: string
    // Add more properties as needed
}

const blogs: Blog[] = []; // Assuming Blog is your defined type for a blog object

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const header = data.header;
  const auther = data.auther;
  const text = data.text;

  await blogs.push({header: header, auther: auther, text: text})

  return Response.json({ operation: "done" });
}

export async function GET(req: Request, res: Response) {
  return  Response.json(blogs);
}

// export async function DELETE(req: NextRequest, res: Response) {
//   const id = req.nextUrl.searchParams.get("id");
//   console.log(id);

//   blogs({ where: { id } });
//   return Response.json({ operation: "done" });
// }
