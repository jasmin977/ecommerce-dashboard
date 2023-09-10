import { getBrands } from "@/lib/actions/brands.actions";
import { getProducts } from "@/lib/actions/products.actions";

import { getCategories } from "@/lib/actions/categories.actions";
import { DataTable } from "@/components/table/data-table";
import StatisticInfo from "@/components/cards/StatisticInfo";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import { productscolumns } from "@/components/table/COLUMNS/products";
import { DataTableToolbar } from "@/components/table/TOOLBARS/products";

async function Page() {
  const products = (await getProducts()).data;
  const brands = (await getBrands()).data;
  const categories = (await getCategories()).data;

  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 bg-white hover_card">
        <h2 className=" text-heading3-bold">Product List</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>{" "}
          ~ Product ~ List
        </p>
      </div>
      <div className="flex w-full gap-3 mb-5">
        <StatisticInfo
          color="#3C89EA"
          icon={<Icons.shoppingbag color="#96CEFA" />}
          name="total products"
          value={products.length}
        />
        <StatisticInfo
          icon={<Icons.categoriesStat color="#89ECB3" />}
          name="total categories"
          color="#34BC6E"
          link="/categories"
          value={categories.length}
        />
        <StatisticInfo
          color="#D439EF"
          icon={<Icons.brandstat color="#F3A0FF" />}
          name="total barnds"
          link="/brands"
          value={brands.length}
        />
      </div>
      <div className="p-6 bg-white hover_card ">
        <DataTable data={products} columns={productscolumns}>
          <DataTableToolbar brands={brands} categories={categories} />
        </DataTable>
      </div>
    </div>
  );
}

export default Page;
