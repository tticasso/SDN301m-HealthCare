import { notification } from "antd";
import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:9999",
    headers: {
      "Content-Type": "application/json",
    },
  });