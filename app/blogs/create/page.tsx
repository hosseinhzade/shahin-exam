"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [header, setheader] = useState("");
  const [auther, setauther] = useState("");
  const [text, settext] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState([]);


  function createUser() {
    setLoading(true)
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
            });
            setLoading(false)
          }
          setheader("");
          setauther("");
          settext("");
          setError('')
        });
    }
  }


  return (
    <div className="w-full h-full bg-s">
      <div className="bg-red-400 w-[800px] flex justify-center min-h-[900px] mt-6 mx-auto rounded">
        <div className="">
          <div className="">
            <input
              className="border rounded m-2 text-center"
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
              className="border rounded m-2 text-center"
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
              className="border rounded m-2 text-center"
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
            <div className="">
              <button className="bg-green-500 flex p-2 rounded-md mx-auto mt-3" onClick={createUser}>create user</button>
            </div>
            <div className="flex justify-center text-black">{error}</div>
            <div className="border-b m-2"></div>
          </div>
      </div>
     </div>
  );  
}
