import { Inject, Injectabe } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { Board } from '../shared/board.model'

const STORAGE_KEY = 'boards';
@Injectabe
export class BoardItemService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

}