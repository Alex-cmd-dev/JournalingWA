import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Layout() {
  return (
    <>
      <header className="border-b border-[var(--color-border)] py-4">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Reflect<span style={{ color: "var(--color-primary)" }}>.ai</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="hover:text-[var(--color-primary)]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/journal"
                  className="hover:text-[var(--color-primary)]"
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  to="/counselor"
                  className="hover:text-[var(--color-primary)]"
                >
                  AI Counselor
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/logout">
              <Button variant="outline" size="sm">
                Log out
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-[var(--color-border)] py-6 mt-12">
        <div className="max-w-[1200px] mx-auto px-4 text-center text-[var(--color-muted-foreground)]">
          <p>
            © {new Date().getFullYear()} Reflect.ai - Your AI Journaling
            Companion
          </p>
        </div>
      </footer>
    </>
  );
}
