// import React from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

export interface ModernButtonProps {
    children: ReactNode;
    onClick?: () => void;
}

export const ModernButton = ({ children, onClick }: ModernButtonProps) => (
    <StyledButton onClick={onClick} type="button">
        <span>{children}</span>
    </StyledButton>
);

const StyledButton = styled.button`
  border: 4px solid #353535;
  width: 300px;
  margin-bottom: 16px;
  padding: 16px 24px;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;

  span {
    font-size: 15px;
    font-weight: bold;
    color: #353535;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 5px;
    position: relative;
    z-index: 1;
  }

  &::after {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 100%;
    width: 100%;
    background-color: #fefcfe;
    content: "";
    z-index: 0;
    transition: transform 0.2s ease-in, width 0.2s ease-out 0.2s;
  }

  &:hover::after {
    transform: translate(-10px, -10px);
    width: calc(100% - 10px);
  }

  &:active::after {
    width: 100%;
  }
`;
