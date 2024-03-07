import { useSelector } from "react-redux";

const DashboardHomePage = () => {
  const user = useSelector((state) => state.auth.user);

  const fullName = user ? user.firstName + " " + user?.middleName + " " + user?.lastName : "No Name";

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary mb-1">
        Welcome, <span className="text-black">{fullName}</span>
      </h2>
      <p>You have no upcoming events</p>

      <section className="bg-secondary/90 text-white rounded-2xl p-6 my-6">
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-bold">Verse of the Day</h3>
          <p className="text-sm my-4 font-semibold">
            For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish
            but have eternal life.
          </p>
          <span className="text-sm">John 3: 15 KJV</span>
        </div>
      </section>
    </div>
  );
};

export default DashboardHomePage;
