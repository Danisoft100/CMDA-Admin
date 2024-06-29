import Modal from "~/components/Global/Modal/Modal";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const ViewProductModal = ({ isOpen, onClose, product }) => {
  const KEYS = ["name", "slug", "description", "price", "stock", "brand", "createdAt"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details" showCloseBtn>
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {KEYS.map((key) => (
            <div key={key} className={["description", "name", "slug"].includes(key) ? "col-span-2" : "col-span-1"}>
              <h4 className="text-xs font-semibold text-gray-600 uppercase mb-1">
                {key === "stock" ? "Available Quantity" : convertToCapitalizedWords(key)}
              </h4>
              <p className={`text-sm font-medium ${key === "name" ? "capitalize" : ""}`}>
                {key === "price"
                  ? formatCurrency(product?.[key])
                  : key === "createdAt"
                    ? formatDate(product?.[key]).dateTime
                    : product?.[key]}
              </p>
            </div>
          ))}
        </div>
        <img src={product?.featuredImageUrl} alt="" className="size-40 rounded-xl" />
      </div>
    </Modal>
  );
};

export default ViewProductModal;
