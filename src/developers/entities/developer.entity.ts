import { Gender } from "src/common/enum/gender.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: Gender
    })
    gender: Gender;

    @Column()
    hobby: string;

    @Column({ type: 'date' })
    birth_date: string;
}