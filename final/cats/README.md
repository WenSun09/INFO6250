# Cats Adoption Online
Cats Adoption Online is a website for registering and adopting a Cat. You need to login, adopt or register cats in Adoptable cats, and see adoption records.

## Pages in this project
This project has four pages: Login, Home, Adoptable cats, Adoption records.

## Login page
If you are not logged in. You will see a login page. You need to input a username to login. 

The username can only contains letters and numbers. 

Username "dog" is treated as a wrong password. 

Username "wen" is treated as a banning user.

Username "Admin" is treated as a administrator. Admin will see a register cat button on Adoptable cats page, and can register new adoptable cat to the server.

After you logged in, you will see a profile icon on the Header. Click on the profile icon you will see your username and a logout button. After clicking on the logout button, you will be logged out.

## Home page
Home page shows some information about my website.

## Adoptable cats page
Adoptable cats page shows adoptable cats and adopted cats. The page show the information about the cats, such as name, picture, breed, registrant. If the cat has been adopted, it will also show the adopter of that cat.

Adopted Cats have a adopted button. The button is disabled and you can not click on it.

Adoptable cats have a adopt button. After clicking on the adopt button, you will adopt that cat. The button will change to a adopted button and the cat will show its adopter is you.

Only administer can register a new adoptable cat. Use username "Admin" to login the website. Click on the register cat button. You will see a modal form. Cancel button will close the modal. Input cat's name and breed, click on the register button will complete the reigster. Name is required and can only contains letters. Breed is a dropdown select. If you choose "other", it will appear a input box for you to input other breed. The picture of the new adoptable cat will be randomly chosen from images list.

## Adoption records page
Adoption records page shows the adoption records of the cats. After user adopting a cat, a new adoption record will add to this page.

## Auto refresh
The website will get the latest data from server every 5 seconds. If other user adopted a cat. You will see the change of that cat after 5 seconds.

## Scripts
| Command           | Description               |
| ----------------- | ------------------------- |
| npm run start     | run the server            |
| npm run start-win | run the server on windows |
| npm run dev       | run the front end         |
| npm run build     | build the project         |

## Images source used in this project
placekitten1: http://placekitten.com/200/200?image=1

placekitten2: http://placekitten.com/200/200?image=2

placekitten3: http://placekitten.com/200/200?image=3

placekitten4: http://placekitten.com/200/200?image=4

placekitten5: http://placekitten.com/200/200?image=5

placekitten6: http://placekitten.com/200/200?image=6

placekitten7: http://placekitten.com/200/200?image=7

placekitten8: http://placekitten.com/200/200?image=8

placekitten9: http://placekitten.com/200/200?image=9
