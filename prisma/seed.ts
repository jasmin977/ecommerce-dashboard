import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prismadb = new PrismaClient();

async function main() {
  // Delete existing data
  await prismadb.category.deleteMany();
  await prismadb.brand.deleteMany();
  await prismadb.image.deleteMany();
  await prismadb.product.deleteMany();
  await prismadb.customer.deleteMany();

  /*  async function createImages(productName: string, imageUrls: string[]) {
    const product = await prismadb.product.findFirst({
      where: { name: productName },
    });

    if (!product) {
      console.error(`Product "${productName}" not found.`);
      return;
    }

    const createdImages = await prismadb.image.createMany({
      data: imageUrls.map((url) => ({ url, productId: product.id })),
    });

    console.log(
      `Created ${createdImages.count} images for product "${productName}".`
    );
  }

  await Promise.all([
    createImages("Product 1", [
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
    ]),
    createImages("Product 2", [
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
    ]),
    createImages("Product 3", [
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
    ]),
    createImages("Product 4", [
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
    ]),
    createImages("Product 5", [
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
      "/uploads/products/test.jpg",
    ]),
    // Create images for other products...
  ]); 
   */
  // Generate brands
  const brands = [];
  for (let i = 0; i < 10; i++) {
    const brand = await prismadb.brand.create({
      data: {
        name: faker.company.name(),
        image: { create: { url: faker.image.url() } },
      },
    });
    brands.push(brand);
  }
  // Generate fake categories
  const categories = [];
  for (let i = 0; i < 10; i++) {
    const category = await prismadb.category.create({
      data: {
        name: faker.lorem.words(),
        image: {
          create: {
            url: faker.image.url(),
          },
        },
      },
    });
    categories.push(category);
  }
  const products = [];
  for (let i = 0; i < 10; i++) {
    const product = await prismadb.product.create({
      data: {
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int({ min: 10, max: 100 }),
        category: { connect: { id: categories[i % 10].id } },
        brand: { connect: { id: brands[i % 10].id } },
      },
    });
    products.push(product);
  }

  const customers = [];
  for (let i = 0; i < 10; i++) {
    const customer = await prismadb.customer.create({
      data: {
        phoneNumber: faker.phone.number(),
        fisrtname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: faker.internet.password(),
        address: faker.location.streetAddress(),
        image: { create: { url: faker.image.avatar() } },
        status: faker.helpers.arrayElement(["ACTIVE", "PASSIVE"]),
      },
    });
    customers.push(customer);
  }

  for (let i = 0; i < 10; i++) {
    await prismadb.order.create({
      data: {
        customerId: customers[i % 10].id,
        isPaid: faker.datatype.boolean(),
        phone: faker.phone.number("##-###-###"),
        address: faker.location.streetAddress(),
        status: faker.helpers.arrayElement(["PENDING", "SHIPPED", "CANCELLED"]),
        orderItems: {
          create: [
            {
              productId: products[i % 10].id,
            },
          ],
        },
      },
    });
  }
}
main()
  .then(async () => {
    await prismadb.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismadb.$disconnect();
    process.exit(1);
  });
