import CreateCategory from "@/components/forms/CreateCategory";
import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 bg-white hover_card">
        <h2 className=" text-heading3-bold">Category Upload</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>{" "}
          ~ Category ~ Upload
        </p>
      </div>
      <CreateCategory />
    </div>
  );
};

export default Page;
