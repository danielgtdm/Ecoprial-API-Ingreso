import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { IngresoModule } from './modules/ingreso/ingreso.module';
import { GeneradorModule } from './modules/generador/generador.module';
import { PlantaProcesoModule } from './modules/planta-proceso/planta-proceso.module';
import { ConductorModule } from './modules/conductor/conductor.module';
import { VehiculoModule } from './modules/vehiculo/vehiculo.module';
import { TransportistaModule } from './modules/transportista/transportista.module';
import { ResiduoModule } from './modules/residuo/residuo.module';
import { TipoResiduoModule } from './modules/tipo-residuo/tipo-residuo.module';

@Module({
  imports: [ConfigModule, DatabaseModule, IngresoModule, GeneradorModule, PlantaProcesoModule, ConductorModule, VehiculoModule, TransportistaModule, ResiduoModule, TipoResiduoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
