"use client";
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import DescriptionComponent from "component/ShoppingBasket/EmptyCart";
import Image from "next/image";
import plusIcon from "../../../../public/img/plusIcon.jpeg";
import minusIcon from "../../../../public/img/minusIcon.jpeg";
import HeaderComponent from "component/common/Header";
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
    font-size: 1.7vw;
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
    display: flex;
    background-color: #fafafa;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 15px;
    text-align: center;
    th {
      display: table-footer-group;
    }
  `,
  Price: styled.span`
    font-size: 1.3vw;
    line-height: 1;
    font-weight: 600;
  `,
  OriPrice: styled.del`
    margin-top: 8px;
    color: #666;
    font-size: 1.1vw;
    font-weight: 500;
    line-height: 1;
    text-decoration: line-through;
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
  footContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    text-align: center;
    border-bottom: 0;
    padding: 3px;
    flex-wrap: nowrap;
  `,
  text: styled.span`
    margin-right: 10px;
    font-weight: 400;
    font-size: 1.2vw;
    flex-wrap: nowrap;
  `,
  boldText: styled.span`
    font-size: 1.6vw;
    font-weight: 600;
    width: 8vw;
    flex-shrink: 0;
    text-align: end;
    flex-wrap: nowrap;
  `,
  text2: styled.span`
    color: #888;
    font-size: 1vw;
    font-weight: 400;
    padding-left: 3px;
  `,
  symbol: styled.span`
    padding: 0px 30px;
    font-size: 2rem;
    color: #b5b5b5;
  `,
  tablist: styled.div`
    display: flex;
    flex-direction: column;
  `,
  tabListText: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  DeliveryContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0px 10px;
  `,
  progressBarContainer: styled.div`
    width: 300px;
    height: 20px;
    border: 1px solid #ccc;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-basis: start;
    border-radius: 10px;
    background-color: #fdecd9;
  `,
  progress: styled.div<{ width: number }>`
    height: 100%;
    background-color: #ff6500;
    width: calc(100% - ${(props) => props.width}%);
    transition: width 0.3s ease-in-out;
  `,
};
const THE_DELIVERY_CHARGE = 3000;

export default function ShoppingBasket() {
  const [cartList, setCartList] = useState<CartType[] | null>(null);

  useEffect(() => {
    const preCartList = localStorage.getItem("cartList");
    if (preCartList) {
      setCartList(JSON.parse(preCartList));
    }
  }, []);

  const updateCartList = (newCartList: CartType[]): void => {
    setCartList(newCartList);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
  };

  const changeCount = (id: string, add: number) => {
    const newCartList =
      cartList &&
      cartList.map((item) => {
        if (item.id == id) {
          return { ...item, count: item.count + add };
        }
        return item;
      });
    if (newCartList) {
      updateCartList(newCartList);
    }
  };

  const totalCost = useMemo(() => {
    return (
      (cartList &&
        cartList.reduce((acc, item) => acc + item.price * item.count, 0)) ||
      0
    );
  }, [cartList]);

  return (
    <S.container>
      <HeaderComponent />
      <S.title>장바구니</S.title>
      <S.pageNav> {"Home > 장바구니"}</S.pageNav>
      {!cartList || cartList.length == 0 ? (
        <DescriptionComponent description="장바구니가 비어 있습니다."></DescriptionComponent>
      ) : (
        <S.table>
          <S.caption>
            <S.tabListText>
              <S.boldText>일반배송</S.boldText>
              <S.DeliveryContainer>
                {totalCost < 30000 ? (
                  <S.text2>{30000 - totalCost} 추가시 무료배송</S.text2>
                ) : (
                  <S.text2>무료배송</S.text2>
                )}
                <S.progressBarContainer>
                  <S.progress width={80} />
                </S.progressBarContainer>
              </S.DeliveryContainer>
            </S.tabListText>
          </S.caption>
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
                    <S.OriPrice>{item.oriPrice}원</S.OriPrice>
                  </S.priceContainer>
                </S.th>
                <S.th>
                  <S.countContainer>
                    <S.countButton onClick={() => changeCount(item.id, -1)}>
                      <Image
                        src={minusIcon}
                        width={24}
                        alt={"수량감소"}
                        style={{ borderRight: `1px solid #eee` }}
                      ></Image>
                    </S.countButton>
                    <S.count>{item.count}</S.count>
                    <S.countButton onClick={() => changeCount(item.id, 1)}>
                      <Image src={plusIcon} width={24} alt={"수량증가"}></Image>
                    </S.countButton>
                  </S.countContainer>
                </S.th>
                <S.th>{item.price * item.count}원</S.th>
              </S.tr>
            ))}
          </S.tbody>

          <S.tfoot>
            <S.th colspan={4}>
              <S.footContainer>
                <S.text>총 금액</S.text>
                <S.boldText>{totalCost}원</S.boldText>
                <S.symbol>+</S.symbol>
                <S.text>배송비</S.text>
                <S.boldText>
                  {totalCost >= 30000 ? 0 : THE_DELIVERY_CHARGE}원
                </S.boldText>
                <S.text2>{"(3만원이상 구매시 무료배송)"}</S.text2>
                <S.symbol>=</S.symbol>
                <S.text>결제 금액</S.text>
                <S.boldText>
                  {totalCost + (totalCost >= 30000 ? 0 : THE_DELIVERY_CHARGE)}원
                </S.boldText>
              </S.footContainer>
            </S.th>
          </S.tfoot>
        </S.table>
      )}
    </S.container>
  );
}
