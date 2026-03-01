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

4. Products page spec:
   - header displayed correctly
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
   - "Add to cart" button functionality
   - footer displayed correctly

5. Product page spec:
   - header displayed correctly
   - product item is displayed correctly:
     - "Back to products" button
     - image
     - name
     - desc
     - price
     - "Add to cart" button
   - "Back to products" button functionality
   - footer displayed correctly

6. Cart page spec:
   - header displayed correctly
   - empty cart is displayed correctly
   - single product is displayed correctly in cart
   - multiple products are displayed correctly in cart
   - product is added to cart and removed from product details page
   - single product can be added and removed from cart
   - single product is displayed correctly in cart
   - footer displayed correctly
