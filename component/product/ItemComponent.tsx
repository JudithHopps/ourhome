"use client";
import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import cartIcon from "../../public/img/cartIcon.png";
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
    width: 10rem;
    height: 180%;
    position: relative;
  `,

  li: styled.h1`
    margin-bottom: 10px;
    color: #000;
    font-size: 2rem;
    font-weight: 600;
  `,
  itemTitle: styled.p`
    font-size: 1.1rem;
    font-weight: 400;
    max-height: 1.4rem;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 2px;
  `,
  itemSubTitle: styled.p`
    display: block;
    margin-top: 2px;
    color: #888;
    width: 100%;
    max-height: 1rem;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  imgContainer: styled.div`
    position: relative;
    width: 10rem;
    height: 10rem;
  `,
  PriceContainer: styled.div`
    margin-top: 10px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  `,
  Price: styled.span`
    font-size: 1rem;
    line-height: 1;
    font-weight: 600;
  `,
  OriPrice: styled.del`
    margin-left: 3px;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1;
    text-decoration: line-through;
  `,
  sale: styled.em`
    margin-left: 3px;
    color: #ff6500;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1;
  `,
  option: styled.span<OptionProps>`
    font-size: 0.8rem;
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
            width={120}
            height={45}
            style={{
              position: "absolute",
              left: 25,
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
