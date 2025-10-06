import { getHomeProducts } from "@/actions/home";
import { Explore } from "@/components/home/explore";
import { Featured } from "@/components/home/featured";
import { Hero } from "@/components/home/hero";
import { Trending } from "@/components/home/trending";
import Footer from "@/components/shared/footer";

export default async function Home() {
  const data = await getHomeProducts();
  return (
    <div className="flex flex-col gap-8 md:gap-16 md:pb-16 mx-auto max-w-[1500px]">
      <Hero />
      <Trending trending={data.trending} />
      <Featured featured={data.featured} />
      <Explore />
      <Footer />
    </div>
  );
}
