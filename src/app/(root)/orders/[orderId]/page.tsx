import { Separator } from "@/components/ui/separator";
import { getOrder } from "@/lib/actions/orders.actions";
import { Order, OrderItem } from "@/models";
import Image from "next/image";
import Link from "next/link";

interface Props {}

async function Page({ params }: { params: { orderId: number } }) {
  if (!params.orderId) return null;

  const order = (await getOrder(params.orderId)).data;
  console.log("🚀 ~ file: page.tsx:10 ~ Page ~ order:", order);
  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 bg-white hover_card">
        <h2 className=" text-heading3-bold">Order View</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>
          {"~"}
          <Link className="text-blue hover:underline" href={"/orders"}>
            Orders{" "}
          </Link>{" "}
          ~ Order View
        </p>
      </div>
      <div className="px-6 py-5 bg-white hover_card">
        <div className="flex flex-col items-center flex-1 gap-3">
          <p className="font-bold text-heading2-semibold">
            FACTURE #{order.id}
          </p>
        </div>

        <div className="flex items-center justify-between flex-1 py-3">
          <div className="mr-4 text-left order-info">
            <p className="font-bold text-md">Order Received</p>
            <p className="text-md">Office 25/B, Road 30, West Jalkuri,</p>
            <p className="text-md">Fatullah, Narayanganj 1265.</p>
            <p className="text-md">+8801838288389.</p>
            <p className="text-blue-500 text-md">support@miron.com</p>
          </div>

          <div className="text-right shipment-info">
            <p className="font-bold text-md">Shipment Details</p>
            <p className="text-md">House 17/A, Road 09, West Jalkuri,</p>
            <p className="text-md">Fatullah, Narayanganj 1265.</p>
            <p className="text-md">{order.phone}</p>
            <p className="text-blue-500 text-md">support@miron.com</p>
          </div>
        </div>

        {/** order items table display */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="table-cell">UID</th>
              <th className="table-cell">PRODUCT</th>
              <th className="table-cell">PRICE</th>
              <th className="table-cell">DISCOUNT</th>
              <th className="table-cell">QUANTITY</th>
              <th className="table-cell">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item: OrderItem, idx: number) => {
              return (
                <tr key={`product_${item.id}_order_${idx}`}>
                  <td className="table-cell">#{idx + 1}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <Image
                        style={{
                          borderRadius: "10px",
                          objectFit: "contain",
                        }}
                        alt="product"
                        width={40}
                        height={40}
                        src={"/uploads/products/1693517397312_BEAR_2.jpg"}
                      />
                      {item.product.name}
                    </div>
                  </td>
                  <td className="table-cell">{item.product.price} DT</td>
                  <td className="table-cell">20 %</td>
                  <td className="table-cell">5</td>
                  <td className="table-cell">{item.product.price * 2} DT</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/** total display */}

        <div className="flex flex-col items-end">
          <div
            style={{
              display: "grid",
              paddingTop: 10,
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <p>Subtotal </p>
            <p> :</p>
            <p>$2,749.00</p>
          </div>
          <div
            style={{
              display: "grid",
              paddingTop: 10,
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <p>Discount </p>
            <p> :</p>
            <p>$2,749.00</p>
          </div>
          <div
            style={{
              display: "grid",
              paddingTop: 10,
              paddingBottom: 10,
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <p>Shipping </p>
            <p> :</p>
            <p>$2,749.00</p>
          </div>
          <div className="w-1/4">
            <Separator />
          </div>
          <div
            style={{
              display: "grid",
              paddingTop: 10,
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <p>Total </p>
            <p> :</p>
            <p className=" text-body-semibold">{order.totalOrderPrice} DT</p>
          </div>
        </div>

        {/** footer */}
        <div className="py-4">
          <Separator />

          <p className="py-2">
            We appreciate your business and hope that you are satisfied with
            your purchase. {"\n"}
            If you are not completely satisfied with your order, please do not
            hesitate to contact us via phone or email. We are committed to
            resolving any issues you may have.{"\n"}
            Thank you again for choosing our app. We look forward to serving you
            in the future.{"\n"}
          </p>
          <p> Best regards,</p>
          <p className="font-bold"> BIBO SOLUTIONS</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
