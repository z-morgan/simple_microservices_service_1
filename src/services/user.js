class UserService {
  constructor(url) {
    this.url = url;
  }

  async getUserById(id) {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    };
  
    return await fetch(`${this.url}/users/${id}`, options);
  }
}

export default UserService;