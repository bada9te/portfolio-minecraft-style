import Image from "next/image";
// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
        <Image
          src="/bgs/page_loading.gif"
          alt="Loading..."
          width={144}
          height={144}
        />
    </div>
  );
}
