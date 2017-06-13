import {Component, OnInit} from '@angular/core';
import {AppCommunicationService} from '../shared/service/appCommunication.service';
import {Subscription} from 'rxjs/Subscription';
import {BlockService} from '../shared/service/block.service';
import {CfConfigService} from '../shared/service/cf_config.service';

@Component({
  selector: 'app-generator-view',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']

})
export class GeneratorComponent {
  knowledgeId: string;
  productId: string;
  knowledge: object;
  product: object;
  blocks: Array<object>;
  categories: Array<string>;
  subscription: Subscription;
  configs: Array<object>;
  creatingConfigMode = false;
  tempConfigObject = {
    name: null,
    key: null,
    updatedAt: null
  };
  configInProgress = null;
  configChosen = false;
  chosenConfig = null;
  mockBlock = null;
  bmArray = [];

  constructor(private appCommunicationService: AppCommunicationService,
              private blockService: BlockService,
              private cf_configService: CfConfigService) {
    this.subscription = appCommunicationService.knowledgeChosenAnnounced$.subscribe(
      id => {
        this.knowledgeId = id;
        this.syncBlocks();
        this.syncConfigs();
      }
    );
    this.subscription = appCommunicationService.productChosenAnnounced$.subscribe(
      id => {
        this.productId = id;
      }
    );
    this.subscription = appCommunicationService.blockChangeAnnounced$.subscribe(
      change => {
        this.syncBlocks();
      });
    this.subscription = appCommunicationService.broadcastKnowledge$.subscribe(
      knowledge => {
        this.knowledge = knowledge;
        this.updateCategories(knowledge);
      });
    this.subscription = appCommunicationService.broadcastProduct$.subscribe(
      product => {
        this.product = product;
      });
  }

  syncBlocks() {
    this.blockService
      .getBlocksForKnowledge(this.knowledgeId)
      .then(blocks => {
        this.blocks = blocks;
      });
  }

  syncConfigs() {
    this.cf_configService
      .getAll()
      .then(configs => {
        this.configs = configs;
      });
  }

  saveConfig() {
    const tmp = this.tempConfigObject;
    if (tmp.name && tmp.key) {
      this.cf_configService.add({
        name: tmp.name,
        key: tmp.key,
        updatedAt: new Date()
      }).then(res => {
        this.syncConfigs();
      });
      this.clearTempBlock();
      this.creatingConfigMode = false;
    } else {
      alert('Block incomplete :(');
    }
  }

  clearTempBlock() {
    this.tempConfigObject = {
      name: null,
      key: null,
      updatedAt: null
    };
  }

  newConfig() {
    this.tempConfigObject.updatedAt = new Date();
    this.creatingConfigMode = true;
  }

  editingThisConfig(id) {
    if (this.configInProgress === id) {
      return true;
    }
  }

  editConfig(id) {
    this.configInProgress = id;
  }

  updateConfig(id: string, config: object) {
    this.cf_configService.update(id, config)
      .then(res => {
        this.syncConfigs();
      });
    this.configInProgress = null;
    this.syncConfigs();
  }

  deleteConfig(id) {
    if (confirm('Do you really want to delete this Config?') === true) {
      this.cf_configService.deleteConfig(id)
        .then(res => {
          this.syncConfigs();
        });
    } else {
      console.log('Deletion cancelled!');
    }
  }

  abort() {
    this.clearTempBlock();
    this.creatingConfigMode = false;
  }

