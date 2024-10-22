import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  //Nombre de la tabla
  name: 'users',
})
export class User {
  // Id autogenerado con uuid
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: string;
}
