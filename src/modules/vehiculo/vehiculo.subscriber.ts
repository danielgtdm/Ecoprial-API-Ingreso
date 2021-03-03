import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Vehiculo } from './vehiculo.entity';

@EventSubscriber()
export class VehiculoSubscriber implements EntitySubscriberInterface<Vehiculo> {
  listenTo() {
    return Vehiculo;
  }

  beforeUpdate(event: UpdateEvent<Vehiculo>) {
    console.log('EVENTO ANTES DE ACTUALIZAR VEHICULO');
    console.log(event);
  }
}
