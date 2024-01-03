"use client";
import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";

interface DescriptionComponentProps {
  description: string;
}

const S = {
  container: styled.div`
    margin-top: 40px;
    padding: 78px !important;
    text-align: center;
    background-color: #f7f7f7;
  `,

  description: styled.p`
    color: #000;
    font-size: 20px;
    font-weight: 500;
  `,
};

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  description,
}) => {
  return (
    <S.container>
      <S.description>{description}</S.description>
    </S.container>
  );
};
export default DescriptionComponent;
