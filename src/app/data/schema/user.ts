export interface User {
    username: string;
    password: string;
    token: string;
  }
  
  export class UserModel implements User {
    username: string;
    password: string;
    token: string;
      
    constructor(source: User) {
      this.username = source.username;
      this.password = source.password;
      this.token = source.token;
    }
  
    private isUndefined(attr) {
      return typeof attr === 'undefined';
    }
  }
  