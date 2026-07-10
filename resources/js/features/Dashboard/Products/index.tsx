export { default as ProductForm } from './components/ProductForm';
export { default as ProductList } from './components/ProductList';
export { default as ProductCard } from './components/ProductCard';
export { useProducts, useProduct, useCreateProduct, useUpdateProduct, useDeleteProduct } from './hooks/useProducts';
export { productsApi } from './api/products.api';
export { PRODUCTS_QUERY_KEYS, PRODUCTS_CONFIG, GENDER_OPTIONS, CATEGORY_OPTIONS } from './constants/products.constants';
export type { ProductData, ProductFormData, ProductsPageProps, ProductPageProps } from './types/products.types';