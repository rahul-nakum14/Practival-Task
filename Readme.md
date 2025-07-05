Product Management:

Implement a form to add new products with the following fields:

Name (must be unique)

Description

Quantity

Categories (should support selecting multiple categories). These categories will be added into DB by a seeder, no need to create a section for its management.


Listing Page:


Create a paginated product listing with:

Product name

Categories (shown as tags/bubbles)

Product added on

Option to delete a product

Include numbered pagination (1, 2, 3, …).


Filters:


Add the ability to search products by name.

Include a multi-select dropdown to filter by categories:

If a product belongs to any of the selected categories, it should appear in the result.





### How TO Run ? 

- docker-compose up -d  ------to start the postgres


 - step 1 : npm i
 - step 2: npm run migrate
- step 3: npm run seed

- step 4: npm run dev


.env : DATABASE_URL="postgres_url"



```
Create PRoduct 
======================

mutation CreateProduct {
  createProduct(
    input: {
      name: "iPhone 15"
      description: "Latest Apple iPhone"
      quantity: 10
      categoryIds: [1, 2]  # Category IDs from seeder
    }
  ) {
    id
    name
    description
    quantity
    categories {
      id
      name
    }
    createdAt
  }
}



Search Produt Name
===============================
query SearchProducts {
  products(search: "iPhone") {
    products {
      id
      name
      description
    }
    totalPages
  }
}



Search based on Categories (shown as tags/bubbles)
==========================================
query FilterProducts {
  products(categoryIds: [1, 2]) {
    products {
      id
      name
      categories {
        id
        name
      }
    }
    totalPages
  }
}


Delete Product
=========================

mutation {
  deleteProduct(id: 1)
}


```
