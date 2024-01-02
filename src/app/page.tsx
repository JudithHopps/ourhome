import { Suspense } from "react";

export default function Page() {
  return (
    <main>
      <header>
        <h1>My Store</h1>
      </header>
      {/* <Suspense fallback={<CartSkeleton />}>
          <ShoppingCart />
        </Suspense>
      </header>
      <Banner />
      <Suspense fallback={<ProductListSkeleton />}>
        <Recommendations />
      </Suspense>
      <NewProducts /> */}
    </main>
  );
}
