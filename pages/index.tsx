import { GetServerSideProps } from "next";
import { GetListResponse, LayoutWrapper, useTable } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import ProductCards from "@components/ProductCard";

interface IProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

type Itemprop = {
  products: GetListResponse<IProduct>;
};

const ProductList: React.FC<Itemprop> = ({ products }) => {
  const { tableQueryResult } = useTable<IProduct>({
    resource: "products",
    queryOptions: {
      initialData: products,
    },
  });

  return (
    <LayoutWrapper>
      <div className="grid grid-cols-4 gap-6 px-24 my-8">
        {tableQueryResult.data?.data.map((product, i) => {
          return (
            <ProductCards
              key={i}
              title={product.title}
              category={product.category}
              description={product.description}
              cardImage={product.image}
              price={product.price}
            />
          );
        })}
      </div>
    </LayoutWrapper>
  );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await dataProvider("https://fakestoreapi.com").getList<IProduct>(
    {
      resource: "products",
    }
  );
  return {
    props: { products: data },
  };
};
