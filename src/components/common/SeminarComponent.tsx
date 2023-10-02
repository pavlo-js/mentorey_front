import styled from '@emotion/styled';

export const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

export const CategoryLabel = styled.div`
  position: absolute;
  background-color: #eef0f3;
  border: 2px solid #059669;
  padding: 0px 20px;
  border-radius: 5px;
  bottom: -20px;
  left: 20px;
  p {
    font-size: 14px;
    color: #059669;
  }
`;

export const SeminarTitleContainer = styled.div`
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;
