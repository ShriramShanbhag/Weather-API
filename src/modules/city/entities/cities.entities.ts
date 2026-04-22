import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('cities')

export class City {
    @PrimaryColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    lat: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    lon: number;

    @Column({ type: 'varchar', length: 2 })
    country: string;

    @Column({ type: 'varchar' })
    state: string;

    @Column({ type: 'varchar' })
    admin1: string;

    @Column({ type: 'varchar' })
    admin2: string;

    @Column({ type: 'int' })
    pop: number;
}