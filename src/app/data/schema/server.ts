

export interface Server {
  ipv4?: string;
  domainName: string;
}

export class ServerModel implements Server {
  ipv4?: string;
  domainName: string;
  
  constructor(source: Server) {
    this.ipv4 = typeof source.ipv4 !== 'undefined' ? source.ipv4 : '';
    this.domainName = source.domainName;
  }
}
