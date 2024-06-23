import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import icons from "~/assets/js/icons";
import Button from "~/components/Global/Button/Button";
import StatusChip from "~/components/Global/StatusChip/StatusChip";
import Table from "~/components/Global/Table/Table";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const OverviewPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const STATS = useMemo(
    () => ({
      members: {
        totalMembers: "7.2k",
        totalStudents: "7.2k",
        totalDoctors: "7.2k",
        totalGlobalMembers: "7.2k",
      },
      chapters: {
        totalChapters: "7.2k",
        studentChapters: "7.2k",
        doctorChapters: "7.2k",
        globalChapters: "7.2k",
      },
    }),
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
      <h2 className="font-bold mb-6 text-lg">
        Hey {user?.fullName || "--"} -{" "}
        <span className="text-sm font-normal text-gray-dark">What is happening today?</span>
      </h2>
      <section className="flex gap-6">
        <div className="w-2/3">
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(STATS).map((key) => (
              <div key={key} className="border p-5 rounded-lg bg-white space-y-5">
                {Object.entries(STATS[key]).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <p className="text-sm">{convertToCapitalizedWords(label)}</p>
                    <p className="font-semibold text-base">{value}</p>
                  </div>
                ))}
                <Button
                  variant="outlined"
                  className="w-full"
                  label={`Go to ${key} list`}
                  onClick={() => navigate(`/${key}`)}
                />
              </div>
            ))}
          </div>

          <section className="bg-white shadow rounded-xl pt-6 mt-8">
            <div className="flex items-center justify-between gap-6 px-6 pb-6">
              <h3 className="font-bold text-base">Transactions</h3>
              <Link to="/transactions" className="font-semibold text-sm text-primary">
                Go to transactions
              </Link>
            </div>

            <Table tableData={DATA} tableColumns={formattedColumns} showPagination={false} />
          </section>
        </div>

        <div className="w-1/3 space-y-8">
          <div className="border p-5 rounded-lg bg-white space-y-5">
            <h4 className="font-semibold text-base">{"Today's Devotional"}</h4>
            <p className="text-sm">
              Those that be planted in the house of the LORD shall flourish in the courts of our God
            </p>
            <p className="text-sm text-gray">- Psalm 92:13 (KJV)</p>
            <Button variant="outlined" className="w-full" label={`Go to devotionals list`} onClick={() => {}} />
          </div>

          <div className="border p-5 rounded-lg bg-white space-y-5">
            <h4 className="font-semibold text-base">{"Today's Events"}</h4>
            <ul className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="bg-white border rounded-xl p-4 space-y-4">
                  <div>
                    <p className="text-gray-dark text-xs mb-2 truncate flex items-center gap-2">
                      <span>{icons.clockCounter}</span> 10:00 AM - 10:30AM
                    </p>
                    <h4 className="text-sm font-bold truncate">Medical Problems in West Africa</h4>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="outlined" className="w-full" label={`Go to Events list`} onClick={() => {}} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewPage;
