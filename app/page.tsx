import Link from "next/link";


export default function Main(){
    return (
        <>
        <div className="w-full h-full bg-s">
          <div className="bg-blue-400 w-[800px] flex justify-center min-h-[900px] mt-6 mx-auto rounded">
            <div className="flex justify-center items-center gap-x-9">
                <div className="bg-orange-500 p-3 rounded-full">
                    <Link href={"/clientside"}>go to client side</Link>
                </div>
                <div className="bg-yellow-400 p-3 rounded-full">
                    <Link href={"/serverside"}>go to server side</Link>
                </div>
                
            </div>
          </div>
        </div>
        </>
    )
}