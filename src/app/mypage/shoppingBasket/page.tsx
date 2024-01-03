"use client";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { productListType } from "type/productListType";
import { fetchProductList } from "../../lib/api/api";
import DescriptionComponent from "component/ShoppingBasket/EmptyCart";
import Image from "next/image";
import plusIcon from "../../../../public/img/plusIcon.jpeg";
import minusIcon from "../../../../public/img/minusIcon.jpeg";
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
    font-size: 1.8rem;
    margin: 70px 0 7px 0;
  `,
  pageNav: styled.p`
    font-size: 14px;
    font-weight: 400;
    color: #666;
    padding: 26px 0px 16px;
  `,
  table: styled.table`
    width: 100%;
    border-collapse: collapse;
  `,
  caption: styled.caption`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #000;
  `,

  thead: styled.thead`
    border-top: 1px solid #000;
    background-color: #fafafa;
    height: 4rem;
    display: table;
    width: 100%;
    tr {
      th {
        text-align: center;
        vertical-align: middle;
      }
    }
  `,

  tr: styled.tr`
    display: grid;
    grid-template-columns: 6fr 1fr 2fr 1fr;
    padding: 10px 10px;
    text-align: center;
  `,

  th: styled.th<{ colspan?: number }>`
    padding: 13px;
    font-size: 1rem;
    // text-align: center;
    display: flex;
    align-items: center;
    ${(props) => props.colspan && `grid-column: span ${props.colspan};`}
  `,

  tbody: styled.tbody`
    border-top: 1px solid #eee;
    tr {
      border-bottom: 1px solid #eee;
    }
  `,

  tfoot: styled.tfoot`
    background-color: #fafafa; /* 바닥글 배경색 회색으로 설정 */
    display: block;
    width: 100%;
    height: 4rem;
    text-align: center;
  `,
  Price: styled.span`
    font-size: 1rem;
    line-height: 1;
    font-weight: 600;
  `,
  OriPrice: styled.del`
    margin-top: 8px;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1;
    text-decoration: line-through;
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
  tableProductDiv: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  `,
  productName: styled.p`
    padding-left: 22px;
    font-size: 16px;
    color: #000;
    font-weight: 500;
    vertical-align: middle;
  `,
  priceContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  countContainer: styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid #e0e0e0;
    align-items: center;
  `,
  countButton: styled.button`
    all: unset;
    opacity: 60%;
    cursor: pointer;
  `,
  count: styled.p`
    padding: 0 20px;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
  `,
};
export default function ShoppingBasket() {
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

  // const createCartList = (id: string): void => {
  //   const newCartList: CartType[] = [
  //     {
  //       id: id,
  //       count: 1,
  //     },
  //   ];
  //   updateCartList(newCartList);
  // };

  // const saveItem = (id: string): void => {
  //   if (cartList === null) {
  //     createCartList(id);
  //   } else if (isItemInCart(id)) {
  //     const newCartList = cartList.map((item) => {
  //       if (item.id == id) {
  //         return { ...item, count: item.count + 1 };
  //       }
  //       return item;
  //     });
  //     updateCartList(newCartList);
  //   } else {
  //     const newCartList = [
  //       ...cartList,
  //       {
  //         id: id,
  //         count: 1,
  //       },
  //     ];
  //     updateCartList(newCartList);
  //   }
  // };

  const updateCartList = (newCartList: CartType[]): void => {
    setCartList(newCartList);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
  };

  return (
    <S.container>
      <S.title>장바구니</S.title>
      <S.pageNav> {"Home > 장바구니"}</S.pageNav>
      {!cartList || cartList.length == 0 ? (
        <DescriptionComponent description="장바구니가 비어 있습니다."></DescriptionComponent>
      ) : (
        <S.table>
          <S.caption>일반배송</S.caption>
          <S.thead>
            <S.tr>
              <S.th>상품명</S.th>
              <S.th>구매가</S.th>
              <S.th>수량</S.th>
              <S.th>금액</S.th>
            </S.tr>
          </S.thead>
          <S.tbody>
            {cartList.map((item) => (
              <S.tr key={item.id}>
                <S.th>
                  <S.tableProductDiv>
                    <Image
                      src={item.imgUrl}
                      alt={item.itemTitle}
                      width={98}
                      height={98}
                      style={{ border: `1px solid #eee` }}
                    />
                    <S.productName>{item.itemTitle}</S.productName>
                  </S.tableProductDiv>
                </S.th>
                <S.th>
                  <S.priceContainer>
                    <S.Price>{item.price}원</S.Price>
                    <S.OriPrice>{item.price}원</S.OriPrice>
                  </S.priceContainer>
                </S.th>
                <S.th>
                  <S.countContainer>
                    <S.countButton>
                      <Image
                        src={minusIcon}
                        width={24}
                        alt={"수량감소"}
                        style={{ borderRight: `1px solid #eee` }}
                      ></Image>
                    </S.countButton>
                    <S.count>{item.count}</S.count>
                    <S.countButton>
                      <Image src={plusIcon} width={24} alt={"수량증가"}></Image>
                    </S.countButton>
                  </S.countContainer>
                </S.th>
                <S.th>{item.price * item.count}</S.th>
              </S.tr>
            ))}
          </S.tbody>

          <S.tfoot>
            <S.th colspan={4}> 총 금액 </S.th>
          </S.tfoot>
        </S.table>
      )}
    </S.container>
  );
}
