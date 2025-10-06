import { Header } from "@/components/shared/header";
import NewProduct from "./component/new-product";

export default async function Page() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-16 py-4 mx-auto max-w-[1200px]">
      <Header />
      <div className="">
        <NewProduct />
      </div>
    </div>
  );
}
