import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { City } from "../../city/entities/city.entity";

@Entity('users')

export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => City)
    @JoinTable()
    subscribedCities: City[];
}
