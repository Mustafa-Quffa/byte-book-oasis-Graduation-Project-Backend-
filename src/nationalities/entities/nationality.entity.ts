import { BaseEntity } from "src/entities/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('nationalities')
export class Nationality extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    title: string;

    @OneToMany(() => User, (user) => user.nationality)
    users: User[];
}
