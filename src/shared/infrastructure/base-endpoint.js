export class BaseEndpoint {
  constructor(api, path) {
    this.api = api;
    this.path = path;
  }

  getAll() {
    const response = this.api.client.get(this.path);
    return response;
  }

  getById(id) {
    const resourcePath = `${this.path}/${id}`;
    const response = this.api.client.get(resourcePath);
    return response;
  }

  create(resource) {
    const response = this.api.client.post(this.path, resource);
    return response;
  }

  update(id, resource) {
    const resourcePath = `${this.path}/${id}`;
    const response = this.api.client.put(resourcePath, resource);
    return response;
  }

  delete(id) {
    const resourcePath = `${this.path}/${id}`;
    const response = this.api.client.delete(resourcePath);
    return response;
  }
}
