import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome from api!"', () => {
      const appController = app.get<AppController>(AppController);
      const data = appController.getData();
      expect(data.message).toContain('Welcome from api');
    });
  });
});
