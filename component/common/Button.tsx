import React, { ReactNode, CSSProperties } from "react";
import styled from "styled-components";

interface ButtonComponentProps {
  children: ReactNode;
  importance?: "high" | "medium" | "low";
  width?: number;
  height?: number;
  onClick?: () => void;
}

const getButtonColor = (importance?: "high" | "medium" | "low"): string => {
  switch (importance) {
    case "high":
      return "#ff6500;";
    case "medium":
      return "#ff9c00;";
    case "low":
      return "#aaa";
    default:
      return "white";
  }
};

const S = {
  ButtonComponent: styled.div<ButtonComponentProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background-color: ${(props) => getButtonColor(props.importance)};
    ${(props) => props.width && `width: ${props.width}px;`}
    ${(props) => props.height && `height: ${props.height}px;`}
    color: white;
    text-align: center;
    cursor: pointer;
  `,
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  importance,
  width,
  height,
  onClick,
}) => {
  return (
    <S.ButtonComponent
      importance={importance}
      width={width}
      height={height}
      onClick={onClick}
    >
      {children}
    </S.ButtonComponent>
  );
};

export default ButtonComponent;
