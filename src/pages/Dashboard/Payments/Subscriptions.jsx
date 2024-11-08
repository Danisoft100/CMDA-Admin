import { useMemo, useState } from "react";
import icons from "~/assets/js/icons";
import MembersFilterModal from "~/components/Dashboard/Members/MembersFilterModal";
import Button from "~/components/Global/Button/Button";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import SearchBar from "~/components/Global/SearchBar/SearchBar";
import Table from "~/components/Global/Table/Table";
import {
  useExportSubscriptionsMutation,
  useGetAllSubscriptionsQuery,
  useGetSubscriptionStatsQuery,
} from "~/redux/api/subscriptionsApi";
import { classNames } from "~/utilities/classNames";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import { downloadFile } from "~/utilities/fileDownloader";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const Subscriptions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const { data: subscriptions, isLoading } = useGetAllSubscriptionsQuery({
    page: currentPage,
    limit: perPage,
    searchBy,
    role,
    region,
  });
  const { data: stats } = useGetSubscriptionStatsQuery();

  const subscriptionStats = useMemo(
    () => ({
      totalSubscribers: stats?.totalSubscribers,
      activeSubscribers: stats?.activeSubscribers,
      inactiveSubscribers: stats?.inActiveSubscribers,
      todaySubscribers: stats?.todaySubscribers,
    }),
    [stats]
  );

  const COLUMNS = [
    { header: "Reference", accessor: "reference" },
    { header: "Source", accessor: "source" },
    { header: "Amount", accessor: "amount" },
    { header: "Subscriber", accessor: "user.fullName" },
    { header: "Role", accessor: "user.role" },
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
      ) : col.accessor === "user.role" ? (
        <span
          className={classNames(
            "capitalize px-4 py-2 rounded text-xs font-medium",
            item.user.role === "Student"
              ? "bg-onPrimaryContainer text-primary"
              : item.user.role === "Doctor"
                ? "bg-onSecondaryContainer text-secondary"
                : "bg-onTertiaryContainer text-tertiary"
          )}
        >
          {item.user.role}
        </span>
      ) : col.accessor === "createdAt" ? (
        formatDate(value).dateTime
      ) : col.accessor === "user.fullName" ? (
        <span>
          <b className="font-semibold">{item.user.fullName}</b>
          <br />
          {item.user.region}
        </span>
      ) : col.accessor === "amount" ? (
        formatCurrency(value, item.currency)
      ) : (
        value || "--"
      );
    },
    enableSorting: false,
  }));

  const [exportSubscriptions, { isLoading: isExporting }] = useExportSubscriptionsMutation();

  const handleExport = async () => {
    const callback = (result) => {
      downloadFile(result.data, "Subscriptions.csv");
    };
    exportSubscriptions({ callback });
  };

  return (
    <div>
      <PageHeader title="Subscription" subtitle="Manage all annual subscriptions" />

      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {Object.entries(subscriptionStats).map(([key, value]) => (
          <div key={key} className="p-4 bg-white border rounded-xl">
            <h4 className="uppercase text-xs font-medium text-gray mb-3">{convertToCapitalizedWords(key)}</h4>
            <p className="font-bold text-lg">{(key.includes("Amount") ? formatCurrency(value) : value) || 0}</p>
          </div>
        ))}
      </div>

      <section className="bg-white shadow rounded-xl pt-6 mt-8">
        <div className="flex items-center justify-between gap-6 px-6 pb-6">
          <h3 className="font-bold text-base">All Subscriptions</h3>
          <div className="flex justify-end items-end gap-4 mb-4">
            <Button label="Export" loading={isExporting} className="ml-auto" onClick={handleExport} />
            <Button
              label="Filter"
              className="ml-auto"
              onClick={() => setOpenFilter(true)}
              icon={icons.filter}
              variant="outlined"
            />
            <SearchBar
              onSearch={(v) => {
                setSearchBy(v);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <Table
          tableData={subscriptions?.items || []}
          tableColumns={formattedColumns}
          serverSidePagination
          onPaginationChange={({ perPage, currentPage }) => {
            setPerPage(perPage);
            setCurrentPage(currentPage);
          }}
          totalItemsCount={subscriptions?.meta?.totalItems}
          totalPageCount={subscriptions?.meta?.totalPages}
          loading={isLoading}
        />
      </section>

      {/*  */}
      <MembersFilterModal
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
        onSubmit={({ role, region }) => {
          setRole(role);
          setRegion(region);
          setCurrentPage(1);
          setOpenFilter(false);
        }}
      />
    </div>
  );
};

export default Subscriptions;
