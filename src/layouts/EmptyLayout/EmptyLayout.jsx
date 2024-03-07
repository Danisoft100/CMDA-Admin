import { Outlet } from "react-router-dom";
import Button from "~/components/Global/Button/Button";
import Logo from "~/components/Global/Logo/Logo";

const EmptyLayout = () => {
  return (
    <div>
      <header className="w-full p-4 h-16">
        <nav className="max-w-screen-xl mx-auto flex items-center justify-between">
          <Logo />
          <Button variant="outlined" label="Get Started" />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default EmptyLayout;
