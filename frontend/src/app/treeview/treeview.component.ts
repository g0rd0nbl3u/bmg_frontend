import {Component} from '@angular/core';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  nodes = [
    {
      "id": "0",
      "name": "Knowledge",
      "children": [
        {
          "id": "1",
          "name": "Kundenkanäle",
          "children": [
            {
              "id": "2",
              "name": "Virtuell",
              "children": [
                {
                  "id": "3",
                  "name": "Neue Medien",
                  "children": [
                    {
                      "id": "4",
                      "name": "Internet",
                      "children": [
                        {
                          "id": "5",
                          "name": "Eigene Website"
                        },
                        {
                          "id": "6",
                          "name": "Partner Website"
                        },
                        {
                          "id": "7",
                          "name": "Email"
                        },
                        {
                          "id": "8",
                          "name": "Chat"
                        },
                        {
                          "id": "9",
                          "name": "Forum"
                        },
                        {
                          "id": "10",
                          "name": "Videotelefon"
                        }
                      ]
                    },
                    {
                      "id": "11",
                      "name": "App"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "30",
          "name": "Vertriebskanäle"
        }
      ]
    }
  ];
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

