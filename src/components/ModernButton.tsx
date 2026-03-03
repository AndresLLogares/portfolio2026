// import React from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

export interface ModernButtonProps {
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export const ModernButton = ({ children, onClick, isActive }: ModernButtonProps) => (
  <StyledButton onClick={onClick} type="button" $isActive={isActive}>
    <span>{children}</span>
  </StyledButton>
);

const StyledButton = styled.button<{ $isActive?: boolean }>`
  border: 4px solid ${props => props.$isActive ? '#fefcfe' : '#00d4ff'};
  width: 300px;
  margin-bottom: 16px;
  padding: 16px 24px;
  position: relative;
  background-color: ${props => props.$isActive ? '#fefcfe' : 'transparent'};
  cursor: pointer;
  overflow: hidden;
  box-shadow: ${props => props.$isActive
    ? '0 4px 12px rgba(0, 0, 0, 0.3)'
    : '0 2px 8px rgba(0, 0, 0, 0.2)'};
  transition: all 0.3s ease;

  span {
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.$isActive ? '#000' : '#353535'};
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
    background-color: ${props => props.$isActive ? 'transparent' : '#fefcfe'};
    content: "";
    z-index: 0;
    transition: transform 0.2s ease-in, width 0.2s ease-out 0.2s;
  }

  &:hover::after {
    transform: ${props => props.$isActive ? 'none' : 'translate(-10px, -10px)'};
    width: ${props => props.$isActive ? '100%' : 'calc(100% - 10px)'};
  }

  &:active::after {
    width: 100%;
  }
`;
