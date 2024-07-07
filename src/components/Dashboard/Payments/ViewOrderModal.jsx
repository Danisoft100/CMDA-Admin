import { useMemo } from "react";
import Button from "~/components/Global/Button/Button";
import Loading from "~/components/Global/Loading/Loading";
import Modal from "~/components/Global/Modal/Modal";
import StatusChip from "~/components/Global/StatusChip/StatusChip";
import { useGetSingleOrderQuery } from "~/redux/api/ordersApi";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const ViewOrderModal = ({ isOpen, onClose, orderId, onUpdate }) => {
  const { data: order = {}, isLoading } = useGetSingleOrderQuery(orderId, { skip: !orderId || !isOpen });

  const DETAILS = useMemo(
    () => ({
      status: <StatusChip status={order.status} />,
      paymentReference: order.paymentReference,
      orderedOn: formatDate(order.createdAt).dateTime,
      totalAmount: formatCurrency(order.totalAmount),
      shippingContactName: order.shippingContactName,
      shippingContactPhone: order.shippingContactPhone,
      shippingContactEmail: order.shippingContactEmail,
      shippingAddress: order.shippingAddress,
    }),
    [order]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Details" showCloseBtn>
      {isLoading || !Object.keys(order).length ? (
        <div className="h-full w-full flex justify-center items-center text-primary">
          <Loading height={64} width={64} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 gap-y-3.5">
          {Object.entries(DETAILS).map(([key, value]) => (
            <div
              key={key}
              className={["shippingAddress", "shippingContactEmail"].includes(key) ? "col-span-2" : "col-span-1"}
            >
              <h4 className="text-xs font-semibold text-gray-600 uppercase mb-1">{convertToCapitalizedWords(key)}</h4>
              <p className={`text-sm font-medium`}>{value || "-"}</p>
            </div>
          ))}
          <div className={"col-span-2"}>
            <h4 className="text-xs font-semibold text-gray-600 uppercase mb-1">Products</h4>
            <div className="max-h-32 overflow-y-scroll bg-gray-50 py-2 px-1">
              <table className="table-auto text-xs w-full font-medium">
                <tbody>
                  {order.products?.map((item, v) => (
                    <tr key={v}>
                      <td className="px-2 py-1">{item?.quantity}</td>
                      <td className="px-2 py-1">X</td>
                      <td className="px-2 py-1 font-medium">{item?.product.name}</td>
                      <td className="px-2 py-1 font-medium">{formatCurrency(item.product.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={"col-span-2"}>
            <h4 className="text-xs font-semibold text-gray-600 uppercase mb-1">Order Timeline</h4>
            <div className="max-h-28 overflow-y-scroll bg-onPrimary py-2 px-1">
              <table className="table-auto text-xs w-full">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 uppercase font-bold">Created</td>
                    <td className="px-2 py-1 font-medium">Order has been created</td>
                    <td className="px-2 py-1 font-medium">{formatDate(order?.createdAt).dateTime}</td>
                  </tr>
                  {order.orderTimeline?.map((item, v) => (
                    <tr key={v}>
                      <td className="px-2 py-1 uppercase font-bold">{item?.status}</td>
                      <td className="px-2 py-1 font-medium">{item?.comment}</td>
                      <td className="px-2 py-1 font-medium">{formatDate(item?.date).dateTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={"col-span-2 flex justify-end"}>
            <Button label="Update Status" onClick={onUpdate} />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewOrderModal;
