import React from 'react';
import styled from 'styled-components';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CenterLayout({ children, style }) {
  return (
    <Center
      className="container"
      style={{ height: '100vh', width: '100%', position: 'relative', ...style }}
    >
      {children}
    </Center>
  );
}
