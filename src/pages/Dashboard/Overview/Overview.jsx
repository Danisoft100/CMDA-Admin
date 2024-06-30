import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import icons from "~/assets/js/icons";
import Button from "~/components/Global/Button/Button";
import StatusChip from "~/components/Global/StatusChip/StatusChip";
import Table from "~/components/Global/Table/Table";
import { doctorsRegionLists, globalRegionsData, studentChapterOptions } from "~/layouts/DashboardLayout/regions";
import { useGetAllDevotionalsQuery } from "~/redux/api/devotionalsApi";
import { useGetMembersStatsQuery } from "~/redux/api/membersApi";
import { classNames } from "~/utilities/classNames";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const OverviewPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: devotionals } = useGetAllDevotionalsQuery();
  const { data: memberStats } = useGetMembersStatsQuery();

  const STATS = useMemo(
    () => ({
      members: {
        totalMembers: memberStats?.totalMembers || 0,
        totalStudents: memberStats?.totalStudents || 0,
        totalDoctors: memberStats?.totalDoctors || 0,
        totalGlobalNetworks: memberStats?.totalGlobalNetworks || 0,
      },
      chapters: {
        chaptersAndRegions: "",
        total: studentChapterOptions.length + doctorsRegionLists.length + globalRegionsData.length,
        studentChapters: studentChapterOptions.length,
        doctorChapters: doctorsRegionLists.length,
        globalNetworkRegions: globalRegionsData.length,
      },
    }),
    [memberStats]
  );

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
                    <p className={label === "chaptersAndRegions" ? "font-semibold" : "text-sm"}>
                      {convertToCapitalizedWords(label)}
                    </p>
                    <p className="font-semibold text-base">{value}</p>
                  </div>
                ))}
                {key === "members" && (
                  <Button
                    variant="outlined"
                    className="w-full"
                    label={`Go to ${key} list`}
                    onClick={() => navigate(`/${key}`)}
                  />
                )}
              </div>
            ))}
          </div>

          <section className="bg-white shadow rounded-xl pt-6 mt-8">
            <div className="flex items-center justify-between gap-6 px-6 pb-6">
              <h3 className="font-bold text-base">Payments</h3>
              <Link to="/payments" className="font-semibold text-sm text-primary">
                Go to payments
              </Link>
            </div>

            <Table tableData={[]} tableColumns={formattedColumns} showPagination={false} />
          </section>
        </div>

        <div className="w-1/3 space-y-8">
          <div className="border p-5 rounded-lg bg-white space-y-5">
            <h4 className="font-semibold text-base">{"Most Recent Devotional"}</h4>
            <p className="text-sm">{devotionals?.[0].keyVerseContent}</p>
            <p className="text-sm text-gray">- {devotionals?.[0].keyVerse}</p>
            <Button
              variant="outlined"
              className="w-full"
              label={`Go to devotionals list`}
              onClick={() => navigate(`/others/devotionals`)}
            />
          </div>

          <div className="border p-5 rounded-lg bg-white space-y-5">
            <h4 className="font-semibold text-base">{"Today's Events"}</h4>
            {/* <ul className="space-y-3">
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
            <Button variant="outlined" className="w-full" label={`Go to Events list`} onClick={() => {}} /> */}
            <div className="px-6 py-10 flex justify-center">
              <div className="w-full max-w-[360px] text-center">
                <span
                  className={classNames(
                    "flex items-center justify-center text-primary text-2xl",
                    "size-14 mx-auto rounded-full bg-onPrimaryContainer"
                  )}
                >
                  {icons.file}
                </span>

                <h3 className="font-bold text-primary mb-1 text-lg mt-2">No Data Available</h3>
                <p className=" text-sm text-gray-600 mb-6">There are currently no data to display for this table</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewPage;
