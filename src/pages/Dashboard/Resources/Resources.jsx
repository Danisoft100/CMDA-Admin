import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ItemCard from "~/components/Dashboard/ItemCard/ItemCard";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Modal from "~/components/Global/Modal/Modal";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import formatDate from "~/utilities/fomartDate";
import { formatCurrency } from "~/utilities/formatCurrency";

const Resources = () => {
  const productStats = useMemo(
    () => ({
      totalResources: 100292938,
      digitalResources: 50292938,
      phyicalResources: 88292938,
      otherResources: 88292938,
    }),
    []
  );

  const [openCreate, setOpenCreate] = useState(false);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });

  const onSubmit = (payload) => {
    console.log("PAYLOAD", payload);
    setOpenCreate(false);
    toast.success("Resource created successfully");
  };

  return (
    <div>
      <PageHeader
        title="Resources"
        subtitle="Manage all resources created from wordpress and youtube links"
        action={() => setOpenCreate(true)}
        actionLabel="Create Resource"
      />

      <div className="grid grid-cols-4 gap-4 mt-6">
        {Object.entries(productStats).map(([key, value]) => (
          <div key={key} className="p-4 bg-white border rounded-xl">
            <h4 className="uppercase text-xs font-medium text-gray mb-3">{convertToCapitalizedWords(key)}</h4>
            <p className="font-bold text-lg">{formatCurrency(value)}</p>
          </div>
        ))}
      </div>

      <section className="my-8">
        <div className="grid grid-cols-3 gap-6">
          {[...Array(9)].map((_, x) => (
            <ItemCard
              key={x}
              title="Lorem ipsum ssome other text i no know nothing about "
              category={"Webinar " + (x + 1)}
              dateTime={formatDate(new Date()).date}
            />
          ))}
        </div>
        <div className="flex justify-end items-center text-primary p-4 mt-1">
          <Button onClick={() => {}} disabled={false} label="Prev" variant="outlined" small />
          <span className="mx-2 text-sm">
            Showing <b>1</b> - <b>10</b> of <b>12</b>
          </span>
          <Button onClick={() => {}} disabled={false} label="Next" variant="outlined" small />
        </div>
      </section>

      {/*  */}
      <Modal isOpen={openCreate} maxWidth={400} onClose={() => setOpenCreate(false)} title="Add New Resource">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Select options={[]} label="category" control={control} errors={errors} />
          <TextInput label="sourceUrl" register={register} errors={errors} />
          <Button label="Create New Resource" large type="submit" className="w-full" />
        </form>
      </Modal>
    </div>
  );
};

export default Resources;
