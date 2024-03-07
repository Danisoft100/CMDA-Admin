const PageHeader = ({ title, subtitle }) => {
  return (
    <header>
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-gray-dark">{subtitle}</p>}
    </header>
  );
};

export default PageHeader;
