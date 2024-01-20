import { UploadWidgetConfig } from "@bytescale/upload-widget";
import { gql } from "@apollo/client";
import * as z from "zod";

export const schema = z
  .object({
    image: z.string(),
    name: z.string(),
    price: z.number().positive(),
    description: z.string(),
  })
  .required();

export const options: UploadWidgetConfig = {
  apiKey: !!import.meta.env.VITE_UPLOAD_API_KEY
    ? import.meta.env.VITE_UPLOAD_API_KEY
    : "free",
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#2563EB", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#fffe", // Secondary button text
      shade300: "#fffd", // Secondary button text (hover)
      shade400: "#fffc", // Welcome text
      shade500: "#fff9", // Modal close button
      shade600: "#fff7", // Border
      shade700: "#fff2", // Progress indicator background
      shade800: "#fff1", // File item background
      shade900: "#ffff", // Various (draggable crop buttons, etc.)
    },
  },
};

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: String!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      status: "AVAILABLE"
      image: $image
    ) {
      id
      price
      description
      name
    }
  }
`;
