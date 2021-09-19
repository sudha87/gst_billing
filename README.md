GST-Billing-App


It contains four RESTful Api's.Such as Add product, Product Search, Calculate total cost of the product and Get bill Details.

Description


Api #1: Add Product entry Api contains following fields. There are product_code,product_name,product_price (per Unit)and product_gst(%).


Api #2: To search product by product_code or product_name.


Api #3: To Calculate total cost of the product including gst using quantity and product_code as input.


Api #4: To Get all bill details by date range.

Requirements

Mongodb with mongoose running with a database name gst and a collection name products with  product_code, product_name, product_price, product_gst.

Steps
Clone the repository

    git clone  https://github.com/sudha87/gst_billing.git
    
To start the REST API server follow the commands below
    npm install
    npm start
    
    
and backend server will be running on http://localhost:9000
