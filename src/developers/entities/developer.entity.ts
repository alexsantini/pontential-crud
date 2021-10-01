import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../enum/gender.enum";

@Entity()
export class Developer {
    @ApiProperty({ description: 'ID do desenvolvedor' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome do desenvolvedor' })
    @Column()
    name: string;

    @ApiProperty({ description: 'Gênero do desenvolvedor' })
    @Column({
        type: "enum",
        enum: Gender
    })
    gender: Gender;

    @ApiProperty({ description: 'Hobby do desenvolvedor' })
    @Column()
    hobby: string;

    @ApiProperty({ description: 'Data de nascimento do desenvolvedor', format: 'date' })
    @Column({ type: 'date' })
    birth_date: string;
}