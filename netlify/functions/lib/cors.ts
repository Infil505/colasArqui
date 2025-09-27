export function withCors(res: { statusCode?: number; headers?: Record<string,string>; body?: string }) {
  return {
    statusCode: res.statusCode ?? 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      ...res.headers,
    },
    body: res.body ?? "",
  };
}

// Para preflight (OPTIONS)
export function handleOptions() {
  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "content-length": "0",
    },
    body: "",
  };
}
