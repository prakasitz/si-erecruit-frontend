export declare class IAuth {
    signIn(payload: UserLogin): Promise<string>;
    signOut(): boolean;
    getUser(): object;
}


export interface UserLogin {
    pid: string
    password: string
}