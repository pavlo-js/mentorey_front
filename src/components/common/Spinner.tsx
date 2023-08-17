import React from "react";
import HashLoader from "react-spinners/HashLoader";
import styled from "@emotion/styled";
const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const SpinerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #edfff4;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

export default function Spinner({ title }: { title: string }) {
  return (
    <>
      <SpinerContainer>
        <div>
          <HashLoader
            color="#16a34a"
            loading={true}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="mt-4 text-center text-2xl font-bold text-primary-600">
            {title}
          </p>
          <p className="mt-1 text-center text-primary-600">
            Let us share everything we are good at.
          </p>
        </div>
      </SpinerContainer>
    </>
  );
}
