import CreateBrand from "@/components/forms/CreateBrand";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <h2 className="capitalize text-heading3-bold">add new brand</h2>
      <CreateBrand />
    </div>
  );
};

export default Page;
