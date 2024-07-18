import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

interface Blog {
    index: number;
    header: string;
    auther: string;
    text: string;
}

const dataFilePath = path.join(process.cwd(), 'app', 'api', 'blogs', 'data.json');

const readData = async (): Promise<Blog[]> => {
    try {
        const fileData = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {
        return [];
    }
};

const writeData = async (data: Blog[]) => {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { header, auther, text } = data;

    const blogs = await readData();
    const newIndex = blogs.length > 0 ? blogs[blogs.length - 1].index + 1 : 1;
    const newBlog: Blog = { index: newIndex, header, auther, text };
    blogs.push(newBlog);

    await writeData(blogs);

    return NextResponse.json({ operation: 'done' });
}

export async function GET(req: NextRequest) {
    const blogs = await readData();
    return NextResponse.json(blogs);
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const blogs = await readData();
    const updatedBlogs = blogs.filter((blog) => blog.index !== parseInt(id, 10));

    await writeData(updatedBlogs);

    return NextResponse.json({ operation: 'done' });
}
