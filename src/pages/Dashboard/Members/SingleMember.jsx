import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import icons from "~/assets/js/icons";
import BackButton from "~/components/Global/BackButton/BackButton";
import Button from "~/components/Global/Button/Button";
import ConfirmationModal from "~/components/Global/ConfirmationModal/ConfirmationModal";
import StatusChip from "~/components/Global/StatusChip/StatusChip";
import Table from "~/components/Global/Table/Table";
import { useDeleteMemberByIdMutation, useGetMemberByIdQuery } from "~/redux/api/membersApi";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";

const SingleMember = () => {
  const { membershipId } = useParams();
  const navigate = useNavigate();
  const { data: member } = useGetMemberByIdQuery(membershipId, { skip: !membershipId });
  console.log("Member", member);
  const [deleteMember, { isLoading: isDeleting }] = useDeleteMemberByIdMutation();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    deleteMember(membershipId)
      .unwrap()
      .then(() => {
        navigate("/members");
        toast.success("Members has been DELETED successfully");
      });
  };

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

  const DETAILS = useMemo(
    () => ({
      membershipId: member?.membershipId,
      firstName: member?.firstName,
      middleName: member?.middleName,
      lastName: member?.lastName,
      role: member?.role,
      email: member?.email,
      phone: member?.phone,
      gender: member?.gender,
      region: member?.region,
      ...(member?.role === "Student"
        ? { admissionYear: member?.admissionYear, yearOfStudy: member?.yearOfStudy }
        : { specialty: member?.specialty, licenseNumber: member?.licenseNumber }),
      accountStatus: member?.emailVerified ? "Verified" : "Unverified",
      memberSince: formatDate(member?.createdAt).dateTime,
    }),
    [member]
  );

  return (
    <div>
      <div className="flex justify-between gap-4">
        <BackButton label="Back to Members List" to="/members" />
        <Button variant="outlined" label="Remove" onClick={() => setOpenDelete(true)} />
      </div>

      <div className="flex gap-8 mt-8">
        <section className="bg-white-shadow rounded-xl w-full lg:w-2/5">
          <div className="flex justify-center">
            <span className="size-24 bg-onPrimary rounded-full inline-flex items-center justify-center text-6xl text-primary">
              {icons.person}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {Object.entries(DETAILS).map(([key, value]) => (
              <div key={key}>
                <h5 className="text-gray-600 uppercase text-xs font-semibold mb-1">{convertToCapitalizedWords(key)}</h5>
                <p className="text-sm font-medium">{value || "N/A"}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white shadow rounded-xl w-full pt-6 lg:w-3/5">
          <div className="flex items-center justify-between gap-6 px-6 pb-6">
            <h3 className="font-bold text-base">Training Records</h3>
          </div>
          <Table tableData={[]} tableColumns={formattedColumns} />
        </section>
      </div>

      {/*  */}
      <ConfirmationModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        subAction={() => setOpenDelete(false)}
        mainAction={handleDelete}
        mainActionLoading={isDeleting}
        title="Delete Member"
        subtitle="Are you sure you want to delete this member?"
      />
    </div>
  );
};

export default SingleMember;
