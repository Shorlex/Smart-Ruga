import HomePageImage from "../components/home/HomePageImage";
import Form from "./Form";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


function page() {
  

  return (
    <div className="min-h-screen flex p-3">
      {/* ── Left: Image panel ──────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative rounded-r-3xl overflow-hidden">
        <HomePageImage />
      </div>

      {/* ── Right: Contact form ────────────────────────────────────────── */}
      <Form />
    </div>
  );
}

export default page