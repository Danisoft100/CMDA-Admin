import { useMemo, useState } from "react";
import icons from "~/assets/js/icons";
import DonationsFilterModal from "~/components/Dashboard/Payments/DonationFilterModal";
import Button from "~/components/Global/Button/Button";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import SearchBar from "~/components/Global/SearchBar/SearchBar";
import Table from "~/components/Global/Table/Table";
import {
  useExportDonationsMutation,
  useGetAllDonationsQuery,
  useGetDonationStatsQuery,
} from "~/redux/api/donationsApi";
import { classNames } from "~/utilities/classNames";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import { downloadFile } from "~/utilities/fileDownloader";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const Donations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [areasOfNeed, setAreasOfNeed] = useState("");
  const { data: donations, isLoading } = useGetAllDonationsQuery({
    page: currentPage,
    limit: perPage,
    searchBy,
    region,
    role,
    areasOfNeed,
  });
  const { data: stats = { totalDonationAmount: {} } } = useGetDonationStatsQuery();

  const donationStats = useMemo(() => {
    const obj = {
      totalDonations: stats?.totalDonationCount,
      todayCount: stats?.todayDonationCount,
    };
    Object.keys(stats?.totalDonationAmount).forEach((key) => {
      obj[key + " Donations"] = stats?.totalDonationAmount[key];
    });
    return obj;
  }, [stats]);

  const COLUMNS = [
    { header: "Reference", accessor: "reference" },
    { header: "Source", accessor: "source" },
    { header: "Amount", accessor: "amount" },
    { header: "Donor", accessor: "user.fullName" },
    { header: "Role", accessor: "user.role" },
    { header: "Vision Partner", accessor: "recurring" },
    { header: "Areas of Need", accessor: "areasOfNeed" },
    { header: "Date/Time", accessor: "createdAt" },
  ];

  const formattedColumns = COLUMNS.map((col) => ({
    ...col,
    cell: (info) => {
      const [value, item] = [info.getValue(), info.row.original];
      return col.accessor === "recurring" ? (
        value ? (
          <span>Yes / {item.frequency}</span>
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

  const [exportDonations, { isLoading: isExporting }] = useExportDonationsMutation();

  const handleExport = async () => {
    const callback = (result) => {
      downloadFile(result.data, "Donations.csv");
    };
    exportDonations({ callback });
  };

  return (
    <div>
      <PageHeader title="Donation" subtitle="Manage all donations" />

      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {Object.entries(donationStats).map(([key, value], i) => (
          <div key={key} className="p-4 bg-white border rounded-xl">
            <h4 className="uppercase text-xs font-medium text-gray mb-3">{convertToCapitalizedWords(key)}</h4>
            <p className="font-bold text-lg">{(i > 1 ? formatCurrency(value, key.split(" ")[0]) : value) || 0}</p>
          </div>
        ))}
      </div>

      <section className="bg-white shadow rounded-xl pt-6 mt-8">
        <div className="flex items-center justify-between gap-6 px-6 pb-6">
          <h3 className="font-bold text-base">All Donations</h3>
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

      {/*  */}
      <DonationsFilterModal
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
        onSubmit={({ role, region, areasOfNeed }) => {
          setRole(role);
          setRegion(region);
          setAreasOfNeed(areasOfNeed);
          setCurrentPage(1);
          setOpenFilter(false);
        }}
      />
    </div>
  );
};

export default Donations;
