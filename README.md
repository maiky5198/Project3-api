# AdventureR

![alt text](/AdventureRApp%20-%20Page%201.jpeg)

- Creating an API where people could log their adventures and access them

## AdventureR Routes

| VERB   |    URL Pattern               | ACTION |      DESCRIPTION             |  MODEL  |  
| :---   |    :----:                    |   ---: |         ---:                 |  ---:   |
| GET    |   /adventure                 |  Read  | Retrieve Adventure Index     |adventure|
| GET    |   /adventure/:id             |  Read  | Shows specific a adventure   |adventure|
| POST   |   /adventure                 | Create | Creates an adventure         |adventure|
| UPDATE |  /adventure/:id              | Update | Update an adventure          |adventure|
| DELETE |   /adventure/:id             | Delete | Deletes an adventure         |adventure|
| POST   | /gear/:adventureId           | Create | Gear Subdocument of adventure|  gear   |
| UPDATE | /gear/:adventureId/:gearId   | Update | Update Gear of adventure     |  gear   |
| DELETE | /gear/:adventureId:gearId    | Delete | Delete a gear subdocument    |  gear   |
| POST   |   /adventure:id              | Create |   Creates a comment          | Comment |
| DELETE | /delete/:adventureId/:commId | Delete |   Deletes a comment          | Comment |
| POST   |   /sign-up                   | Create |  Saves user signup info      |  user   |
| POST   |   /sign-in                   | Create |  Create user session         |  user   |
| UPDATE |   /change-password           | Update |  Update password             |  user   |
| DELETE |   /sign-out                  | Delete | Signs out user ending session|  user   |

# Tech Stack

- Javascript
- Node.js
- Express
- Mongoose
- MongoDB
