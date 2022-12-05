import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "zcoar0fk",
  dataset: "production",
  apiVersion: "2022-11-14",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_REVIEW_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source);
