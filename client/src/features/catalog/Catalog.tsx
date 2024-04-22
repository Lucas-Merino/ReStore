import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import ProductList from './ProductList';
import { useEffect } from 'react';
import { fetchProductsAsync, productSelectors } from './catalogSlice';


const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch])
  
  if(status.includes('pendingFetchProducts')) return <LoadingComponent message='Loading products...'/>
  
  return (
    <>
      <ProductList products={products}/>
    </>
  )
}

export default Catalog

