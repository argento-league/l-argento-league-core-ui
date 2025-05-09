import styled from "styled-components";

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  /* sm breakpoint - 640px */
  @media (min-width: 640px) {
    max-width: 640px;
  }

  /* md breakpoint - 768px */
  @media (min-width: 768px) {
    max-width: 768px;
  }

  /* lg breakpoint - 1024px */
  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  /* xl breakpoint - 1280px */
  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  /* 2xl breakpoint - 1536px */
  @media (min-width: 1536px) {
    max-width: 1536px;
  }
`; 