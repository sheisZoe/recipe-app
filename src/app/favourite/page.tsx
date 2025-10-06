import { getFavorites } from "@/actions/favourite";
import { Product } from "@/components/product";
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

export default async function favoriteHome() {
  const data = await getFavorites();
  return (
    <div className="py-4 px-4 flex flex-col gap-8">
      <Header />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/recipies">Recipies</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
          <BreadcrumbLink href="/favourite">Favourite</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-1 grid h-fit grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((p, i) => (
          <Product key={i} data={p.products} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
