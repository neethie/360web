import ProductCard from "@/components/product/ProductCard";

export default function ShowProducts({ products }) {
    return products.data.map((product) => (
        <ProductCard key={product.product_id} product={product} />
    ));
}
