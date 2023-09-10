import { getCategories } from "@/lib/actions/categories.actions";
import { DataTable } from "@/components/table/data-table";

import Link from "next/link";
import { categoriescolumns } from "@/components/table/COLUMNS/categories";
import { DataTableToolbar } from "@/components/table/TOOLBARS/categories";

async function Page() {
  const categories = (await getCategories()).data;
  console.log("🚀 ~ file: page.tsx:9 ~ Page ~ categories:", categories);

  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 bg-white hover_card">
        <h2 className=" text-heading3-bold">Category List</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>{" "}
          ~ Category ~ List
        </p>
      </div>

      <div className="p-6 bg-white hover_card ">
        <DataTable data={categories} columns={categoriescolumns}>
          <DataTableToolbar categories={categories} />
        </DataTable>
      </div>
    </div>
  );
}

export default Page;
