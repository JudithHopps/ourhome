import React from "react";
import styled from "styled-components";
import ourhomeLogo from "../../public/img/logo_ourhome.png";
import Image from "next/image";
import shoppingCart from "../../public/img/shoppingCartIcon.jpeg";
import Link from "next/link";

const S = {
  HeaderComponent: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 40px 10px 0px;
  `,
};
const HeaderComponent: React.FC = ({}) => {
  return (
    <S.HeaderComponent>
      <Link href="/product">
        <Image
          src={ourhomeLogo}
          alt="Ourhome Mall"
          width={194}
          height={30}
        ></Image>
      </Link>
      <Link href="/mypage/shoppingBasket">
        <Image
          src={shoppingCart}
          alt="장바구니 아이콘"
          width={40}
          height={40}
        ></Image>
      </Link>
    </S.HeaderComponent>
  );
};

export default HeaderComponent;
