# Test cases

1. Content of "Login" page is displayed correctly
   - page title "Swag Labs"
   - header "Swag Labs"
   - username text field with "Username" placeholder
   - password text field with "Password" placeholder
   - submit button with text "Login"

2. Valid login with different users
   - standard_user
   - locked_out_user
   - problem_user
   - performance_glitch_user
   - error_user
   - visual_user

3. Navbar is displayed correctly
   - menu button is displayed and opens navbar menu
   - "All items" link is displayed
   - "About" link is displayed
   - "Logout" link is displayed
   - X navbar button closes navbar

4. Product spec:
   - product count is 6
   - product item is displayed correctly:
     - image
     - name
     - desc
     - price
     - "Add to cart" button
   - default product sort is "Name (A to Z)"
   - product sort:
     - by name ASC
     - by name DSC
     - by price ASC
     - by price DSC
