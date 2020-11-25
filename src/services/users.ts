import api from "./api";

interface addreess {
  complement: string;
  country: string;
  number: number;
  state: string;
  street: string;
  zipcode: number;
}

export async function address(): Promise<any> {
  return api.get("/users").then((res) => {
    return res.data;
  });
}

export async function ppk(data: any): Promise<any> {
  return api.post("/pepekao", { ...data }).then(function (resolve) {
    const response = { data: resolve.data, status: resolve.status };
    console.log(resolve);
    return response;
  });
}
