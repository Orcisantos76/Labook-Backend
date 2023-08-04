
export interface UserDB{
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}

export interface UserModel{
    id: string,
    name: string,
    email: string,
    role: string,
    createdAt: string
}

export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string,
        private createdAt: string
    ){}
    public getId(): string{
        return this.id
    }    
    public getName(): string{
        return this.name
    }
    public setName(value: string): void{
        this.name = value
    }
    public getEmail(): string{
        return this.email
    }
    public setEmail(value: string): void{
        this.email = value
    }
    public getPassword(): string{
        return this.password
    }
    public setPassword(value: string): void{
        this.password = value
    }
    public getRole(): string{
        return this.role
    }
    public setRole(value: string): void{
        this.role = value
    }
    public getCreatedAt(): string{
        return this.createdAt
    } 
    
    public toDBModel(): UserDB{
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        };
    }

    public toBusinessModel(): UserModel{
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt,
        };
    }
}