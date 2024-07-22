import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import icons from "~/assets/js/icons";
import Button from "~/components/Global/Button/Button";
import FileUploader from "~/components/Global/FormElements/FileUploader/FileUploader";
import Modal from "~/components/Global/Modal/Modal";
import convertCSVtoArray from "~/utilities/convertCSVtoArray";

const UpdateCompletedUsersModal = ({ isOpen, onClose, onSubmit = console.log, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "all" });

  const [bulkValues, setBulkValues] = useState([]);

  const handlePreviewCSV = async ({ completedUsers }) => {
    if (!completedUsers?.size) {
      return toast.error("Please upload a non-empty csv file");
    }

    const csvArray = await convertCSVtoArray(completedUsers);

    const formattedCsvArray = csvArray
      .map((item) => ({ email: item.email.trim() }))
      .filter(
        (item, index, self) =>
          item.email && self.findIndex((i) => i.email.toLowerCase() === item.email.toLowerCase()) === index
      );

    setBulkValues(formattedCsvArray);
  };

  const removeItem = (item) => {
    setBulkValues((prev) => prev.filter((prevItem) => prevItem !== item));
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadTemplate = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const headers = "email\n";
      const csvContent = headers; // You can add more example rows if needed
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", "Completed_Users_template.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
    }, 2000);
  };

  useEffect(() => {
    if (!isOpen) setBulkValues([]);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Completed Users" showCloseBtn>
      {!bulkValues.length ? (
        <form onSubmit={handleSubmit(handlePreviewCSV)} className="flex flex-col gap-6">
          <div className="flex justify-end">
            <Button
              label="Download Template"
              variant="outlined"
              dense
              loading={isDownloading}
              loadingText={isDownloading ? "Downloading..." : null}
              onClick={handleDownloadTemplate}
            />
          </div>
          <FileUploader
            register={register}
            setValue={setValue}
            errors={errors}
            label="completedUsers"
            title="Upload CSV format"
            allowedTypes={["text/csv"]}
            placeholderText="Supported type: .csv"
          />
          <div className="flex justify-end gap-4">
            <Button label="Cancel" variant="outlined" onClick={onClose} />
            <Button label="Preview CSV" type="submit" />
          </div>
        </form>
      ) : (
        <div>
          <div className="overflow-y-auto overflow-x-auto max-h-80">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-600 uppercase bg-primary/10 sticky top-0 w-full">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {bulkValues.map((item, index) => (
                  <tr key={item.email + index} className="bg-white border-b">
                    <td className="px-6 py-3">{index + 1}.</td>
                    <td className="px-6 py-3">{item.email}</td>
                    <td className="px-6 py-3">
                      <button type="button" onClick={() => removeItem(item)}>
                        {icons.close}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button label="Clear All" variant="outlined" onClick={() => setBulkValues([])} />
            <Button label="Upload Users" onClick={() => onSubmit(bulkValues)} loading={loading} />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UpdateCompletedUsersModal;
