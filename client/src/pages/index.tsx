import { Inter } from "next/font/google";
import { BasicLayout } from "@/app/components/layout/BasicLayout";
import NotesContainer from "@/app/screens/collections/NotesContainer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className=" overflow-x-hidden">
      <BasicLayout>
        <div className="h-full">
          <h1>омг</h1>
          <NotesContainer />
        </div>
      </BasicLayout>
    </main>
  );
}
