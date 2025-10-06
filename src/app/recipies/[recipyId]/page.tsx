import { Header } from "@/components/shared/header";
import { getProduct, getRelatedProducts } from "@/actions/product";
import Footer from "@/components/shared/footer";
import { RecipyHero } from "@/components/recipy/hero";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { IngredientsSection } from "@/components/recipy/ingredients";
import { InstructionsSection } from "@/components/recipy/instructions";
import Related from "@/components/recipy/related";

interface Props {
  params: Promise<{
    recipyId: string;
  }>;
}

export default async function Recipy({ params }: Props) {
  const { recipyId } = await params;
  const data = await getProduct(recipyId);
  if (!data)
    return (
      <div className="flex justify-center items-center min-h-dvh">
        <p className=" text-2xl animate-bounce text-red-500">
          Recipy Not Found
        </p>
      </div>
    );
  // const relatedPromise = await getRelatedProducts(data.name);
  return (
    <div className=" flex flex-col gap-8 py-4 px-8 w-full max-w-[1500px] mx-auto">
      <Header />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/recipies">Recipies</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <RecipyHero data={data} />
      {/* Ingredients */}
      <IngredientsSection ingredients={data.ingredients} />

      {/* Instructions */}
      <InstructionsSection instructions={data.instructions} />
      {/* <Related relatedPromise={relatedPromise} /> */}
      <Footer />
    </div>
  );
}
