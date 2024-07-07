import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import SearchBar from "~/components/Global/SearchBar/SearchBar";
import StatusChip from "~/components/Global/StatusChip/StatusChip";
import Table from "~/components/Global/Table/Table";
import { useGetAllMembersQuery, useGetMembersStatsQuery } from "~/redux/api/membersApi";
import { classNames } from "~/utilities/classNames";
import formatDate from "~/utilities/fomartDate";

const Members = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState("");
  const { data: members, isLoading } = useGetAllMembersQuery({ limit: perPage, page: currentPage, searchBy });
  const { data: stats } = useGetMembersStatsQuery();

  const memberStats = useMemo(
    () => [
      { label: "Total Members", bgClass: "bg-white", value: stats?.totalMembers || 0 },
      { label: "Students", bgClass: "bg-primary", value: stats?.totalStudents || 0 },
      { label: "Doctors", bgClass: "bg-secondary", value: stats?.totalDoctors || 0 },
      { label: "Global Network", bgClass: "bg-tertiary", value: stats?.totalGlobalNetworks || 0 },
    ],
    [stats]
  );

  const COLUMNS = [
    { header: "ID", accessor: "membershipId" },
    { header: "Full Name", accessor: "fullName" },
    { header: "Gender", accessor: "gender" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Region/Chapter", accessor: "region" },
    { header: "Date Joined", accessor: "createdAt" },
  ];
  const formattedColumns = COLUMNS.map((col) => ({
    ...col,
    cell: (info) => {
      const [value, item] = [info.getValue(), info.row.original];
      return col.accessor === "status" ? (
        <StatusChip status={value} />
      ) : col.accessor === "createdAt" ? (
        formatDate(value).date
      ) : col.accessor === "region" ? (
        item.role === "Student" ? (
          value?.split(" - ")?.[1]
        ) : (
          value || "-"
        )
      ) : (
        value || "--"
      );
    },
    enableSorting: false,
  }));

  return (
    <div>
      <PageHeader title="Members" subtitle="Manage all students, doctors & global network members" />

      <div className="grid grid-cols-4 gap-6 mt-6">
        {memberStats.map((stat, s) => (
          <div key={stat.label} className={classNames("p-4 border rounded-xl", stat.bgClass, s && "text-white")}>
            <h4 className="uppercase text-xs font-medium opacity-70 mb-3">{stat.label}</h4>
            <p className="font-bold text-lg">{Number(stat.value).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <section className="bg-white shadow rounded-xl pt-6 mt-8">
        <div className="flex items-center justify-between gap-6 px-6 pb-6">
          <h3 className="font-bold text-base">All Members</h3>
          <SearchBar onSearch={setSearchBy} />
        </div>

        <Table
          tableData={members?.items || []}
          tableColumns={formattedColumns}
          onRowClick={(item) => navigate(`/members/${item.membershipId}`)}
          serverSidePagination
          onPaginationChange={({ perPage, currentPage }) => {
            setPerPage(perPage);
            setCurrentPage(currentPage);
          }}
          totalItemsCount={members?.meta?.totalItems}
          totalPageCount={members?.meta?.totalPages}
          loading={isLoading}
        />
      </section>
    </div>
  );
};

export default Members;
