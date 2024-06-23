import { useMemo } from "react";
import icons from "~/assets/js/icons";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import StatusChip from "~/components/Global/StatusChip/StatusChip";
import Table from "~/components/Global/Table/Table";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const Products = () => {
  const productStats = useMemo(
    () => ({
      totalProducts: 100292938,
      digitalProducts: 50292938,
      phyicalProducts: 88292938,
      otherProducts: 88292938,
    }),
    []
  );

  const DATA = [
    {
      id: "WYD2313",
      createdAt: "2021-09-01T09:19:00Z",
      paidBy: "Jane Doe",
      type: "Digital",
      status: "success",
      amount: "20000",
    },
    {
      id: "WYD2314",
      createdAt: "2021-10-05T11:25:00Z",
      paidBy: "John Smith",
      type: "Physical",
      status: "success",
      amount: "15000",
    },
    {
      id: "WYD2315",
      createdAt: "2021-11-12T14:30:00Z",
      paidBy: "Alice Johnson",
      type: "Digital",
      status: "failed",
      amount: "5000",
    },
    {
      id: "WYD2316",
      createdAt: "2022-01-20T08:45:00Z",
      paidBy: "Michael Brown",
      type: "Physical",
      status: "success",
      amount: "30000",
    },
    {
      id: "WYD2317",
      createdAt: "2022-03-15T16:00:00Z",
      paidBy: "Emily Davis",
      type: "Digital",
      status: "pending",
      amount: "25000",
    },
    {
      id: "WYD2318",
      createdAt: "2022-05-10T10:10:00Z",
      paidBy: "David Wilson",
      type: "Physical",
      status: "success",
      amount: "10000",
    },
    {
      id: "WYD2319",
      createdAt: "2022-07-22T13:55:00Z",
      paidBy: "Sophia Martinez",
      type: "Digital",
      status: "success",
      amount: "7000",
    },
    {
      id: "WYD2320",
      createdAt: "2022-09-09T09:30:00Z",
      paidBy: "James Anderson",
      type: "Physical",
      status: "failed",
      amount: "12000",
    },
    {
      id: "WYD2321",
      createdAt: "2022-11-28T12:20:00Z",
      paidBy: "Isabella Thompson",
      type: "Digital",
      status: "success",
      amount: "4000",
    },
    {
      id: "WYD2322",
      createdAt: "2023-02-14T15:15:00Z",
      paidBy: "Mia Harris",
      type: "Physical",
      status: "success",
      amount: "8000",
    },
  ];

  const COLUMNS = [
    { header: "Product Name", accessor: "name" },
    { header: "Category", accessor: "type" },
    { header: "Price", accessor: "amount" },
    { header: "Date", accessor: "createdAt" },
    { header: "Status", accessor: "status" },
    { header: "", accessor: "action" },
  ];
  const formattedColumns = COLUMNS.map((col) => ({
    ...col,
    cell: (info) => {
      const [value, item] = [info.getValue(), info.row.original];
      return col.accessor === "status" ? (
        <StatusChip status={value} />
      ) : col.accessor === "name" ? (
        <div className="inline-flex gap-2 items-center">
          <span className="size-14 rounded-lg bg-onPrimaryContainer" />
          {item.id}
        </div>
      ) : col.accessor === "createdAt" ? (
        formatDate(value).date
      ) : col.accessor === "amount" ? (
        formatCurrency(value)
      ) : col.accessor === "action" ? (
        <div className="inline-flex items-center gap-3 text-gray-dark">
          <button type="button" onClick={(e) => handleAction(e, item, "edit")} className="text-sm">
            {icons.pencil}
          </button>
          <button type="button" onClick={(e) => handleAction(e, item, "delete")} className="text-lg">
            {icons.delete}
          </button>
        </div>
      ) : (
        value
      );
    },
    enableSorting: false,
  }));

  const handleAction = (evt, item, action) => {
    evt.stopPropagation();
    alert(action + " => " + item.id);
  };

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Manage all products in store"
        action={() => {}}
        actionLabel="Add Product"
      />

      <div className="grid grid-cols-4 gap-8 mt-6">
        {Object.entries(productStats).map(([key, value]) => (
          <div key={key} className="p-4 bg-white border rounded-xl">
            <h4 className="uppercase text-xs font-medium text-gray mb-3">{convertToCapitalizedWords(key)}</h4>
            <p className="font-bold text-lg">{formatCurrency(value)}</p>
          </div>
        ))}
      </div>

      <section className="bg-white shadow rounded-xl pt-6 mt-8">
        <div className="flex items-center justify-between gap-6 px-6 pb-6">
          <h3 className="font-bold text-base">All Products</h3>
        </div>

        <Table tableData={DATA} tableColumns={formattedColumns} onRowClick={console.log} />
      </section>
    </div>
  );
};

export default Products;
