import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

import {AppComponent} from './app.component';
import {TreeModule} from 'angular-tree-component';
import {UploadComponent} from './upload/upload.component';
import {InputFileModule} from './shared/input-file/input-file.module';
import {KnowledgeService} from './shared/service/knowledge.service';
import {ProductService} from './shared/service/product.service';
import {KnowledgeTreeViewComponent} from './knowledge-treeview/knowledge-treeview.component';
import {ProductTreeViewComponent} from './product-treeview/product-treeview.component';
import {KnowledgeBrowserComponent} from './knowledge-browser/knowledge-browser.component';
import {ProductBrowserComponent} from './product-browser/product-browser.component';
import {AppCommunicationService} from './shared/service/appCommunication.service';
import {BlockComponent} from './block_management/block.component';
import {BlockService} from './shared/service/block.service';
import {SortablejsModule} from 'angular-sortablejs';
import {GeneratorComponent} from './generator/generator.component';
import {CfConfigService} from './shared/service/cf_config.service';
import {CFJobService} from './shared/service/cf_jobservice';

@NgModule({
  declarations: [
    AppComponent,
    ProductTreeViewComponent,
    KnowledgeTreeViewComponent,
    UploadComponent,
    KnowledgeBrowserComponent,
    ProductBrowserComponent,
    BlockComponent,
    GeneratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    AngularFontAwesomeModule,
    InputFileModule,
    SortablejsModule
  ],
  providers: [KnowledgeService, ProductService, BlockService, AppCommunicationService, CfConfigService, CFJobService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private appCommunicationService: AppCommunicationService) {
  }
}
