import { useMutation } from "@apollo/client";
import DisplayError from "../DisplayError";
import { ALL_PRODUCTS_QUERY } from "../Products";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./create-product.css";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  options,
  CREATE_PRODUCT_MUTATION,
} from "./create-product-utils";

// here is where i can set an action on the route
// and use react routers useFetcher.fetcher.Form

export default function CreateProduct() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      image: "",
      name: "Nice Shoes",
      price: 343434,
      description: "These are sick shoes",
    },
  });

  const submit = async (data: any) => {
    console.log("data", data);
    const res = await createProduct({
      variables: data,
      refetchQueries: [ALL_PRODUCTS_QUERY],
    });
    navigate(`/products/${res.data.createProduct.id}`);
  };

  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION
  );

  const UploadDropZone = () => (
    <UploadDropzone
      options={options}
      onUpdate={({ uploadedFiles }) => {
        if (uploadedFiles.length !== 0) {
          const image = uploadedFiles[0];
          const imageUrl = UrlBuilder.url({
            accountId: image.accountId,
            filePath: image.filePath,
            options: {
              transformation: "preset",
              transformationPreset: "thumbnail",
            },
          });
          setValue("image", imageUrl);
          setImageUrl(imageUrl);
        }
      }}
      width="670px"
      height="250px"
    />
  );

  return (
    <form className="create__product__form" onSubmit={handleSubmit(submit)}>
      <DisplayError error={error} />
      <div>
        {imageUrl ? (
          <img alt="product photo" src={imageUrl} />
        ) : (
          <UploadDropZone />
        )}
      </div>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Name:
          <input {...register("name")} />
        </label>
        <label htmlFor="price">
          Price:
          <input {...register("price")} />
        </label>
        <label htmlFor="description">
          Description:
          <textarea {...register("description")} />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </form>
  );
}
