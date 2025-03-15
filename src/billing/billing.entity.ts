import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Billing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productCode: number;

    @Column()
    location: string;

    @Column()
    premiumPaid: number;

    // TODO: create user table
    @Column()
    userId: number;
}