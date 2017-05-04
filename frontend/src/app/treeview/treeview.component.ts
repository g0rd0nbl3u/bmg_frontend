import {Component} from "@angular/core";

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  nodes = [
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
  ];

/*[
    {
      'attr': {
        'id': '1',
        'name': 'Kundenkanäle'
      },
      'node': [
        {
          'attr': {
            'id': '2',
            'name': 'Virtuell'
          },
          'node': [
            {
              'attr': {
                'id': '3',
                'name': 'Neue Medien'
              },
              'node': [
                {
                  'attr': {
                    'id': '4',
                    'name': 'Internet'
                  },
                  'node': [
                    {
                      'attr': {
                        'id': '5',
                        'name': 'Eigene Website'
                      }
                    },
                    {
                      'attr': {
                        'id': '6',
                        'name': 'Partner Website'
                      }
                    },
                    {
                      'attr': {
                        'id': '7',
                        'name': 'Email'
                      }
                    },
                    {
                      'attr': {
                        'id': '8',
                        'name': 'Chat'
                      }
                    },
                    {
                      'attr': {
                        'id': '9',
                        'name': 'Forum'
                      }
                    },
                    {
                      'attr': {
                        'id': '10',
                        'name': 'Videotelefon'
                      }
                    }
                  ]
                },
                {
                  'attr': {
                    'id': '11',
                    'name': 'App'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'attr': {
        'id': '30',
        'name': 'Vertriebskanäle'
      }
    }
  ];*/
}
