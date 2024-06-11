export enum Rol {
    ADMIN = "ADMIN",
    USER = "USER",
  }
  
  export enum MovementType {
    INCOME = "INCOME",
    EGRESS = "EGRESS",
  }
  
  export interface IncomeEgress {
    id: number;
    concept: string;
    amount: number;
    date: Date;
    type: MovementType;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    rol: Rol;
  }