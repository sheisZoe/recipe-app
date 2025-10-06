import { getFilterData, getProducts } from "@/actions/product";
import { Product } from "@/components/product";
import { Filter } from "@/components/recipes/filter";
import { MobileFilter } from "@/components/recipes/mobile-filter";
import Footer from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { normalizeFilters } from "@/lib/utils";

interface Props {
  searchParams: Promise<FilterItemsProps>;
}

export default async function Recipies({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getProducts(normalizeFilters(params));
  const filterDataPromise = getFilterData();
  return (
    <div className="flex flex-col gap-6 py-8 px-4 mx-auto max-w-[1500px]">
      <Header />
      <div className="flex justify-between items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Recipies</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    <MobileFilter  params={params} filterDataPromise={filterDataPromise} />
      </div>
      <div className="flex gap-4 relative">
        <Filter params={params} filterDataPromise={filterDataPromise} />
        <div className="flex-1 grid h-fit grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((p, i) => (
            <Product key={i} data={p} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
