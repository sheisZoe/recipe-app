"use client";

import React, { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ProductFormInput, ProductFormSchema } from "@/lib/validators/product";
import { toast } from "sonner";
import { createProduct } from "@/actions/product";
import { useRouter } from "next/navigation";
import { ProductGeneralInfo } from "./general";
import { ProductAdditionalInfo } from "./additional";
import { ProductEditHeader } from "./header";

interface NewProductProps {}

const NewProduct = ({}: NewProductProps) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      images: [],
    },
  });
  const [state, dispatch] = useActionState(createProduct, undefined);

  async function handleSubmit(data: ProductFormInput) {
    setLoading(true);
    React.startTransition(() => {
      dispatch(data);
    });
  }

  useEffect(() => {
    if (state?.fieldError) {
      setLoading(false);
    }
    if (state?.formError) {
      setLoading(false);
      toast.error(state.formError);
    }
    if (state?.data) {
      setLoading(false);
      toast.success("Product created successfully");
      return router.push(`/recipies`);
    }
  }, [state?.fieldError, state?.formError, state?.data]);
  useEffect(() => {
    form.reset();
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-8"
      >
        <ProductEditHeader loading={loading} />
        <div className="flex flex-col gap-4">
          <ProductGeneralInfo form={form} />
          <ProductAdditionalInfo form={form} />
        </div>
      </form>
    </Form>
  );
};

export default NewProduct;
