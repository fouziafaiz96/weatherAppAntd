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

export const LabelTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: #545aa7;
  text-align: center;
  margin: 10px 0;
`;
export const BlueTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: #545aa7;
  text-shadow: 2px 2px #1f305e;
  margin: 10px 0;
`;
export const TempTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: white;
  margin: 15px 0;
`;

export const ErrorTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-weight: bold;
  font-size: 15px;
  color: red;
`;
export const ContainedButton = styled(Button)<{}>`
  background: #1eb287;
  border-radius: 4px;
  color: white;
  padding: 2%;
  width: 80vw;
  margin-top: 4%;
`;
