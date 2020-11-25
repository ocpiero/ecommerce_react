import api from "./api";

interface Link {
  link: string;
}

export async function pegaProdutoPorPagina(pagina = 1) {
  return await api.get(`/produtos?pagina=${pagina}`).then((res) => {
    async function showResponse(res: any) {
      const blz = await res;
      return blz;
    }

    const response = showResponse(res.data);
    return response;
  });
}

export async function pegaProdutoPorCategoria(categoria: any) {
  return await api.get(`/categorias/${categoria}/produtos`).then((res) => {
    async function showResponse(res: any) {
      return await res;
    }

    const response = showResponse(res.data);
    return response;
  });
}

export async function pegaCategoria() {
  return await api.get(`/categorias`).then((res) => {
    async function showResponse(res: any) {
      return await res;
    }

    const response = showResponse(res.data);
    return response;
  });
}

export async function enviaPayPal(paypal: any): Promise<Link> {
  return api.post("/pagamentos", paypal).then((res) => {
    return res.data;
  });
}
