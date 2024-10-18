import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './files.entity';

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

  @OneToMany(() => File, (file) => file.todo)
  files: File[];
}
