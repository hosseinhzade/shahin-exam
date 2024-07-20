"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import axios from "axios";

export default function Home() {
  const [header, setheader] = useState("");
  const [auther, setauther] = useState("");
  const [text, settext] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Blog[]>([]);

  interface Blog {
    index: number;
    header: string;
    auther: string;
    text: string;
  }

  function deleteUser(id: number) {
    setLoading(true);
    axios.delete(`/api/blogs?id=${id}`).then((res) => {
      if (res.data.operation === "done") {
        axios.get("/api/blogs").then((res) => {
          setData(res.data);
          setLoading(false);
        });
      }
    });
  }

  useEffect(() => {
    axios.get("/api/blogs").then((res) => {
      setData(res.data);
    });
  }, []);

  function createUser() {
    setLoading(true);
    if (!header || !auther || !text) {
      setError("you have to fill all inputs ");
    } else {
      axios
        .post("/api/blogs", {
          header,
          auther,
          text,
        })
        .then((res) => {
          if (res.data.operation === "done") {
            axios.get("/api/blogs").then((res) => {
              setData(res.data);
              setLoading(false);
            });
          }
          setheader("");
          setauther("");
          settext("");
          setError("");
        });
    }
  }

  return (
    <div className="w-full h-full">
      <div className="bg-red-400 w-[800px] flex justify-center min-h-[900px] mt-6 mx-auto rounded">
        <div className="p-6 w-full">
          <div className="mb-4">
            <input
              className="border rounded m-2 text-center w-full p-2"
              onChange={(e) => {
                setheader(e.target.value);
              }}
              value={header}
              type="text"
              name="header"
              id="header"
              placeholder="header"
            />
            <input
              className="border rounded m-2 text-center w-full p-2"
              onChange={(e) => {
                setauther(e.target.value);
              }}
              value={auther}
              type="text"
              name="auther"
              id="auther"
              placeholder="auther"
            />
            <input
              className="border rounded m-2 text-center w-full p-2"
              onChange={(e) => {
                settext(e.target.value);
              }}
              value={text}
              type="text"
              name="text"
              id="text"
              placeholder="text"
            />
          </div>
          <div className="flex justify-center mb-4">
            <button
              className="bg-green-500 p-2 rounded-md"
              onClick={createUser}
            >
              create blog
            </button>
          </div>
          <div className="flex justify-center text-black mb-4">{error}</div>
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
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-2 text-center">
                    there is no blog
                  </td>
                </tr>
              ) : (
                data.slice(-3).map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{user.index}</td>
                    <td className="py-2">{user.header}</td>
                    <td className="py-2">{user.auther}</td>
                    <td className="py-2">{user.text}</td>
                    <td className="py-2">
                      <button
                        type="submit"
                        className="bg-red-600 text-white p-2 rounded-lg cursor-pointer"
                        value="delete user"
                        onClick={() => {
                          deleteUser(user.index);
                        }}
                      >
                        delete user
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-2">
            <button className="bg-purple-500 p-2 rounded-md">
              <Link href={"/clientside/blogs"}>go to see blogs</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
