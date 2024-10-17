import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  //Nombre de la tabla
  name: 'todos',
})
export class Todo {
  //Id autoincrementado
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;
}
