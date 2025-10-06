"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();
  return (
    <footer className=" sm:py-8 bg-accent border-t border-border ">
      <div className=" p-4 space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className=" flex flex-col flex-1 md:w-[40%] gap-4 md:gap-8">
            <h1 className=" text-green-500 uppercase text-2xl md:text-4xl font-bold">
              Recipy
            </h1>
            <p className="text-sm">
              We also know how difficult it is to find recipe ideas for every
              day and to buy the right ingredients in the hustle and bustle of
              everyday life
            </p>
            <div className="flex space-x-4">
              <Link
                href={"#"}
                className=" p-3 rounded-full border border-border transition-all hover:border hover:border-primary group"
              >
                <FaFacebookF className=" w-4 h-4 group-hover:text-primary" />
              </Link>
              <Link
                href={"#"}
                className=" p-3 rounded-full border border-border transition-all hover:border hover:border-primary group"
              >
                <FaTwitter className=" w-4 h-4 group-hover:text-primary" />
              </Link>
              <Link
                href={"#"}
                className=" p-3 rounded-full border border-border transition-all hover:border hover:border-primary group"
              >
                <FaInstagram className=" w-4 h-4 group-hover:text-primary" />
              </Link>
              <Link
                href={"#"}
                className=" p-3 rounded-full border border-border transition-all hover:border hover:border-primary group"
              >
                <FaLinkedinIn className=" w-4 h-4 group-hover:text-primary" />
              </Link>
            </div>
          </div>
          <div className=" flex flex-col flex-1 gap-4">
            <h3 className="text-base font-bold">Enterprise</h3>
            <ul className=" flex flex-col gap-2">
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  About Us
                </li>
              </Link>
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  Jobs
                </li>
              </Link>
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  Terms
                </li>
              </Link>
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  Contact Us
                </li>
              </Link>
            </ul>
          </div>
          <div className=" flex flex-col flex-1 gap-4">
            <h3 className="text-base font-bold">Learn</h3>
            <ul className=" flex flex-col gap-2">
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  How it works
                </li>
              </Link>
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  Become a Creator
                </li>
              </Link>
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  FAQs
                </li>
              </Link>
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  Info and Guides
                </li>
              </Link>
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  Blog
                </li>
              </Link>
              <Link href={"#"}>
                <li className="text-sm font-normal text-muted-foreground">
                  Contact
                </li>
              </Link>
            </ul>
          </div>
          <Card className=" flex flex-col flex-1 p-6">
            <div className=" flex flex-col ">
              <h3 className="text-lg md:text-2xl font-medium mb-2">
                Subscribe
              </h3>
            </div>
            <div className="flex relative">
              <Input
                type="email"
                placeholder="Email address"
                className="p-4 py-2 w-full md:w-sm h-12 rounded-full"
              />
              <span className=" absolute right-0 top-0 p-3 bg-primary rounded-full">
                <ArrowRight />
              </span>
            </div>
            <p className="text-xs">
              We love good food and are convinced that cooking with fresh
              ingredients is not only good for the body, but also for the soul.
            </p>
          </Card>
        </div>
        <div className="flex justify-between pt-8 items-center gap-6 border-t border-border">
          <div className="text-sm text-muted-foreground font-bold">
            © Recipy 2025
          </div>
          <div className="flex gap-4 md:gap-8 items-center">
            <span className="text-sm text-muted-foreground">Terms</span>
            <span className="text-sm text-muted-foreground">Privacy</span>
            <span className="text-sm text-muted-foreground">Cookies</span>
          </div>
          <span className="text-sm text-muted-foreground">Site Map</span>
        </div>
      </div>
    </footer>
  );
}
