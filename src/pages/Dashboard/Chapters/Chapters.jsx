import { useMemo } from "react";
import StatusChip from "~/components/Global/StatusChip/StatusChip";
import Table from "~/components/Global/Table/Table";
import { classNames } from "~/utilities/classNames";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const Chapters = () => {
  const chapterStats = useMemo(
    () => [
      { label: "Total Chapters/Regions", bgClass: "bg-white", value: 50292938 },
      { label: "Student Chapters", bgClass: "bg-primary", value: 50292938 },
      { label: "Doctor Chapters", bgClass: "bg-secondary", value: 50292938 },
      { label: "Global Network Regions", bgClass: "bg-tertiary", value: 50292938 },
    ],
    []
  );

  const DATA = [
    {
      id: "WYD2313",
      createdAt: "2021-09-01T09:19:00Z",
      paidBy: "Jane Doe",
      type: "Donation",
      status: "success",
      amount: "20000",
    },
    {
      id: "WYD2314",
      createdAt: "2021-10-05T11:25:00Z",
      paidBy: "John Smith",
      type: "Subscription",
      status: "success",
      amount: "15000",
    },
    {
      id: "WYD2315",
      createdAt: "2021-11-12T14:30:00Z",
      paidBy: "Alice Johnson",
      type: "Donation",
      status: "failed",
      amount: "5000",
    },
    {
      id: "WYD2316",
      createdAt: "2022-01-20T08:45:00Z",
      paidBy: "Michael Brown",
      type: "Subscription",
      status: "success",
      amount: "30000",
    },
    {
      id: "WYD2317",
      createdAt: "2022-03-15T16:00:00Z",
      paidBy: "Emily Davis",
      type: "Donation",
      status: "pending",
      amount: "25000",
    },
    {
      id: "WYD2318",
      createdAt: "2022-05-10T10:10:00Z",
      paidBy: "David Wilson",
      type: "Subscription",
      status: "success",
      amount: "10000",
    },
    {
      id: "WYD2319",
      createdAt: "2022-07-22T13:55:00Z",
      paidBy: "Sophia Martinez",
      type: "Donation",
      status: "success",
      amount: "7000",
    },
    {
      id: "WYD2320",
      createdAt: "2022-09-09T09:30:00Z",
      paidBy: "James Anderson",
      type: "Subscription",
      status: "failed",
      amount: "12000",
    },
    {
      id: "WYD2321",
      createdAt: "2022-11-28T12:20:00Z",
      paidBy: "Isabella Thompson",
      type: "Donation",
      status: "success",
      amount: "4000",
    },
    {
      id: "WYD2322",
      createdAt: "2023-02-14T15:15:00Z",
      paidBy: "Mia Harris",
      type: "Subscription",
      status: "success",
      amount: "8000",
    },
  ];

  const COLUMNS = [
    { header: "Trans. ID", accessor: "id" },
    { header: "Status", accessor: "status" },
    { header: "Paid by", accessor: "paidBy" },
    { header: "Transaction type", accessor: "type" },
    { header: "Date", accessor: "createdAt" },
    { header: "Amount", accessor: "amount" },
  ];
  const formattedColumns = COLUMNS.map((col) => ({
    ...col,
    cell: (info) => {
      const value = info.getValue();
      return col.accessor === "status" ? (
        <StatusChip status={value} />
      ) : col.accessor === "createdAt" ? (
        formatDate(value).date
      ) : col.accessor === "amount" ? (
        formatCurrency(value)
      ) : (
        value
      );
    },
    enableSorting: false,
  }));

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Chapters</h1>

      <div className="grid grid-cols-4 gap-8">
        {chapterStats.map((stat, s) => (
          <div key={stat.label} className={classNames("p-4 border rounded-xl", stat.bgClass, s && "text-white")}>
            <h4 className="uppercase text-xs font-medium opacity-70 mb-3">{stat.label}</h4>
            <p className="font-bold text-lg">{Number(stat.value).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <section className="bg-white shadow rounded-xl pt-6 mt-8">
        <div className="flex items-center justify-between gap-6 px-6 pb-6">
          <h3 className="font-bold text-base">All Chapters</h3>
        </div>

        <Table tableData={DATA} tableColumns={formattedColumns} onRowClick={console.log} />
      </section>
    </div>
  );
};

export default Chapters;
