import http from "../http-common2";

class AudioBookDataService {
  getAll() {
    return http.get("/audiobooks");
  }

  get(id) {
    return http.get(`/audiobooks/${id}`);
    }
    create(data) {
    return http.post("/audiobooks", data);
  }

  update(id, data) {
    return http.put(`/audiobooks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/audiobooks/${id}`);
  }

  deleteAll() {
    return http.delete(`/audiobooks`);
    }
    findByTitle(title) {
    return http.get(`/audiobooks?title=${title}`);
  }
}

export default new AudioBookDataService();