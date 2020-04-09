import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

export async function getStaticProps() {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL);

  const { products } = await graphcms.request(
    `{
    products {
      slug
      name
    }
  }`
  );

  return {
    props: {
      products,
    },
  };
}

export default ({ products }) =>
  products.map(({ slug, name }) => (
    <Link key={slug} href={`/products/${slug}`}>
      <a>{name}</a>
    </Link>
  ));
