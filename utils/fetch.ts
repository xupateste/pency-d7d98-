import unfetch from "isomorphic-unfetch";

import reporter from "~/reporting";

export default function fetch(
  method: "GET" | "PATCH" | "POST" | "DELETE" | "PUT",
  path: string,
  body: Record<string, any> = null,
  headers: Record<string, any> = {},
  mode: RequestInit["mode"] = "cors",
) {
  return unfetch(path, {
    method: method,
    mode,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: ["PATCH", "POST", "PUT"].includes(method) && body ? JSON.stringify(body) : null,
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .catch((error) => {
      // Omit 401 and 404 errors as we don't want to report those
      if (![401, 404].includes(error?.status)) {
        // Report fetch failure
        reporter.message(error?.message || error?.statusText || "Error on fetch util", {
          origin: `fetch_util`,
          extras: {
            method,
            path,
            body,
            headers,
            message: error?.message,
            status: error?.status,
            statusText: error?.statusText,
          },
        });
      }

      // Rethrow promise
      return Promise.reject(error);
    });
}
