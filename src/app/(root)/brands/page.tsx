import { DataTable } from "@/components/table/data-table";

import Link from "next/link";
import { getBrands } from "@/lib/actions/brands.actions";
import { brandscolumns } from "@/components/table/COLUMNS/brands";
import { DataTableToolbar } from "@/components/table/TOOLBARS/brands";

async function Page() {
  const brands = (await getBrands()).data;

  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 bg-white hover_card">
        <h2 className=" text-heading3-bold">Brand List</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>{" "}
          ~ Brand ~ List
        </p>
      </div>

      <div className="p-6 bg-white hover_card ">
        <DataTable data={brands} columns={brandscolumns}>
          <DataTableToolbar brands={brands} />
        </DataTable>
      </div>
    </div>
  );
}

export default Page;
