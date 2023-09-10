import { DataTable } from "@/components/table/data-table";
import StatisticInfo from "@/components/cards/StatisticInfo";
import { Icons } from "@/components/Icons";
import Link from "next/link";

import { Order } from "@/models";
import { getCustomers } from "@/lib/actions/customers.actions";
import { customerscolumns } from "@/components/table/COLUMNS/customers";
import { DataTableToolbar } from "@/components/table/TOOLBARS/customers";

async function Page() {
  const customers = (await getCustomers()).data;

  function countOrdersByStatus(status: string) {
    return customers.filter((order: Order) => order.status === status).length;
  }

  const passiveCustomerCount = countOrdersByStatus("PASSIVE");
  const activeCustomerCount = countOrdersByStatus("ACTIVE");

  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 hover_card">
        <h2 className=" text-heading3-bold">Customer List</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>{" "}
          ~ Customer ~ List
        </p>
      </div>
      <div className="flex w-full gap-3 mb-5">
        <StatisticInfo
          color="#D439EF"
          icon={<Icons.pending color="#F3A0FF" />}
          name="passive customers"
          value={passiveCustomerCount}
        />
        <StatisticInfo
          color="#34BC6E"
          icon={<Icons.active color="#89ECB3" />}
          name="active customers"
          value={activeCustomerCount}
        />

        <StatisticInfo
          color="#ef3951"
          icon={<Icons.cancelOrders color="#f16e6e" />}
          name="blocked customers"
          value={activeCustomerCount}
        />
      </div>
      <div className="p-6 bg-white hover_card ">
        <DataTable data={customers} columns={customerscolumns}>
          <DataTableToolbar />
        </DataTable>
      </div>
    </div>
  );
}

export default Page;
