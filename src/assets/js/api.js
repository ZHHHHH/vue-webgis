import axios from "axios";

export function getMapConfig() {
  const url = "static/config/config.json";
  const data = "";
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}
