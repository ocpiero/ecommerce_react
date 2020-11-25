import api from "./api";

interface Response {
  data: {
    token: string;
    user: {
      name: string;
      email: string;
    };
  };
  status: number;
}

export function signIn(data: {
  email: string;
  password: string;
}): Promise<Response> {
  return api
    .post("/login", {
      email: data.email,
      password: data.password,
    })
    .then(function (resolve) {
      const response = { data: resolve.data, status: resolve.status };
      return response;
    });
}

export function signOut() {
  return api.post("logout");
}
