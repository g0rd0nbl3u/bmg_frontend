import {Component} from '@angular/core';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  nodes = [
    {
      'id': '0',
      'name': 'Knowledge',
      'children': [
        {
          'id': '1',
          'name': 'Kundenkanäle',
          'children': [
            {
              'id': '2',
              'name': 'Virtuell',
              'children': [
                {
                  'id': '3',
                  'name': 'Neue Medien',
                  'children': [
                    {
                      'id': '4',
                      'name': 'Internet',
                      'children': [
                        {
                          'id': '5',
                          'name': 'Eigene Website'
                        },
                        {
                          'id': '6',
                          'name': 'Partner Website'
                        },
                        {
                          'id': '7',
                          'name': 'Email'
                        },
                        {
                          'id': '8',
                          'name': 'Chat'
                        },
                        {
                          'id': '9',
                          'name': 'Forum'
                        },
                        {
                          'id': '10',
                          'name': 'Videotelefon'
                        }
                      ]
                    },
                    {
                      'id': '11',
                      'name': 'App'
                    }
                  ]
                },
                {
                  'id': '12',
                  'name': 'Alte Medien',
                  'children': [
                    {
                      'id': '13',
                      'name': 'Telefon'
                    },
                    {
                      'id': '14',
                      'name': 'Radio',
                      'children': [
                        {
                          'id': '15',
                          'name': 'Product Placement'
                        },
                        {
                          'id': '16',
                          'name': 'Werbung'
                        }
                      ]
                    },
                    {
                      'id': '17',
                      'name': 'TV',
                      'children': [
                        {
                          'id': '18',
                          'name': 'Product Placement'
                        },
                        {
                          'id': '19',
                          'name': 'Werbung'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'id': '20',
              'name': 'Physisch',
              'children': [
                {
                  'id': '21',
                  'name': 'Realität',
                  'children': [
                    {
                      'id': '22',
                      'name': 'Filiale',
                      'children': [
                        {
                          'id': '23',
                          'name': 'Wiederverkäufer'
                        },
                        {
                          'id': '24',
                          'name': 'Eigene'
                        },
                        {
                          'id': '25',
                          'name': 'Shop-in-Shop'
                        }
                      ]
                    },
                    {
                      'id': '26',
                      'name': 'Post/Kurier'
                    },
                    {
                      'id': '27',
                      'name': 'Events'
                    },
                    {
                      'id': '28',
                      'name': 'Handelsvertreter',
                      'children': [
                        {
                          'id': '29',
                          'name': 'Individuell'
                        },
                        {
                          'id': '30',
                          'name': 'In Gruppe'
                        }
                      ]
                    },
                    {
                      'id': '31',
                      'name': 'Print'
                    },
                    {
                      'id': '32',
                      'name': 'Automat'
                    },
                    {
                      'id': '33',
                      'name': 'Messe'
                    },
                    {
                      'id': '34',
                      'name': 'Plakat'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          'id': '35',
          'name': 'Vertriebskanäle'
        }
      ]
    }
  ];

  product = [
    {
      'id': '0',
      'key': 'Produktname',
      'value': 'Schwan',
      'children': [
        {
          'id': '1',
          'key': 'Wortart',
          'value': 'Substantiv'
        },
        {
          'id': '2',
          'key': 'Genus',
          'value': 'Maskulin'
        },
        {
          'id': '3',
          'key': 'Numerus',
          'value': 'Singular',
          'children': [
            {
              'id': '4',
              'key': 'Kasus',
              'value': 'Nominativ',
              'children': [
                {
                  'id': '5',
                  'key': 'Artikel',
                  'value': 'der'
                },
                {
                  'id': '6',
                  'key': 'Wort',
                  'value': 'Schwan'
                }
              ]
            },
            {
              'id': '7',
              'key': 'Kasus',
              'value': 'Genitiv',
              'children': [
                {
                  'id': '8',
                  'key': 'Artikel',
                  'value': 'des'
                },
                {
                  'id': '9',
                  'key': 'Wort',
                  'value': 'Schwans'
                }
              ]
            },
            {
              'id': '10',
              'key': 'Kasus',
              'value': 'Dativ',
              'children': [
                {
                  'id': '11',
                  'key': 'Artikel',
                  'value': 'dem'
                },
                {
                  'id': '12',
                  'key': 'Wort',
                  'value': 'Schwan'
                }
              ]
            },
            {
              'id': '13',
              'key': 'Kasus',
              'value': 'Akkusativ',
              'children': [
                {
                  'id': '14',
                  'key': 'Artikel',
                  'value': 'den'
                },
                {
                  'id': '15',
                  'key': 'Wort',
                  'value': 'Schwan'
                }
              ]
            }
          ]
        },
        {
          'id': '16',
          'key': 'Numerus',
          'value': 'Plural',
          'children': [
            {
              'id': '17',
              'key': 'Kasus',
              'value': 'Nominativ',
              'children': [
                {
                  'id': '18',
                  'key': 'Artikel',
                  'value': 'die'
                },
                {
                  'id': '19',
                  'key': 'Wort',
                  'value': 'Schwäne'
                }
              ]
            },
            {
              'id': '20',
              'key': 'Kasus',
              'value': 'Genitiv',
              'children': [
                {
                  'id': '21',
                  'key': 'Artikel',
                  'value': 'der'
                },
                {
                  'id': '22',
                  'key': 'Wort',
                  'value': 'Schwäne'
                }
              ]
            },
            {
              'id': '23',
              'key': 'Kasus',
              'value': 'Dativ',
              'children': [
                {
                  'id': '24',
                  'key': 'Artikel',
                  'value': 'den'
                },
                {
                  'id': '25',
                  'key': 'Wort',
                  'value': 'Schwänen'
                }
              ]
            },
            {
              'id': '26',
              'key': 'Kasus',
              'value': 'Akkusativ',
              'children': [
                {
                  'id': '27',
                  'key': 'Artikel',
                  'value': 'den'
                },
                {
                  'id': '28',
                  'key': 'Wort',
                  'value': 'Schwänen'
                }
              ]
            }
          ]
        }
      ],
      '_id': '590c57fccd76af105559840c'
    }
  ];

  options = {
    // displayField: 'subTitle',
    //isExpandedField: 'expanded',
    idField: 'uuid',
    allowDrag: true,
    //useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  }
  changeRootName = () => {
    this.nodes[0].name = 'Yezus';
    console.log(JSON.stringify(this.nodes, null, 2));
  }
  log = (logThis) => {
    console.log(logThis);
  }
}


/*[
 {
 id: 1,
 name: 'root1',
 children: [
 { id: 2, name: 'child1' },
 { id: 3, name: 'child2' }
 ]
 },
 {
 id: 4,
 name: 'root2',
 children: [
 { id: 5, name: 'child2.1' },
 {
 id: 6,
 name: 'child2.2',
 children: [
 { id: 7, name: 'subsub' }
 ]
 }
 ]
 }
 ];*/

