class Api {
  static headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      dataType: "json",
      Authorization: "",
    };
  }

  static get(host, route, apikey) {
    return this.xhr(host, route, null, apikey, "GET");
  }

  static put(host, route, params, apikey) {
    return this.xhr(host, route, params, apikey, "PUT");
  }

  static post(host, route, params, apikey) {
    return this.xhr(host, route, params, apikey, "POST");
  }

  static getpost(host, route, params, apikey) {
    return this.xhr(host, route, params, apikey, "POST");
  }

  static delete(host, route, params, apikey) {
    return this.xhr(host, route, params, apikey, "DELETE");
  }

  static xhr(host, route, params, apikey, verb) {
    const url = `${host}${route}`;
    console.log("ACTUAL URL REQUEST");
    console.log(url);
    console.log(params);
    console.log("ACTUAL URL REQUEST");
    let options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null
    );

    options.headers = Api.headers();
    options.headers.Authorization = apikey;
    
    const controller = new AbortController();
    const signal = controller.signal;
    options.signal = signal;

    const fetchPromise = fetch(url, options);
    // 5 second timeout:
    const timeoutId = setTimeout(() => controller.abort(), 10 * 1000);

    return fetchPromise
      .then((resp) => {
        clearTimeout(timeoutId);
        let json = resp.json();
        if (resp.ok) {
          return json;
        }

        return json.then((err) => {
          throw err;
        });
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        throw new Error(error);
      });
  }
}

export default Api;
