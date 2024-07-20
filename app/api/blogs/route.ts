import { NextRequest, NextResponse } from "next/server";

interface Blog {
    index: number;
    header: string;
    auther: string;
    text: string;
}

let blogs: Blog[] = [];

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { header, auther, text } = data;

    const newIndex = blogs.length > 0 ? blogs[blogs.length - 1].index + 1 : 1;
    const newBlog: Blog = { index: newIndex, header, auther, text };
    blogs.push(newBlog);

    return NextResponse.json({ operation: 'done' });
}

export async function GET(req: NextRequest) {
    return NextResponse.json(blogs);
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    blogs = blogs.filter((blog) => blog.index !== parseInt(id, 10));

    return NextResponse.json({ operation: 'done' });
}