  generateBM(blocks, knowledge, product, categories) {
    if (!this.product) {
      alert('A Product must be chosen.');
      return;
    }

    let bm = `
        <table class="table">
        <tr>
            <th>Category</th>
            <th>Content</th>
        </tr>
    `;

    const bmTemplate = [];
    for (let g = 0; g < categories.length; g++) {
      const obj = {};
      obj[categories[g]] = {};
      for (let h = 0; h < blocks.length; h++) {
        if (blocks[h].category === categories[g]) {
          if (!obj[categories[g]][blocks[h].group]) {
            obj[categories[g]][blocks[h].group] = [];
          }
          obj[categories[g]][blocks[h].group].push(blocks[h]._id);
          // obj[categories[g]][newLength - 1].push(blocks[h]._id)
          // obj[categories[g]][blocks[h].group].push(blocks[h]._id);
        }
      }
      bmTemplate.push(obj);
    }
    console.log(bmTemplate);

    for (let i = 0; i < bmTemplate.length; i++) {
      const key = Object.keys(bmTemplate[i])[0];
      const groupArray = bmTemplate[i][key];
      // console.log(groupArray);
      const groupKeysPerCategory = Object.keys(groupArray);
      const numGroupsPerCategory = groupKeysPerCategory.length;
      let numGroupsToPick
      if (numGroupsPerCategory === 0) {
        numGroupsToPick = 0;
      } else {
        numGroupsToPick = this.getRandomInt(1, numGroupsPerCategory);
      }

      const usedGroups = [];
      for (let g = 0; g < numGroupsToPick; g++) {
        let whichGroupToPick = this.getRandomInt(0, numGroupsPerCategory - 1);
        while (usedGroups.indexOf(whichGroupToPick) !== -1) {
          whichGroupToPick = this.getRandomInt(0, numGroupsPerCategory - 1);
        }
        console.log('Will pick group number: ' + whichGroupToPick);
        usedGroups.push(whichGroupToPick);
      }
      console.log(groupKeysPerCategory, 'Will pick this many: ' + numGroupsToPick);
    }

    for (let g = 0; g < categories.length; g++) {
      bm = bm + '<tr><td>' + categories[g] + '</td><td>'
      for (let h = 0; h < blocks.length; h++) {
        if (blocks[h].category === categories[g]) {
          bm = bm + this.resolveBlock(blocks[h], product) + ' ';
        }
      }
      bm = bm + '</td></tr>';
    }
    bm = bm + '</table>';
    this.bmArray.push(bm);
  }

  resolveBlock(block, product) {
    if (!this.product) {
      alert('A Product must be chosen.');
      return;
    }
    let build = block.content;
    const kSize = block.knowledgeholder.length;
    const used = [];
    for (let i = 0; i < kSize; i++) {
      const k = block.knowledgeholder[i];
      const depth = k.depth;
      let start = k;
      for (let j = 0; j < depth; j++) {
        if (start.children.length > 0) {
          let push = false;
          if (depth - j === 1) {
            push = true;
          }
          start = this.getRandomChild(start, used, push);
        } else {
          console.error('Insufficient Children for: ' + k.name);
        }
      }
      build = build.replace('$$', start.name);
    }

    // Take care of Product Replacement
    const pHolder = block.productholder;
    const pSize = pHolder.length;
    for (let i = 0; i < pSize; i++) {
      const key = pHolder[i].key;
      const childCount = product.children.length;
      for (let j = 0; j < childCount; j++) {
        if (product.children[j].key === key) {
          build = build.replace('&&', product.children[j].value);
        }
      }
    }

    // this.mockBlock = build;
    return build;
  }

  getRandomChild(node, except, push) {
    const childCount = node.children.length;
    let childIndex = this.getRandomInt(0, childCount - 1);
    let attempts = 0;
    if (push) {
      while (except.indexOf(node.children[childIndex].uuid) !== -1) {
        childIndex = this.getRandomInt(0, childCount - 1);
        attempts++;
        if (attempts > 100) {
          console.error('Somethings fishy with the block.');
          return;
        }
      }
      except.push(node.children[childIndex].uuid);
    }
    return node.children[childIndex];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updateCategories(knowledge) {
    const numCats = knowledge.children.length;
    this.categories = [];
    for (let i = 0; i < numCats; i++) {
      this.categories.push(knowledge.children[i].name);
    }
  }
}
