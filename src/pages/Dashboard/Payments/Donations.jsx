import { useMemo, useState } from "react";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import SearchBar from "~/components/Global/SearchBar/SearchBar";
import Table from "~/components/Global/Table/Table";
import { useGetAllDonationsQuery, useGetDonationStatsQuery } from "~/redux/api/donationsApi";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const Donations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState("");
  const { data: donations, isLoading } = useGetAllDonationsQuery({ page: currentPage, limit: perPage, searchBy });
  const { data: stats } = useGetDonationStatsQuery();

  const donationStats = useMemo(
    () => ({
      totalAmount: stats?.totalDonationAmount,
      totalCount: stats?.totalDonationCount,
      todayAmount: stats?.todayDonationAmount,
      todayCount: stats?.todayDonationCount,
    }),
    [stats]
  );

  const COLUMNS = [
    { header: "Reference", accessor: "reference" },
    { header: "Amount", accessor: "amount" },
    { header: "Donor", accessor: "user.fullName" },
    { header: "Recurring", accessor: "recurring" },
    { header: "Frequency", accessor: "frequency" },
    { header: "Date/Time", accessor: "createdAt" },
  ];

  const formattedColumns = COLUMNS.map((col) => ({
    ...col,
    cell: (info) => {
      const [value, item] = [info.getValue(), info.row.original];
      return col.accessor === "recurring" ? (
        value ? (
          "Yes"
        ) : (
          "No"
        )
      ) : col.accessor === "createdAt" ? (
        formatDate(value).dateTime
      ) : col.accessor === "user.fullName" ? (
        <span>
          {item.user.fullName}
          <br />
          {item.user.email}
        </span>
      ) : col.accessor === "amount" ? (
        formatCurrency(value)
      ) : (
        value || "--"
      );
    },
    enableSorting: false,
  }));

  return (
    <div>
      <PageHeader title="Donation" subtitle="Manage all donations" />

      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {Object.entries(donationStats).map(([key, value]) => (
          <div key={key} className="p-4 bg-white border rounded-xl">
            <h4 className="uppercase text-xs font-medium text-gray mb-3">{convertToCapitalizedWords(key)}</h4>
            <p className="font-bold text-lg">{(key.includes("Amount") ? formatCurrency(value) : value) || 0}</p>
          </div>
        ))}
      </div>

      <section className="bg-white shadow rounded-xl pt-6 mt-8">
        <div className="flex items-center justify-between gap-6 px-6 pb-6">
          <h3 className="font-bold text-base">All Donations</h3>
          <SearchBar onSearch={setSearchBy} />
        </div>

        <Table
          tableData={donations?.items || []}
          tableColumns={formattedColumns}
          serverSidePagination
          onPaginationChange={({ perPage, currentPage }) => {
            setPerPage(perPage);
            setCurrentPage(currentPage);
          }}
          totalItemsCount={donations?.meta?.totalItems}
          totalPageCount={donations?.meta?.totalPages}
          loading={isLoading}
        />
      </section>
    </div>
  );
};

export default Donations;
