import { Button, Typography } from "antd";
import styled from "styled-components";

export const BlackTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: black;
  margin: 10px 0;
`;

export const ErrorTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: black;
  margin: 10px 0;
  padding: 20px;
`;
