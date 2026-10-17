import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
  return (
      <div>
        <Navbar />
          <div className="px-4 py-6">
              <h1>Hello world!</h1>
          </div>
      </div>

  );
}
