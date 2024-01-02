"use client";
import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import cartIcon from "../public/img/cartIcon.png";
interface ItemComponentProps {
  id: string;
  imgUrl: string;
  itemTitle: string;
  itemSubtitle: string;
  price: number;
  sale: number;
  option: string;
  onHover: boolean;
  saveItem: (id: string) => void;
}
interface OptionProps {
  option: string;
}

const S = {
  container: styled.div`
    flex-shrink: 0;
    padding-top: 20px;
    padding-bottom: 18px;
    width: 100%;
    position: relative;
  `,

  li: styled.h1`
    margin-bottom: 10px;
    color: #000;
    font-size: 32px;
    font-weight: 600;
  `,
  itemTitle: styled.p`
    font-size: 17px;
    font-weight: 400;
  `,
  itemSubTitle: styled.p`
    margin-top: 2px;
    color: #888;
    font-size: 14px;
  `,
  imgContainer: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  PriceContainer: styled.div`
    margin-top: 10px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  `,
  Price: styled.span`
    font-size: 26px;
    line-height: 1;
    font-weight: 600;
  `,
  OriPrice: styled.del`
    margin-left: 3px;
    color: #666;
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
    text-decoration: line-through;
  `,
  sale: styled.em`
    margin-left: 3px;
    color: #ff6500;
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
  `,
  option: styled.span<OptionProps>`
    font-size: 14px;
    color: #666;

    ${(props) =>
      props.option === "냉장" &&
      css`
        color: #3fc2ec;
      `}

    ${(props) =>
      props.option === "냉동" &&
      css`
        color: #448ccb;
      `}
  `,
};

const ItemComponent: React.FC<ItemComponentProps> = ({
  id,
  imgUrl,
  itemTitle,
  itemSubtitle,
  price,
  sale,
  option,
  onHover,
  saveItem,
}) => {
  const discountedPrice: number =
    Math.round((price - price * (sale / 100)) / 10) * 10;

  return (
    <S.container>
      <S.li>{id}</S.li>
      <S.imgContainer>
        <Image
          fill
          src={imgUrl}
          alt={itemTitle}
          style={{ border: "1px solid #eee" }}
        />
        {onHover && (
          <Image
            src={cartIcon}
            alt="cartIcon"
            width={100}
            height={45}
            style={{
              position: "absolute",
              left: 40,
              bottom: 20,
              zIndex: 2,
            }}
            onClick={() => saveItem(id)}
          />
        )}
      </S.imgContainer>
      <S.itemTitle>{itemTitle}</S.itemTitle>
      <S.itemSubTitle>{itemSubtitle}</S.itemSubTitle>
      <S.PriceContainer>
        <S.Price>{discountedPrice}원</S.Price>
        {sale > 0 && <S.OriPrice>{price}원</S.OriPrice>}
        {sale > 0 && <S.sale>{sale}%</S.sale>}
      </S.PriceContainer>
      <S.option option={option}>{option}</S.option>
    </S.container>
  );
};
export default ItemComponent;
