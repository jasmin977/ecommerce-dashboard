import { DataTable } from "@/components/table/data-table";
import StatisticInfo from "@/components/cards/StatisticInfo";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import { getOrders } from "@/lib/actions/orders.actions";
import { orderscolumns } from "@/components/table/COLUMNS/orders";
import { DataTableToolbar } from "@/components/table/TOOLBARS/orders";
import { Order } from "@/models";

async function Page() {
  const orders = (await getOrders()).data;

  function countOrdersByStatus(status: string) {
    return orders.filter((order: Order) => order.status === status).length;
  }

  const pendingOrdersCount = countOrdersByStatus("PENDING");
  const shippedOrdersCount = countOrdersByStatus("SHIPPED");
  const cancelledOrdersCount = countOrdersByStatus("CANCELLED");
  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 bg-white hover_card">
        <h2 className=" text-heading3-bold">Orders List</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>{" "}
          ~ Orders ~ List
        </p>
      </div>
      <div className="flex w-full gap-3 mb-5">
        <StatisticInfo
          color="#D439EF"
          icon={<Icons.pending color="#F3A0FF" />}
          name="pending orders"
          value={pendingOrdersCount}
        />
        <StatisticInfo
          color="#3C89EA"
          icon={<Icons.shippingOrders color="#96CEFA" />}
          name="shipped orders"
          value={shippedOrdersCount}
        />
        <StatisticInfo
          icon={<Icons.shoppingbag color="#89ECB3" />}
          name="recieved orders"
          color="#34BC6E"
          value={pendingOrdersCount}
        />
        <StatisticInfo
          color="#ef3951"
          icon={<Icons.cancelOrders color="#f16e6e" />}
          name="recived orders"
          value={cancelledOrdersCount}
        />
      </div>
      <div className="p-6 bg-white hover_card ">
        <DataTable data={orders} columns={orderscolumns}>
          <DataTableToolbar />
        </DataTable>
      </div>
    </div>
  );
}

export default Page;
