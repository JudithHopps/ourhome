"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "../../../component/product/ItemComponent";
import styled, { css } from "styled-components";
import { productListType } from "type/productListType";
import { fetchProductList } from "../lib/api/api";
import HeaderComponent from "component/common/Header";
import Modal from "component/common/ModalComponent";
import Link from "next/link";
import ButtonComponent from "component/common/Button";
interface CartType {
  id: string;
  itemTitle: string;
  imgUrl: string;
  price: number;
  oriPrice: number;
  sale: number;
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
  boldText: styled.span`
    font-size: 1.6vw;
    font-weight: 600;
    width: 8vw;
    flex-shrink: 0;
    text-align: end;
    flex-wrap: nowrap;
  `,
  prodFilter: styled.div`
    width:95%;
    position:relative,
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
    max-width: 718px;
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
    max-width: 718px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-evenly;
    align-items: flex-start;
  `,
  centerContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  `,
  text2: styled.span`
    color: #888;
    font-size: 1vw;
    font-weight: 400;
    padding-left: 3px;
  `,
  text: styled.span`
    margin-right: 10px;
    font-weight: 400;
    font-size: 1.2vw;
    flex-wrap: nowrap;
  `,
  modalHeader: styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 20px;
    padding-bottom: 10px;
  `,
  margin: styled.div<{ width?: number; height?: number }>`
    ${(props) => props.width && `width : ${props.width}px;`}
    ${(props) => props.height && `height:${props.height}px;`}
  `,
  depthContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0px 3vw;
  `,
  WebViewComponent: styled.div`
    @media (max-width: 500px) {
      display: none;
    }
  `,
};

export default function ProductList() {
  const [productList, setProductList] = useState<productListType[] | null>(
    null,
  );
  const [cartList, setCartList] = useState<CartType[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const updateCartList = (newCartList: CartType[]): void => {
    setCartList(newCartList);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    setIsModalOpen(true);
  };

  const isItemInCart = (id: string) => {
    const isItemInCart = cartList && cartList.some((item) => item.id === id);
    return isItemInCart;
  };
  const getPrice = (product: productListType): number => {
    return (
      Math.round((product.price - product.price * (product.sale / 100)) / 10) *
      10
    );
  };

  const createCartList = (id: string): void => {
    const matchingProduct =
      productList && productList.find((product) => product.id === id);
    if (matchingProduct) {
      const discountedPrice: number = getPrice(matchingProduct);

      const newCartList: CartType[] = [
        {
          id: id,
          itemTitle: matchingProduct.itemTitle,
          imgUrl: matchingProduct?.imgUrl,
          price: discountedPrice,
          oriPrice: matchingProduct?.price,
          sale: matchingProduct?.sale,
          count: 1,
        },
      ];
      updateCartList(newCartList);
    }
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
      const matchingProduct =
        productList && productList.find((product) => product.id === id);
      if (matchingProduct) {
        const discountedPrice: number = getPrice(matchingProduct);

        const newCartList: CartType[] = [
          ...cartList,
          {
            id: id,
            itemTitle: matchingProduct.itemTitle,
            imgUrl: matchingProduct.imgUrl,
            price: discountedPrice,
            oriPrice: matchingProduct.price,
            sale: matchingProduct.sale,
            count: 1,
          },
        ];
        updateCartList(newCartList);
      } else {
        alert("오류가 발생하였습니다.");
      }
    }
  };

  return (
    <S.container>
      <HeaderComponent />
      <S.title>베스트</S.title>
      <S.centerContainer>
        <S.prodFilter>
          <S.total>
            {"총 "}
            <S.listCnt>20</S.listCnt>
            개의 상품이 있습니다.
          </S.total>
        </S.prodFilter>
      </S.centerContainer>
      <S.centerContainer>
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
        <S.margin height={80} />
      </S.centerContainer>
      <S.WebViewComponent>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <S.centerContainer>
              <S.modalHeader>
                <S.boldText>장바구니</S.boldText>
                <S.text onClick={() => setIsModalOpen(false)}>X</S.text>
              </S.modalHeader>
              <S.prodFilter></S.prodFilter>
              <S.margin height={25}></S.margin>
              <S.text>선택한 상품이 장바구니에 담겼습니다.</S.text>
              <S.text2>장바구니로 이동하겠습니까?</S.text2>
              <S.margin height={25}></S.margin>
              <S.depthContainer>
                <Link href="/mypage/shoppingBasket">
                  <ButtonComponent importance="low" width="12vw">
                    장바구니 확인하기
                  </ButtonComponent>
                </Link>
                <ButtonComponent
                  importance="high"
                  onClick={() => setIsModalOpen(false)}
                  width="12vw"
                >
                  계속 쇼핑하기
                </ButtonComponent>
              </S.depthContainer>
            </S.centerContainer>
          </Modal>
        )}
      </S.WebViewComponent>
    </S.container>
  );
}
