import Button from "../Button/Button";

const MiniPagination = ({ currentPage, itemsPerPage, totalPages, totalItems, setCurrentPage }) => {
  return (
    <div className="flex justify-end items-center text-primary p-4 mt-1">
      <Button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
        label="Prev"
        variant="outlined"
        small
      />
      <span className="mx-2 text-sm">
        Showing <b>{currentPage > 1 ? (currentPage - 1) * itemsPerPage + 1 : currentPage}</b>
        {" -  "}
        <b>{currentPage * itemsPerPage < totalItems ? currentPage * itemsPerPage : totalItems}</b> of{" "}
        <b>{totalItems}</b>
      </span>
      <Button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === totalPages}
        label="Next"
        variant="outlined"
        small
      />
    </div>
  );
};

export default MiniPagination;
