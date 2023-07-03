import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    name: string

    @Column({select: false})
    password?: string

    @Column()
    email: string

}