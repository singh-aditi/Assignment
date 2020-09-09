export interface user
{
    user_id: number,
    firstName:string,
    lastName:string,
    username: string,
    address: string,
    ph_no: string,
    role_id: number,
    dob: Date,
    password: string
}

export interface role
{
    role_id:number,
    role_name: string
}

