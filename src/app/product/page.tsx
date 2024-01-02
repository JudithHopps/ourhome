"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "../../../component/ItemComponent";
import styled, { css } from "styled-components";
import { productListType } from "type/productListType";
import { fetchProductList } from "../lib/api/api";

interface CartType {
  id: string;
  count: number;
}

const S = {
  container: styled.div`
    margin: 0px 20px;
  `,
  title: styled.h1`
    font-size: 36px;
    margin: 70px 0 7px 0;
    text-align: center;
  `,
  prodFilter: styled.div`
    position:relative,
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
  `,
  total: styled.p`
    line-height: 36px;
  `,
  listCnt: styled.b`
    color: #ff6500 !important;
  `,
  side: styled.div`
    position: absolute;
    top: 0;
    right: 0;
  `,
  productListContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    // grid-template-columns: repeat(4, 1fr);

    @media (min-width: 501px) {
      width: 25%;
      object-fil: cover;
    }

    @media (max-width: 500px) {
      width: 180px;
      height: 180px;
    }
  `,
};
function ProductList() {
  const [productList, setProductList] = useState<productListType[] | null>(
    null,
  );
  const [cartList, setCartList] = useState<CartType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const localProductList = localStorage.getItem("productList");

      if (!localProductList) {
        try {
          const result = await fetchProductList();
          localStorage.setItem("productList", JSON.stringify(result));
          setProductList(result);
        } catch (error) {
          console.error("Error fetching product list:", error);
        }
      } else {
        setProductList(JSON.parse(localProductList));
      }

      const preCartList = localStorage.getItem("cartList");
      if (preCartList) {
        setCartList(JSON.parse(preCartList));
      }
    };

    fetchData();
  }, []);

  const isItemInCart = (id: string) => {
    const isItemInCart = cartList && cartList.some((item) => item.id === id);
    return isItemInCart;
  };

  const createCartList = (id: string): void => {
    const newCartList: CartType[] = [
      {
        id: id,
        count: 1,
      },
    ];
    updateCartList(newCartList);
  };

  const saveItem = (id: string): void => {
    if (cartList === null) {
      createCartList(id);
    } else if (isItemInCart(id)) {
      const newCartList = cartList.map((item) => {
        if (item.id == id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      updateCartList(newCartList);
    } else {
      const newCartList = [
        ...cartList,
        {
          id: id,
          count: 1,
        },
      ];
      updateCartList(newCartList);
    }
  };

  const updateCartList = (newCartList: CartType[]): void => {
    setCartList(newCartList);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
  };

  return (
    <S.container>
      <S.title>베스트</S.title>
      <S.prodFilter>
        <S.total>
          {"총 "}
          <S.listCnt>10</S.listCnt>
          개의 상품이 있습니다.
        </S.total>
      </S.prodFilter>
      <S.productListContainer>
        {productList &&
          productList.map((item) => (
            <ItemComponent
              key={item.id}
              id={item.id}
              itemTitle={item.itemTitle}
              imgUrl={item.imgUrl}
              itemSubtitle={item.itemSubtitle}
              price={item.price}
              sale={item.sale}
              option={item.option}
              onHover={true}
              saveItem={saveItem}
            />
          ))}
      </S.productListContainer>
    </S.container>
  );
}

export default ProductList;
